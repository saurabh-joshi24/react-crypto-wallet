import { ethers } from "ethers";

export interface walletArgs {
  account: string;
  balance: string;
  network: string;
}

interface transferArgs {
  account: string | null;
  recipientAddress: string;
  amount: string;
  onTransactionSuccess?: (value: boolean) => void 
}

type onWalletConnect = (walletArgs: walletArgs) => void;

interface connectWalletArgs {
  method: string;
  onWalletConnect: onWalletConnect;
  handleChainChanged: (value: string) => void;
  handleAccountsChanged: (value: Array<any>) => void;
}

const connectWallet = async ({
  method,
  onWalletConnect,
  handleChainChanged,
  handleAccountsChanged,
}: connectWalletArgs) => {
  if (window && window.ethereum) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // @ts-ignore
    await window.ethereum.request({ method });
    const accounts = await provider.listAccounts();
    const balance = await provider.getBalance(accounts[0]);
    const network = await provider.getNetwork();
    //@ts-ignore
    // Listen for network changes
    window.ethereum.on("chainChanged", handleChainChanged);
    //@ts-ignore
    // Listen for account changes
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    // @ts-ignore
    onWalletConnect({
      account: accounts[0],
      balance: ethers.utils.formatEther(balance),
      network: network.name,
    });
  } else {
    alert("Please install MetaMask!");
  }
};

const handleTransfer = async (transferArgs: transferArgs) => {
  const { account, recipientAddress, amount , onTransactionSuccess } = transferArgs;

  if (!account || !recipientAddress || !amount) return;
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tx = {
    to: recipientAddress,
    // @ts-ignore
    value: ethers.utils.parseEther(amount),
  };

  try {
    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
    if (onTransactionSuccess) {
     onTransactionSuccess(true)
    }
    alert("Transaction successful!");
  } catch (error) {
    console.error("Transaction failed:", error);
    alert("Transaction failed. Check console for details.");
  }
};

const checkWalletConnection = async (callback: (value: boolean) => void) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      // Check if signer is connected and has an address
      await signer.getAddress();
      callback(true);
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      callback(false);
    }
  } else {
    console.error("MetaMask not found");
    callback(false);
  }
};

const getAccountBalance = async () => {
  try {
    if (window && window.ethereum) {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const balance = await provider.getBalance(accounts[0]);
      
      if (balance) {
        return ethers.utils.formatEther(balance);
      } else {
        throw new Error("Unable to fetch balance");
      }
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "";
  }
};

export { handleTransfer, connectWallet, checkWalletConnection, getAccountBalance };
