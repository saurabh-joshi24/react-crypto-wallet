import React, { createContext, useState } from 'react';

interface WalletContextType {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  network: string | null;
  setNetwork: React.Dispatch<React.SetStateAction<string | null>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  recipientAddress: string;
  setRecipientAddress: React.Dispatch<React.SetStateAction<string>>;
  selectedToken: string;
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
  tokens: Array<any>;
  setTokens: React.Dispatch<React.SetStateAction<Array<{[key: string]: string}>>>;

  
}

interface WalletProviderProps {
    children: React.ReactNode
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Array<{[key: string]: string}>>([]);

  const contextValue: WalletContextType = {
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
    selectedToken, 
    setSelectedToken,
    connected, 
    setConnected,
    tokens,
    setTokens
  };

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};
