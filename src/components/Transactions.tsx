import React from "react";
import DataTable from "./DataTable";
import { TRANSACTION_COLUMNS } from "../constants/transaction";
import { useQuery } from "@tanstack/react-query";
import fetchTransactions from "../api/transactions";

interface transactionProps {
  address: string |  null;
  limit?: number;
}

const Transactions: React.FC<transactionProps> = ({ address, limit = 10 }) => {
  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["todos", address],
    queryFn: () => fetchTransactions(address),
  });

  if (isPending) return <div> Loading Transactions ...</div>;

  if (isError) return <div> Unable to fetch transactions</div>;

  if (isSuccess && data.length < 1) return <div>No transactions</div>;

  return (
    <div>
      <h2 className="text-xl my-2 font-bold">Recent Transactions</h2>
      <DataTable
        datalist={data.slice(0, limit)}
        columns={TRANSACTION_COLUMNS}
      />
    </div>
  );
};

export default Transactions;
