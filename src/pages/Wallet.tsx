import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import AccountInfo from "../components/AccountInfo";
import { walletArgs, connectWallet, handleTransfer } from "../utils/wallet";
import { TOKENS } from "../constants/token";

const Wallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [network, setNetwork] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const onWalletConnect = ({ account, balance, network }: walletArgs) => {
    setAccount(account);
    setBalance(balance);
    setNetwork(network);
  };

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
        {!account ? (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
