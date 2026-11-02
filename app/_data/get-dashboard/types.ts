import { TransactionType } from "@/app/generated/prisma/browser";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};
