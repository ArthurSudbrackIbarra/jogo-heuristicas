import { GameProvider, useGame } from './context/GameContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import './App.css';

function GameRouter() {
  const { state } = useGame();

  switch (state.phase) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      // playing | feedback | reveal — all handled by GameScreen
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

