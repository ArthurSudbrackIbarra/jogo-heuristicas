/**
 * OAuth2 desktop-app flow for the Google Forms API.
 *
 * Reads OAuth client credentials from ./credentials.json (downloaded from
 * Google Cloud Console as a Desktop application client) and caches a
 * refresh token in ./token.json after the first interactive login.
 *
 * On first run: opens a browser for consent, captures the auth code via a
 * short-lived loopback HTTP server on an ephemeral port, exchanges it for
 * tokens, and saves them.
 * On subsequent runs: silently refreshes the access token from the cached
 * refresh token.
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { URL } from "node:url";
import { exec } from "node:child_process";
import { OAuth2Client } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/forms.body"];

interface DesktopCredentials {
  installed?: {
    client_id: string;
    client_secret: string;
    redirect_uris?: string[];
  };
  web?: {
    client_id: string;
    client_secret: string;
    redirect_uris?: string[];
  };
}

interface StoredToken {
  refresh_token: string;
  // Optional fields we don't strictly need but keep for completeness.
  access_token?: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
}

function openBrowser(url: string): void {
  const platform = process.platform;
  const cmd =
    platform === "darwin"
      ? `open "${url}"`
      : platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {
    // Ignore errors — if it fails the user can paste the URL manually.
  });
}

async function loadCredentials(path: string): Promise<{
  clientId: string;
  clientSecret: string;
}> {
  if (!existsSync(path)) {
    throw new Error(
      `Could not find ${path}. Download the OAuth Desktop client JSON from Google Cloud Console and save it as credentials.json — see README.md.`,
    );
  }
  const raw = await readFile(path, "utf-8");
  const parsed = JSON.parse(raw) as DesktopCredentials;
  const block = parsed.installed ?? parsed.web;
  if (!block) {
    throw new Error(
      `${path} is malformed — expected an "installed" or "web" client block.`,
    );
  }
  return { clientId: block.client_id, clientSecret: block.client_secret };
}

async function loadStoredToken(path: string): Promise<StoredToken | null> {
  if (!existsSync(path)) return null;
  try {
    const raw = await readFile(path, "utf-8");
    const parsed = JSON.parse(raw) as StoredToken;
    return parsed.refresh_token ? parsed : null;
  } catch {
    return null;
  }
}

async function saveStoredToken(
  path: string,
  token: StoredToken,
): Promise<void> {
  await writeFile(path, JSON.stringify(token, null, 2) + "\n", "utf-8");
}

async function interactiveAuth(client: OAuth2Client): Promise<string> {
  // Spin up a one-shot loopback server on a random port to receive the code.
  return new Promise<string>((resolve, reject) => {
    const server = createServer((req, res) => {
      try {
        if (!req.url) {
          res.statusCode = 400;
          res.end("Missing URL.");
          return;
        }
        const reqUrl = new URL(req.url, `http://127.0.0.1`);
        const code = reqUrl.searchParams.get("code");
        const error = reqUrl.searchParams.get("error");
        if (error) {
          res.statusCode = 400;
          res.end(`Authorization failed: ${error}. You can close this tab.`);
          server.close();
          reject(new Error(`OAuth error: ${error}`));
          return;
        }
        if (!code) {
          res.statusCode = 400;
          res.end("Missing authorization code.");
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(
          '<html><body style="font-family:sans-serif;padding:2rem"><h2>You can close this tab.</h2><p>Authorization received. Return to your terminal.</p></body></html>',
        );
        server.close();
        resolve(code);
      } catch (err) {
        res.statusCode = 500;
        res.end("Internal error.");
        server.close();
        reject(err);
      }
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      const redirectUri = `http://127.0.0.1:${port}`;
      // Mutate the client to use this loopback redirect.
      client.redirectUri = redirectUri;
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent", // force refresh_token issuance on first run
        redirect_uri: redirectUri,
      });
      console.log("\nOpening browser to authorize the Google Forms API…");
      console.log(
        `If it does not open, paste this URL manually:\n  ${authUrl}\n`,
      );
      openBrowser(authUrl);
    });
  });
}

export async function getAuthorizedClient(options: {
  credentialsPath: string;
  tokenPath: string;
}): Promise<OAuth2Client> {
  const { clientId, clientSecret } = await loadCredentials(
    options.credentialsPath,
  );
  const client = new OAuth2Client({ clientId, clientSecret });
  const stored = await loadStoredToken(options.tokenPath);

  if (stored) {
    client.setCredentials({ refresh_token: stored.refresh_token });
    // Force an access token refresh now so we fail fast on bad creds.
    try {
      await client.getAccessToken();
      return client;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`Cached token did not work (${msg}). Re-authenticating…`);
    }
  }

  const code = await interactiveAuth(client);
  const { tokens } = await client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "Google did not return a refresh_token. Delete token.json (if present) and try again. The OAuth client may need access_type=offline + prompt=consent.",
    );
  }
  client.setCredentials(tokens);
  await saveStoredToken(options.tokenPath, {
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token ?? undefined,
    expiry_date: tokens.expiry_date ?? undefined,
    token_type: tokens.token_type ?? undefined,
    scope: tokens.scope ?? undefined,
  });
  console.log(`Saved refresh token to ${options.tokenPath}.`);
  return client;
}
