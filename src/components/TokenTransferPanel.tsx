import { useWalletContext } from "../hooks/wallet";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { TOKENS } from "../constants/token";

interface TokenTransferPanelProps {
  handleTokenTransfer: () => void;
}

const TokenTransferPanel: React.FC<TokenTransferPanelProps> = ({
  handleTokenTransfer,
}) => {
  const {
    amount,
    setAmount,
    recipientAddress,
    setRecipientAddress,
    token,
    setToken,
  } = useWalletContext();

  return (
    <div>
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
  );
};

export default TokenTransferPanel;
