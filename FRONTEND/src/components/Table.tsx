import React from "react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  emptyText?: string;
};

function Table<T>({
  columns,
  data,
  rowKey,
  emptyText = "No data.",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="px-3 py-2 font-medium">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className="px-3 py-6 text-center text-gray-500"
                colSpan={columns.length}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const k = rowKey ? rowKey(row, i) : i;
              return (
                <tr key={k} className="border-t hover:bg-gray-50">
                  {columns.map((c) => (
                    <td
                      key={String(c.key)}
                      className={`px-3 py-2 ${c.className ?? ""}`}
                    >
                      {c.render ? c.render(row) : (row as any)[c.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
