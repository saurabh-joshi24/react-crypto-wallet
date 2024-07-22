import { useWalletContext } from "../hooks/wallet";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { fetchTokens } from "../api/tokens";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getTokenBalance } from "../utils/token";
import { getAccountBalance } from "../utils/wallet";

interface TokenTransferPanelProps {
  address: string | null;
  handleTokenTransfer: (address: string, type?: string) => void;
}

const TokenTransferPanel: React.FC<TokenTransferPanelProps> = ({
  address,
  handleTokenTransfer,
}) => {
  const {
    amount,
    setAmount,
    recipientAddress,
    setRecipientAddress,
    account,
    selectedToken,
    setSelectedToken,
    setBalance,
    tokens,
    setTokens,
    network,
  } = useWalletContext();

  const { data, isError, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["tokens", address],
    queryFn: () => fetchTokens(address),
  });

  useEffect(() => {
    refetch();
  }, [address]);

  const memoizedTokens = useMemo(() => {
    if (isSuccess && data && data.length) {
      return data;
    } else {
      return [];
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const allTokens = memoizedTokens;
    setTokens((prevtokens) => prevtokens.concat(allTokens));
  }, [memoizedTokens, setTokens]);

  if (isPending) return <div> Fetching Tokens ...</div>;

  if (isError) return <div> Unable to fetch tokens</div>;

  const onButtonClick = () => {
    // if selected token is not erc20 contract
    if (selectedToken === account) {
      handleTokenTransfer(selectedToken);
    } else {
      //@ts-ignore
      const tokenSelected = memoizedTokens.find(
        (item) => item.value === selectedToken && item.type === "contract"
      );
      if (tokenSelected && tokenSelected.type) {
        handleTokenTransfer(selectedToken, tokenSelected.type);
      }
    }
  };

  const onDropdownChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let tokenBalance;
    const value = event.target.value;
    setSelectedToken(value);
    // if selected token is not erc20 contract token
    if (value !== account) {
      //@ts-ignore
      tokenBalance = await getTokenBalance(value, address);
    } else {
      tokenBalance = await getAccountBalance();
    }
    setBalance(String(tokenBalance));
  };

  return (
    <div>
      <Input
        placeholder="Amount to send"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={network !== "sepolia"}
      />
      <Input
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        disabled={network !== "sepolia"}
      />
      {isSuccess && (
        <Dropdown
          options={tokens}
          onChange={onDropdownChange}
          value={selectedToken}
          placeholder="Select Token"
          disabled={network !== "sepolia"}
        />
      )}
      <Button
        disabled={network !== "sepolia"}
        text="Send Token"
        onClick={() => onButtonClick()}
      />
    </div>
  );
};

export default TokenTransferPanel;
