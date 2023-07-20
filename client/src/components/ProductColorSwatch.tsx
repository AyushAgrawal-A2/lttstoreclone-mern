type ProductColorSwatchProps = {
  colorSwatch: ColorSwatch;
  colorIdx: number;
  changeColor: (idx: number, imgPos: number) => void;
};

export default function ProductColorSwatch({
  colorSwatch,
  colorIdx,
  changeColor,
}: ProductColorSwatchProps) {
  const colors = Object.keys(colorSwatch);

  function onClick(idx: number) {
    const color = colors[idx];
    changeColor(idx, colorSwatch[color].imgPosition);
  }
  return (
    <div className="my-5">
      <div className="my-2 text-2xl font-bold uppercase">
        SELECT COLOR: {colors[colorIdx]}
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {Object.keys(colorSwatch).map((color, idx) => (
          <li
            key={color}
            className={`h-[54px] w-[54px] rounded hover:scale-110 p-0.5 ${
              colorIdx === idx && 'scale-110 border-2 border-fgPrimary'
            }`}
            onClick={() => onClick(idx)}
            title={color}>
            <p
              className="w-full h-full border border-fgPrimary rounded-sm"
              style={{
                backgroundColor: colorSwatch[color].backgroundColor,
                backgroundImage: `url(${colorSwatch[color].backgroundImage})`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
