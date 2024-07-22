interface DropdownProps {
  placeholder?: string;
  value: string | number;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{
    [key: string]: any;
  }>;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  disabled,
  options = [],
  placeholder = "placeholder text",
  onChange,
}) => {
  return (
    <select className="px-4 py-2" onChange={onChange} value={value} disabled={disabled}>
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
