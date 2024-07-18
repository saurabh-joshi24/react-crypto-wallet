interface HeaderProps {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col my-2 items-center justify-center text-dark text-4xl text-bold">
      <h1>{title || "This is header"}</h1>
    </header>
  );
};

export default Header;
