import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Stage = 'idle' | 'asked-word' | 'done';

// BAD: must recall a hidden format command, nothing is shown
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [command, setCommand] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [word, setWord] = useState('');
  const [wordError, setWordError] = useState('');

  function handleApplyCommand() {
    const trimmed = command.trim().toLowerCase();
    if (trimmed === 'bold' || trimmed === 'negrito') {
      setStage('asked-word');
      setError('');
    } else {
      setAttempts(a => a + 1);
      setError(`Unknown command "${command}". Try again.`);
    }
  }

  function handleApplyWord() {
    const trimmed = word.trim().toLowerCase();
    if (trimmed === 'important' || trimmed === 'importante') {
      setStage('done');
      setTimeout(onTaskComplete, 900);
    } else {
      setWordError(`Word "${word}" not found in the document.`);
    }
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>✏️</span>
        <span className={s.toolbarTitle}>Text Editor</span>
        {/* intentionally no formatting buttons */}
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom: 8 }}>Document:</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: 'Georgia, serif' }}>
            Today's project update includes an{' '}
            <span style={{ fontWeight: stage === 'done' ? 700 : 400 }}>important</span>{' '}
            milestone for the team.
          </p>
        </div>

        {stage === 'idle' && (
          <div className={s.card}>
            <p className={s.label}>Format command</p>
            <p className={s.muted} style={{ marginBottom: 8 }}>
              Enter a formatting command to apply to the document.
            </p>
            <div className={s.row}>
              <input
                className={s.input}
                style={{ flex: 1, fontFamily: 'monospace' }}
                placeholder="Enter command..."
                value={command}
                onChange={e => { setCommand(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleApplyCommand()}
              />
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleApplyCommand}>
                Apply
              </button>
            </div>
            {error && (
              <p style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>
                {error}
                {attempts >= 2 && ' (Hint: try "bold")'}
              </p>
            )}
          </div>
        )}

        {stage === 'asked-word' && (
          <div className={s.card}>
            <p className={s.label}>Which word to bold?</p>
            <p className={s.muted} style={{ marginBottom: 8 }}>
              Type the exact word from the document you want to make bold.
            </p>
            <div className={s.row}>
              <input
                className={s.input}
                style={{ flex: 1 }}
                placeholder="Type word..."
                value={word}
                onChange={e => { setWord(e.target.value); setWordError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleApplyWord()}
              />
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleApplyWord}>
                Bold it
              </button>
            </div>
            {wordError && (
              <p style={{ color: '#ef4444', fontSize: 13, marginTop: 6 }}>{wordError}</p>
            )}
          </div>
        )}

        {stage === 'done' && (
          <div className={s.alertSuccess}>
            ✅ Bold applied! (You had to recall the command AND the exact word — nothing was shown to guide you.)
          </div>
        )}
      </div>
    </div>
  );
}
