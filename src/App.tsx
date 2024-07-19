import "./App.css";
import Wallet from "./pages/Wallet";
import { WalletProvider } from "./context/Wallet";

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <Wallet />
      </div>
    </WalletProvider>
  );
}

export default App;
