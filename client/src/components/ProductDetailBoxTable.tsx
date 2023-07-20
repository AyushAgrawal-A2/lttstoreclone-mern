type ProductDetailBoxTableProps = {
  detail: string[][];
};

export default function ProductDetailBoxTable({
  detail,
}: ProductDetailBoxTableProps) {
  return (
    <table className="text-fgTertiary mt-2 mx-auto">
      {detail.map((row) => (
        <tr className="border-t-[1px] first:border-t-0">
          {row.map((cell) => (
            <td className="border-l-[1px] first:border-l-0 text-center p-2 first:w-[10ch]">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
