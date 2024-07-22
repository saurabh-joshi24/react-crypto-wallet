interface PageNumberTypes {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  handleClick: (value: number) => void;
}

const PageNumbers: React.FC<PageNumberTypes> = ({
  currentPage,
  totalPages,
  pageLimit,
  handleClick,
}) => {
  const pageNumbers: JSX.Element[] = [];
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  if (totalPages > 1) {
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`min-w-30 border ${
            currentPage === i ? "bg-blue-600 text-white" : "bg-white"
          } ${
            currentPage === i ? "" : "hover:bg-gray-200"
          } border-gray-300 mx-1 ${currentPage === i ? "" : "cursor-pointer"}`}
          onClick={() => handleClick(i)}
        >
          <button className="w-full py-2 px-4 border-none">
            {i}
          </button>
        </li>
      );
    }
  }

  return <>{pageNumbers}</>;
};

export { PageNumbers };
