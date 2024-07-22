interface RandomObject {
    [key: string]: any;
}  

interface TableDataProps {
    datalist: Array<RandomObject>;
    columns: Array<RandomObject>;
}

const TableData: React.FC<TableDataProps> = ({ datalist, columns }) => {
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
    <>
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
    </>
  );
};

export default TableData;
