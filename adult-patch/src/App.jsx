import AppRouter from "./app/Router";
import { AppStateProvider } from "./providers/AppStateProvider";

function App() {
  return (
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  );
}

export default App;