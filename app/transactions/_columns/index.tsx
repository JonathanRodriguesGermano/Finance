"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "@/app/_components/ui/data-table-features";

import { Transaction } from "@/app/generated/prisma/browser";
import TransactionTypeBadge from "../_components/type-badge";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Transaction>();

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
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Método de pagamento",
  }),
  columnHelper.accessor("amount", {
    header: "Valor",
  }),
  columnHelper.accessor("date", {
    header: "Data",
  }),
  columnHelper.display({
    id: "actions",
    header: "",
  }),
]);
