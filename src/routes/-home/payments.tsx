import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
  { id: "a1b2c3d4", amount: 320, status: "success", email: "ana@empresa.com" },
  { id: "e5f6g7h8", amount: 45, status: "failed", email: "luis@correo.com" },
  { id: "i9j0k1l2", amount: 980, status: "success", email: "sofia@demo.io" },
];

// Each status maps to a Badge variant, and each variant consumes different tokens:
// default -> --primary, secondary -> --secondary, outline -> --border, destructive -> --destructive
const statusVariant = {
  pending: "outline",
  processing: "secondary",
  success: "default",
  failed: "destructive",
} as const;

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked)}
        aria-label="Seleccionar fila"
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={statusVariant[status]}>{status}</Badge>;
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {new Intl.NumberFormat("es-CO", { style: "currency", currency: "USD" }).format(
          row.original.amount,
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm">
        Ver
      </Button>
    ),
  },
];
