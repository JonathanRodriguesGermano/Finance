const Transaction = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <h1>Transactions: {id}</h1>;
};

export default Transaction;