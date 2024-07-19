import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import AccountInfo from "../components/AccountInfo";
import Transactions from "../components/Transactions";
import {
  walletArgs,
  connectWallet,
  handleTransfer,
  checkWalletConnection,
} from "../utils/wallet";
import { TOKENS } from "../constants/token";
import { useWalletContext } from "../hooks/wallet";
import { useEffect } from "react";

const Wallet: React.FC = () => {
  const {
    account,
    setAccount,
    balance,
    setBalance,
    network,
    setNetwork,
    amount,
    setAmount,
    recipientAddress,
    setRecipientAddress,
    token,
    setToken,
    connected,
    setConnected,
  } = useWalletContext();

  const onWalletConnect = ({ account, balance, network }: walletArgs) => {
    setAccount(account);
    setBalance(balance);
    setNetwork(network);
  };

  useEffect(() => {
    // Check if wallet is already connected on initial loading if yes then connect
    checkWalletConnection(async (isConnected) => {
      setConnected(isConnected);
      if (isConnected) {
        handleWalletConnection();
      }
    });
  }, []);

  const handleWalletConnection = async () => {
    await connectWallet({ method: "eth_requestAccounts", onWalletConnect });
  };

  const handleTokenTransfer = async () => {
    if (!Number(amount)) {
      alert("Please enter a valid amount");
    } else if (Number(amount) > Number(balance)) {
      alert("Your account doesn't have enough balance");
    } else {
      await handleTransfer({ account, recipientAddress, amount });
    }
  };

  return (
    <div>
      <Header title="React Wallet App" />
      <div className="mt-4 flex flex-col justify-center items-center">
        {!account && !connected ? (
          <Button text="Connect Wallet" onClick={handleWalletConnection} />
        ) : (
          <div>
            <AccountInfo
              account={account}
              balance={balance}
              network={network}
            />
            <Input
              placeholder="Amount to send"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <Dropdown
              options={TOKENS}
              onChange={(e) => setToken(e.target.value)}
              value={token}
              placeholder="Select Token"
            />
            <Button text="Send Token" onClick={handleTokenTransfer} />
            <Transactions address={account} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
