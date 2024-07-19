const fetchTransactions = async (address: string) => {
  try {
    const API_URL = `${process.env.REACT_APP_ETHERSCAN_API_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.status === "1") {
      return data.result;
    } else {
      console.error("Failed to fetch transactions:", response, data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default fetchTransactions;
