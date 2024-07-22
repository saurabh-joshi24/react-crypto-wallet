import { useState, useEffect } from "react";
import DataTable from "./Table";
import { TRANSACTION_COLUMNS } from "../constants/transaction";
import {
  INITIAL_PAGINATION_DATA,
  PaginationType,
} from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";
import fetchTransactions from "../api/transactions";
import Pagination from "./Pagination";

interface transactionProps {
  address: string | null;
  refetchTransaction: boolean;
}

const Transactions: React.FC<transactionProps> = ({ address, refetchTransaction }) => {
  const [paginationData, setPaginationData] = useState({...INITIAL_PAGINATION_DATA });
  const [totalPages, setTotalPages] = useState<number>(0)
  const { itemsPerPage, indexOfFirstItem, indexOfLastItem } = paginationData;

  const { data, isError, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["transactions", address],
    queryFn: () => fetchTransactions(address),
    refetchInterval: 10000, // Refetch data every 10 seconds
  });

  useEffect(() => {
    setPaginationData(INITIAL_PAGINATION_DATA);
    setTotalPages(0);
  }, [address])

  useEffect(() => {
    if (refetchTransaction) {
      refetch();
    }
  }, [refetchTransaction]);

  useEffect(() => {
    // if api call is success then pagination data
    if (isSuccess && data && data.length) {
      const totalPagesCount = Math.ceil(
        data.length / INITIAL_PAGINATION_DATA.itemsPerPage
      );
      setPaginationData({ ...paginationData });
      setTotalPages(totalPagesCount)
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (data && data.length) {
      const totalPagesCount = Math.ceil(data.length / itemsPerPage);
      setPaginationData({ ...paginationData });
      setTotalPages(totalPagesCount)
    }
  }, [itemsPerPage, data, setPaginationData]);

  const onPaginationChange = (pageData: PaginationType) => {
    setPaginationData(pageData);
  };

  if (isPending) return <div> Loading Transactions ...</div>;

  if (isError) return <div> Unable to fetch transactions</div>;

  if (isSuccess && data.length < 1) return <div>No transactions</div>;

  return (
    <div>
      <h2 className="text-xl my-4 font-bold">Recent Transactions</h2>
      <DataTable
        datalist={data.slice(indexOfFirstItem, indexOfLastItem)}
        columns={TRANSACTION_COLUMNS}
      />
      <Pagination onChange={onPaginationChange} {...paginationData} totalPages={totalPages}/>
    </div>
  );
};

export default Transactions;
