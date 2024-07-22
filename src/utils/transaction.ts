export const clipAddress = (
  address: string,
  startLength = 6,
  endLength = 4
) => {
  if (!address || address.length < startLength + endLength + 2) {
    return address; // Return the full address if it's too short
  }

  const clippedStart = address.slice(0, startLength);
  const clippedEnd = address.slice(-endLength);

  return `${clippedStart}...${clippedEnd}`;
};

export const calculateTransactionFee = (gasPrice: string, gasUsed: string) => {
  // gasPrice and gasUsed are in hexadecimal format, convert to decimal
  const gasPriceDecimal = parseInt(gasPrice, 16);
  const gasUsedDecimal = parseInt(gasUsed, 16);

  // Calculate transaction fee in wei
  const transactionFeeWei = gasPriceDecimal * gasUsedDecimal;

  // Convert to Ether (ETH)
  const transactionFeeEth = transactionFeeWei / 1e18;

  return transactionFeeEth.toFixed(6);;
};
