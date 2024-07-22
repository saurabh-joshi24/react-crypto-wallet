import Web3 from "web3";
import TOKENABI from "../abi.json";

interface tokenTransferArgs {
  tokenAddress: string;
  receiverAddress: string | null;
  amount: string;
}

export const handleERC20TokenTransfer = async ({
  tokenAddress,
  receiverAddress,
  amount,
}: tokenTransferArgs) => {
  try {
    if (window.ethereum) {
      //@ts-ignore
      const web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask provider
      const tokenContract = new web3.eth.Contract(TOKENABI, tokenAddress); // ERC20 token contract instance
      const decimals = await tokenContract.methods.decimals().call();
      const value = Number(amount) * 10 ** Number(decimals);

      // Get the current account (fromAddress) from MetaMask
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      tokenContract.methods
        .transfer(receiverAddress, value)
        .send({ from: fromAddress })
        .on("transactionHash", (hash) => {
          console.log("hash", hash);
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
        });
    }
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
};

export const getTokenBalance = async(contractAddress: string, accountAddress: string) => {
  try {
    if (window.ethereum) {
      //@ts-ignore
      const web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask provider
      const tokenContract = new web3.eth.Contract(TOKENABI, contractAddress); // ERC20 token contract instance
      const balance = await tokenContract.methods.balanceOf(accountAddress).call();
      const decimals = await tokenContract.methods.decimals().call();
      
      if (balance) {
          return Number(balance)/ 10 ** Number(decimals);
      } else {
         throw new Error("Unable to fetch balance");
      }
    }
  } catch (error) {
    console.error("Error transferring tokens:", error);
    return "";
  }
};
