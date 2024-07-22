import { ethers } from "ethers";
import { calculateTransactionFee, clipAddress } from "../utils/transaction";

const TRANSACTION_COLUMNS = [
  { header: "Transaction Hash", cell: (item: any) => clipAddress(item.hash) },
  { header: "Block", accessor: "blockNumber" },
  { header: "From", cell: (item: any) => clipAddress(item.from) },
  { header: "To", cell: (item: any) => clipAddress(item.to) },
  {
    header: "Value",
    cell: (item: any) => `${ethers.utils.formatEther(item.value)} ETH`,
  },
  {
    header: "Txn Fee",
    cell: (item: any) => calculateTransactionFee(item.gasPrice, item.gasUsed),
  },

  {
    header: "Timestamp",
    cell: (item: any) =>
      new Date(parseInt(item.timeStamp) * 1000).toLocaleString(),
  },
];

export { TRANSACTION_COLUMNS };
