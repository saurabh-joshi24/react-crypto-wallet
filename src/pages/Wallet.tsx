import { useEffect } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import AccountInfo from "@/components/AccountInfo";
import Transactions from "@/components/Transactions";
import TokenTransferPanel from "@/components/TokenTransferPanel";
import {
  walletArgs,
  connectWallet,
  handleTransfer,
  checkWalletConnection,
} from "@/utils/wallet";
import { useWalletContext } from "@/hooks/wallet";
import { ethers } from "ethers";
import { handleERC20TokenTransfer } from "@/utils/token";

const Wallet: React.FC = () => {
  const {
    account,
    setAccount,
    balance,
    setBalance,
    network,
    setNetwork,
    setAmount,
    setRecipientAddress,
    amount,
    recipientAddress,
    connected,
    selectedToken,
    setConnected,
    setTokens,
    tokens,
    refetchTransaction,
    setRefetchTransaction,
  } = useWalletContext();

  const onWalletConnect = ({ account, balance, network }: walletArgs) => {
    setAccount(account);
    setBalance(balance);
    setNetwork(network);
    setTokens([{ label: network, balance: balance, value: account }]);
  };

  useEffect(() => {
    // Check if wallet is already connected on initial loading if yes then connect
    checkWalletConnection(async (isConnected: boolean) => {
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
    if (window.ethereum && accounts.length) {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //@ts-ignore
      const balance = await provider.getBalance(accounts[0]);
      const network = await provider.getNetwork();
      setAccount(accounts[0]);
      setBalance(ethers.utils.formatEther(balance));
      setTokens([{ label: network.name, balance: String(balance), value: accounts[0] }])
    } else {
      window.location.reload();
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
      //@ts-ignore
      setTokens([{ label: network.name, balance: String(balance), value: account }])
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

  const onTransactionSuccess =  async(value: boolean) => {
    setRefetchTransaction(value);
    setAmount("");
    setRecipientAddress("");
  }

  const handleTokenTransfer = async (address: string,  type?: string) => {
    if (!Number(amount)) {
      alert("Please enter a valid amount");
    } else if (Number(amount) > Number(balance)) {
      alert("Your account doesn't have enough balance");
    } else {
      setRefetchTransaction(false);
      if (type === "contract") {
        await handleERC20TokenTransfer({
          tokenAddress: address,
          receiverAddress: recipientAddress,
          amount,
          onTransactionSuccess
        });
      } else {
        await handleTransfer({ account: address, recipientAddress, amount, onTransactionSuccess });
      }
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
              tokenSymbol={selectedToken && tokens ? tokens.filter(item => selectedToken === item.value)[0]?.symbol: "ETH"}
            />
            {account && (
              <>
                <TokenTransferPanel
                  address={account}
                  handleTokenTransfer={handleTokenTransfer}
                />
                <Transactions address={account} refetchTransaction={refetchTransaction} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
