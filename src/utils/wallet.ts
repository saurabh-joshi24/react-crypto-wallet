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
  onSuccess?: () => void;
  onFailure?: () => void;
}

type onWalletConnect = (walletArgs: walletArgs) => void;

interface connectWalletArgs {
  method: string;
  onWalletConnect: onWalletConnect;
}



const connectWallet = async ({
  method,
  onWalletConnect,
}: connectWalletArgs) => {

  if (window && window.ethereum) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // @ts-ignore
    await window.ethereum.request({ method });
    const accounts = await provider.listAccounts();
    const balance = await provider.getBalance(accounts[0]);
    const network = await provider.getNetwork();
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
  const { account, recipientAddress, amount } = transferArgs;

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
    alert("Transaction successful!");
  } catch (error) {
    console.error("Transaction failed:", error);
    alert("Transaction failed. Check console for details.");
  }
};

export { handleTransfer, connectWallet };
