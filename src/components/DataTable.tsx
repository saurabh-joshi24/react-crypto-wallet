interface RandomObject {
  [key: string]: any;
}

interface DataTableProps {
  datalist: Array<RandomObject>;
  columns: Array<RandomObject>;
}

const DataTable: React.FC<DataTableProps> = ({ datalist, columns }) => {
  // this function allows to access nested value inside object like (a.nestedKeyA)
  const getValue = (item: RandomObject, accessor: string) => {
    return accessor
      .split(".")
      .reduce(
        (obj: any, key: string | number) =>
          obj && obj[key] !== undefined ? obj[key] : "",
        item
      );
  };

  return (
    <table className="w-90 mx-auto border-collapse mb-20 border-1 border-gray-300">
      <thead>
        <tr>
          {columns.map((item, index) => (
            <th className="bg-gray-200 p-2" key={index}>
              {item.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datalist.map((item, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td className="border-b border-gray-300 p-4" key={index}>
                {column.cell
                  ? column.cell(item)
                  : getValue(item, column.accessor)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
