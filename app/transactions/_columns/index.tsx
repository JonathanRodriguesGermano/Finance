"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "@/app/_components/ui/data-table-features";

import { Transaction } from "@/app/generated/prisma/browser";
import TransactionTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

// Modifica o tipo do Prisma substituindo Decimal por number
export type TransactionDto = Omit<Transaction, "amount"> & {
  amount: number;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, TransactionDto>();

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
  INSURANCE: "Seguro",
  LOAN: "Empréstimo",
  PERSONAL: "Pessoal",
  GIFT: "Presente",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const transactionColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Nome",
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  }),
  columnHelper.accessor("category", {
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  }),
  columnHelper.accessor("date", {
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  }),
  columnHelper.accessor("amount", {
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <EditIcon />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  }),
]);
