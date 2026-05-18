import { GameProvider, useGame } from "./context/GameContext";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { GameScreen } from "./screens/GameScreen";
import { ExpertScreen } from "./screens/ExpertScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import "./App.css";

function GameRouter() {
  const { state } = useGame();

  switch (state.phase) {
    case "welcome":
      return <WelcomeScreen />;
    case "expert":
      return <ExpertScreen />;
    case "results":
      return <ResultsScreen />;
    default:
      return <GameScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
