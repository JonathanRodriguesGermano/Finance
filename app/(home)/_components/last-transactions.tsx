import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { TransactionType } from "@/app/generated/prisma/browser";
import { TransactionDto } from "@/app/_data/transaction-dto";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: TransactionDto[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: TransactionDto) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };
  const getAmountPrefix = (transaction: TransactionDto) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border bg-card">
      <div className="space-y-6 py-6">
        <CardHeader className="flex! flex-row items-center justify-between">
          <CardTitle className="font-bold">Últimas Transações</CardTitle>
          <Button
            variant="outline"
            className="rounded-full font-bold"
            nativeButton={false}
            render={<Link href="/transactions" />}
          >
            Ver mais
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {lastTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/10 p-3 text-white">
                  <Image
                    src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                    height={20}
                    width={20}
                    alt="PIX"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </CardContent>
      </div>
    </ScrollArea>
  );
};

export default LastTransactions;
