import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@/app/generated/prisma/browser";
import { toTransactionDtos } from "@/app/_data/transaction-dto";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { endOfMonth, startOfMonth } from "date-fns";

export const getDashboard = async (month: string, userId: string) => {
  const monthDate = new Date(new Date().getFullYear(), Number(month) - 1, 1);

  const where = {
    userId,
    date: {
      gte: startOfMonth(monthDate),
      lt: endOfMonth(monthDate),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.DEPOSIT },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.INVESTMENT },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.EXPENSE },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const otherTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.OTHER },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal - otherTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.OTHER]: Math.round(
      (Number(otherTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastTransactions = toTransactionDtos(
    await db.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take: 20,
    }),
  );
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    otherTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
