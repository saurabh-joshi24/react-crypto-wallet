import { useEffect } from "react";
import { PageNumbers } from "./PageNumbers";
import { PaginationType } from "@/constants/pagination";
import Input from "../Input";

interface PaginationProps {
  onChange: (paginationData : PaginationType ) => void;
}

const Pagination: React.FC<PaginationProps & PaginationType> = ({ onChange, ...paginationData }) => {
  const { currentPage, totalPages, pageLimit, itemsPerPage } = paginationData;

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    onChange({
      ...paginationData,
      indexOfFirstItem: firstItemIndex,
      indexOfLastItem: lastItemIndex,
    });
  }, [currentPage, itemsPerPage]);

  // handles page change on page number click
  const handleClick = (page: number) => {
    onChange({
      ...paginationData,
      currentPage: page,
    });
  };

  // handles next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      onChange({
        ...paginationData,
        currentPage: nextPage,
      });
    }
  };

  // handles previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      onChange({
        ...paginationData,
        currentPage: prevPage,
      });
    }
  };

  // handles
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItemsPerPage = Number(e.target.value);
    const totalItems = totalPages * itemsPerPage;

    if (newItemsPerPage <= totalItems) {
      onChange({
        ...paginationData,
        itemsPerPage: newItemsPerPage,
        indexOfFirstItem: 0,
        indexOfLastItem: newItemsPerPage,
        currentPage: 1, // reset to first page
      });
    }
  };

  return (
    <nav className="flex w-full justify-center items-center mx-auto mt-20 mb-4">
      <div className="flex justify-end items-center px-4">
        <label htmlFor="resultPer" className="font-normal mr-2">
          Results Per Page:{" "}
        </label>
        <Input
          type="number"
          id="resultPerPage"
          step={5}
          value={itemsPerPage}
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
          onChange={handleItemsPerPageChange}
        />
      </div>
      <ul className="flex list-none justify-center ml-4">
        <li
          className={`min-w-30 bg-${
            currentPage === 1 ? "gray" : "white"
          } border border-gray-300 mx-1 ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed opacity-70"
              : "cursor-pointer opacity-100"
          }`}
          onClick={handlePrevPage}
        >
          <button className="w-full py-2 px-4 bg-transparent border-none">
            Previous
          </button>
        </li>
        <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handleClick}
          pageLimit={pageLimit}
        />
        <li
          className={`min-w-30 bg-${
            currentPage === totalPages ? "gray" : "white"
          } border border-gray-300 mx-1 ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed opacity-70"
              : "cursor-pointer opacity-100"
          }`}
          onClick={handleNextPage}
        >
          <button className="w-full py-2 px-4 bg-transparent border-none">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
