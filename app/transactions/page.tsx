import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { requireAuth } from "../_lib/auth";

const TransactionsPage = async () => {
  const userId = await requireAuth();

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  const transactionWithAmountAsNumber = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber(),
  }));

  console.log(transactionWithAmountAsNumber);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable
          columns={transactionColumns}
          data={transactionWithAmountAsNumber}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
