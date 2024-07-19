const TRANSACTION_COLUMNS = [
    { header: "Transaction Hash", accessor: "hash" },
    { header: "From", accessor: "from" },
    { header: "To", accessor: "to"},
    { header: "Value", accessor: "value" },
    { header: "Timestamp", cell: (item: any) => new Date(parseInt(item.timeStamp) * 1000).toLocaleString()},
]

export { TRANSACTION_COLUMNS }