interface HeaderProps {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-column items-center justify-center text-dark">
      <h1>{title || "This is header"}</h1>
    </header>
  );
};

export default Header;
