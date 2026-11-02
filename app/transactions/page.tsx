import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { requireAuth } from "../_lib/auth";
import { toTransactionDtos } from "@/app/_data/transaction-dto";

const TransactionsPage = async () => {
  const userId = await requireAuth();

  const transactions = toTransactionDtos(
    await db.transaction.findMany({
      where: {
        userId,
      },
    }),
  );

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
