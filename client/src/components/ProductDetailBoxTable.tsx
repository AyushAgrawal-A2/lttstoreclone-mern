type ProductDetailBoxTableProps = {
  detail: string[][];
};

export default function ProductDetailBoxTable({
  detail,
}: ProductDetailBoxTableProps) {
  return (
    <table className="text-fgTertiary mt-2 mx-auto">
      <tbody>
        {detail.map((row, r) => (
          <tr
            key={`row${r}`}
            className="border-t-[1px] first:border-t-0">
            {row.map((cell, c) => (
              <td
                key={`cell${r},${c}`}
                className="border-l-[1px] first:border-l-0 text-center p-2 first:w-[10ch]">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
