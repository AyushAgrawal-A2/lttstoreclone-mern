type ProductImagesProps = {
  images: Image[];
  imageModal: (idx: number) => void;
};

export default function ProductImages({
  images,
  imageModal,
}: ProductImagesProps) {
  return (
    <ul className="max-h-[50vh] lg:max-h-[90vh] overflow-auto no-scrollbar scroll-smooth snap-y snap-proximity overscroll-contain flex flex-col gap-10 rounded-2xl mb-4">
      {images.map((image, idx) => (
        <li
          key={idx}
          className="snap-start relative group">
          <img
            src={image.src}
            id={`image${idx}`}
            className="rounded-2xl bg-[#f2f2f2] cursor-zoom-in"
            onClick={() => imageModal(idx)}
            loading="lazy"
          />
          {image.overlay && (
            <div className="absolute top-0 right-0 opacity-0 m-3 text-black bg-white border border-black rounded-lg p-3 group-hover:opacity-100 transition-opacity duration-500	">
              {image.overlay}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
