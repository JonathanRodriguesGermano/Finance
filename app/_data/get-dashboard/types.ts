import {
  TransactionCategory,
  TransactionType,
} from "@/app/generated/prisma/browser";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
