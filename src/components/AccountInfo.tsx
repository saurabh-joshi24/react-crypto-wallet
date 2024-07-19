interface accountInfoProps {
  account: string | null;
  balance: string;
  network: string | null;
}

const AccountInfo: React.FC<accountInfoProps> = ({
  account,
  balance,
  network,
}) => {
  return (
    <>
      <p className="my-2">
        <b>Account:</b> {account}
      </p>
      <p className="my-2">
        <b>Balance:</b> {balance} ETH
      </p>
      <p className="my-2">
        <b>Network:</b> {network}
      </p>
    </>
  );
};

export default AccountInfo;
