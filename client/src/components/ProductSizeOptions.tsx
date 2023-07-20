type ProductSizeOptionsProps = {
  sizeOptions: SizeOption[];
  sizeIdx: number;
  setSizeIdx: (idx: number) => void;
};

export default function ProductSizeOptions({
  sizeOptions,
  sizeIdx,
  setSizeIdx,
}: ProductSizeOptionsProps) {
  return (
    <div className="my-5">
      <div className="my-2 text-2xl font-bold uppercase">
        SELECT SIZE: {sizeOptions[sizeIdx].name}
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {sizeOptions.map((sizeOption, idx) => (
          <li
            key={sizeOption.name}
            className={`h-[54px] min-w-[54px] border-2 border-fgPrimary rounded hover:scale-105 p-px cursor-pointer ${
              sizeIdx === idx && 'scale-110 hover:scale-110'
            }`}
            onClick={() => setSizeIdx(idx)}>
            <p
              className={`rounded-sm w-full h-full flex justify-center items-center text-lg font-semibold py-1 px-2 ${
                sizeIdx === idx && 'bg-bgSecondary text-fgSecondary'
              }`}>
              {sizeOption.symbol}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
