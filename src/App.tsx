import { GameProvider, useGame } from "./context/GameContext";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { GameScreen } from "./screens/GameScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import "./App.css";

function GameRouter() {
  const { state } = useGame();

  switch (state.phase) {
    case "welcome":
      return <WelcomeScreen />;
    case "shop":
      return <ShopScreen />;
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
