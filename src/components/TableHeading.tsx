interface RandomObject {
  [key: string]: any;
}

interface TableHeadingProps {
  columns: Array<RandomObject>;
}

const TableHeading: React.FC<TableHeadingProps> = ({ columns }) => {
  return (
    <tr>
      {columns.map((item, index) => (
        <th className="bg-gray-200 p-2" key={index}>
          {item.header}
        </th>
      ))}
    </tr>
  );
};


export default TableHeading;