import axios from "axios";

export const fetchTokens = async (address: string | null) => {
  try {
    const API_URL = `${process.env.REACT_APP_ETHERSCAN_API_BASE_URL}?module=account&action=txlist&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

    // Using Axios to make the API request
    const response = await axios.get(API_URL);

    if (!response.data || response.data.status !== "1") {
      throw new Error("Failed to fetch data from API");
    }

    const data = response.data.result;
    const uniqueTokens: Array<string> = [];

    data.forEach((tx: any) => {
      if (
        tx.contractAddress &&
        uniqueTokens.indexOf(tx.contractAddress) === -1
      ) {
        uniqueTokens.push(tx.contractAddress);
      }
    });

    // Create an array of promises to fetch contract details for each token
    const contractDetailsPromises = uniqueTokens.map(
      (token: string, index: number) => fetchContractDetails(token, index)
    );

    // fetch each erc20 contract detail
    const result = await Promise.all(contractDetailsPromises);

    // Filter and map the results for each contract address
    const parsedContracts = result
      .filter(
        (val) => typeof val === "object" && val.tokenName && val.tokenSymbol
      )
      .map((val) => ({
        label: val.tokenName,
        value: val.contractAddress,
        type: "contract",
      }));

    return parsedContracts;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

export const fetchContractDetails = async (
  contractAddress: string,
  index: number,
  delay = 1000
) => {
  try {
    const API_URL_TOKEN_TX = `${process.env.REACT_APP_ETHERSCAN_API_BASE_URL}?module=account&action=tokentx&contractaddress=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

    // Introduce a delay between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, index * delay));

    const response = await axios.get(API_URL_TOKEN_TX);
    
    if (!response.data) {
      throw new Error(`Failed to fetch token details for ${contractAddress}`);
    }

    const data = response.data.result;

    if (data.length > 0) {
      return data[0];
    }
  } catch (error) {
    console.error("Error fetching token details:", error);
    throw error;
  }
};
