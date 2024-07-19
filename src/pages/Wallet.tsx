import { useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import AccountInfo from "../components/AccountInfo";
import Transactions from "../components/Transactions";
import TokenTransferPanel from "../components/TokenTransferPanel";
import {
  walletArgs,
  connectWallet,
  handleTransfer,
  checkWalletConnection,
} from "../utils/wallet";
import { useWalletContext } from "../hooks/wallet";
import { ethers } from "ethers";

const Wallet: React.FC = () => {
  const {
    account,
    setAccount,
    balance,
    setBalance,
    network,
    setNetwork,
    amount,
    recipientAddress,
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
    return () => {
      // Remove listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts: Array<any>) => {
    if (window.ethereum) {
      setAccount(accounts[0]);
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //@ts-ignore
      const balance = await provider.getBalance(accounts[0]);
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const handleChainChanged = async () => {
    if (window.ethereum) {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //@ts-ignore
      const network = await provider.getNetwork();
      const accounts = await provider.listAccounts();
      const balance = await provider.getBalance(accounts[0]);
      setBalance(ethers.utils.formatEther(balance));
      setNetwork(network.name);
    }
  };

  const handleWalletConnection = async () => {
    await connectWallet({
      method: "eth_requestAccounts",
      onWalletConnect,
      handleAccountsChanged,
      handleChainChanged,
    });
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
            <TokenTransferPanel handleTokenTransfer={handleTokenTransfer} />
            {account && <Transactions address={account} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
