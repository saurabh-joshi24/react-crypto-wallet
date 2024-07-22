export const fetchTokens = async (address: string | null) => {
  try {
    const API_URL = `${process.env.REACT_APP_ETHERSCAN_API_BASE_URL}?module=account&action=txlist&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const uniqueTokens: Array<string> = [];
    data.result.forEach((tx: any) => {
      if (tx.contractAddress && uniqueTokens.indexOf(tx.contractAddress) < 0) {
        uniqueTokens.push(tx.contractAddress);
      }
    });

    const contractDetailsPromises = uniqueTokens.map((token: string, index: number) => fetchContractDetails(token, index));

    // fetch each erc20 contract detail
    const result = await Promise.all(contractDetailsPromises);

    const parsedContracts = result
      .filter((val) => typeof val === "object" && val.tokenName && val.tokenSymbol)
      .map((val) => {
        return {
          balance: val.value,
          label: val.tokenName,
          value: val.contractAddress,
          type: "contract",
        };
      });

    return parsedContracts
  } catch (error) {
    console.error("Error fetching tokens:", error);
  }
};

export const fetchContractDetails = async (
  contractAddress: string,
  index: number,
  delay = 1000
) => {
  try {
    const API_URL_TOKEN_TX = `${process.env.REACT_APP_ETHERSCAN_API_BASE_URL}?module=account&action=tokentx&contractaddress=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
    await new Promise((resolve) => setTimeout(resolve, index * 1000));
    const response = await fetch(API_URL_TOKEN_TX);
    if (!response.ok) {
      throw new Error(`Failed to fetch token details for ${contractAddress}`);
    }
    const data = await response.json();

    if (data.result.length > 0) {
      return data.result[0];
    }
  } catch (error) {
    console.error("Error fetching tokens:", error);
  }
};
