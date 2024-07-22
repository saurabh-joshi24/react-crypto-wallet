interface DropdownProps {
  placeholder?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{
    [key: string]: any;
  }>;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options = [],
  placeholder = "placeholder text",
  onChange,
}) => {
  return (
    <select className="px-4 py-2" onChange={onChange} value={value}>
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
