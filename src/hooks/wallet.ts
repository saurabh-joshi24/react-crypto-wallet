import { WalletContext } from "@/context/Wallet";
import { useContext } from "react";

export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
      throw new Error('useWalletContext must be used within an WalletProvider');
    }
    return context;
  };