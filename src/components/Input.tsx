interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  className?: string;
  step?: number;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  placeholder = "placeholder text",
  value,
  step,
  disabled,
  className,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      id={id}
      className={
        className
          ? className
          : "max-w-max mx-2 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
      type={type}
      placeholder={placeholder}
      value={value}
      step={step}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
