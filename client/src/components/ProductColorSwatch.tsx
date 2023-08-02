type ProductColorSwatchProps = {
  colorSwatch: ColorSwatch;
  colorIdx: number;
  changeColor: (idx: number, imgPos: number) => void;
  size: 'sm' | 'lg';
};

export default function ProductColorSwatch({
  colorSwatch,
  colorIdx,
  changeColor,
  size,
}: ProductColorSwatchProps) {
  const colors = Object.keys(colorSwatch);

  function onClick(idx: number) {
    const color = colors[idx];
    changeColor(idx, colorSwatch[color].imgPosition);
  }
  return (
    <div className="my-5">
      {size === 'lg' && (
        <div className="my-2 text-2xl font-bold uppercase text-center md:text-start">
          SELECT COLOR: {colors[colorIdx]}
        </div>
      )}
      <ul
        className={`flex flex-row flex-wrap gap-1.5 justify-center ${
          size === 'lg' && 'md:justify-start'
        }`}>
        {Object.keys(colorSwatch).map((color, idx) => (
          <li
            key={color}
            className={`rounded hover:scale-110 p-0.5 cursor-pointer ${
              size === 'sm' ? 'h-[22px] w-[22px]' : 'h-[55px] w-[55px]'
            }  ${
              colorIdx === idx &&
              'scale-110 border-2 border-fgPrimary cursor-pointer	'
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
