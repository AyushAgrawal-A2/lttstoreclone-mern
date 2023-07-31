interface ImageWithOverlayProps {
  image: Image;
  idx: number;
  imageModal: (idx: number) => void;
}

export default function ImageWithOverlay({
  image,
  idx,
  imageModal,
}: ImageWithOverlayProps) {
  return (
    <>
      <img
        src={image.src}
        id={`image${idx}`}
        className="rounded-2xl bg-[#f2f2f2]"
        onClick={() => imageModal(idx)}
        loading="lazy"
      />
      {image.overlay && (
        <div className="absolute top-0 right-0 opacity-0 m-3 text-black font-semibold bg-white border border-black rounded-lg p-3 group-hover:opacity-100 transition-opacity duration-500">
          {image.overlay}
        </div>
      )}
    </>
  );
}
