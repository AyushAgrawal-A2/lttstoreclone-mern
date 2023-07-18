type ProductImagesProps = {
  productImages: string[];
  imageModal: (idx: number) => void;
};

export default function ProductImages({
  productImages,
  imageModal,
}: ProductImagesProps) {
  return (
    <ul className="max-h-[90vh] overflow-auto no-scrollbar scroll-smooth snap-y snap-proximity overscroll-contain flex flex-col gap-10 rounded-2xl">
      {productImages.map((imgURL, idx) => (
        <li className="snap-start">
          <img
            src={imgURL}
            id={`image${idx}`}
            className="rounded-2xl bg-[#f2f2f2] cursor-zoom-in"
            onClick={() => imageModal(idx)}
          />
        </li>
      ))}
    </ul>
  );
}
