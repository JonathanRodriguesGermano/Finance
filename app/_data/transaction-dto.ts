import { Transaction } from "@/app/generated/prisma/browser";

export type TransactionDto = Omit<Transaction, "amount"> & {
  amount: number;
};

export const toTransactionDto = (transaction: Transaction): TransactionDto => ({
  ...transaction,
  amount: transaction.amount.toNumber(),
});

export const toTransactionDtos = (
  transactions: Transaction[],
): TransactionDto[] => transactions.map(toTransactionDto);
