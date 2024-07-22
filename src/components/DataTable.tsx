import TableData from "./TableData";
import TableHeading from "./TableHeading";

interface RandomObject {
  [key: string]: any;
}

interface DataTableProps {
  datalist: Array<RandomObject>;
  columns: Array<RandomObject>;
}

const DataTable: React.FC<DataTableProps> = ({ datalist, columns }) => {
  return (
    <table className="w-90 mx-auto border-collapse mb-20 border-1 border-gray-300">
      <thead>
        <TableHeading columns={columns} />
      </thead>
      <tbody>
        <TableData datalist={datalist} columns={columns} />
      </tbody>
    </table>
  );
};

export default DataTable;
