export type Column<T> = { header: string; cell: (row: T) => React.ReactNode };

export default function AdminTable<T extends { _id: string }>({ columns, rows, empty }: { columns: Column<T>[]; rows: T[]; empty: string }) {
  if (rows.length === 0) return <p className="rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-forest-900 text-white">
          <tr>{columns.map((column) => <th key={column.header} scope="col" className="px-4 py-3 font-semibold">{column.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row._id} className="hover:bg-mist">
              {columns.map((column) => <td key={column.header} className="px-4 py-3 align-top">{column.cell(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
