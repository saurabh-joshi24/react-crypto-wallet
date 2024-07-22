import axios from "axios";
import { env } from "../env";

const { BASE_URL, API_KEY } = env.ETHERSCAN;

const fetchTransactions = async (address: string | null) => {
  const API_URL = `${BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`;

  try {
    const response = await axios.get(API_URL);

    if (response.status === 200 && response.data.status === "1") {
      const data = response.data;
      return data.result;
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default fetchTransactions;
