import { createFileRoute } from "@tanstack/react-router";

import { DataTable } from "@/components/ui/data-table";
import { columns, payments } from "./-home/payments";
import { ThemePlayground } from "./-home/theme-playground";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Pagos</h1>
        <p className="text-sm text-muted-foreground">
          Tabla shadcn + TanStack Table. Cambia los tokens arriba y observa la tabla.
        </p>
      </header>
      <ThemePlayground />
      <DataTable columns={columns} data={payments} />
    </main>
  );
}
