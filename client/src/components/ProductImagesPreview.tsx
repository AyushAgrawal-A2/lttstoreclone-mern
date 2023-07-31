import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

type ProductImagesPreviewProps = {
  images: Image[];
  imageScroll: (idx: number) => void;
};

export default function ProductImagesPreview({
  images,
  imageScroll,
}: ProductImagesPreviewProps) {
  return (
    <div className="flex lg:flex-col pb-4">
      <button
        className="w-full"
        onClick={() => {
          document
            .getElementById('imagePreview')
            ?.scrollBy({ top: -150, left: -150, behavior: 'smooth' });
        }}>
        <FontAwesomeIcon
          icon={faCaretUp}
          size={'xl'}
          className="mx-auto hover:scale-[1.4] rotate-[-90deg] lg:rotate-0"
        />
      </button>
      <ul
        id="imagePreview"
        className="max-h-[50vh] w-max lg:w-max overflow-auto no-scrollbar flex lg:flex-col gap-1">
        {images.map((image, idx) => (
          <li
            key={image.src}
            className="shrink-0 grow-0">
            <img
              src={image.src}
              className="object-contain h-14 w-14 lg:h-28 lg:w-28 rounded-lg bg-[#f2f2f2] hover:opacity-90 cursor-pointer"
              onClick={() => imageScroll(idx)}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
      <button
        className="w-full"
        onClick={() => {
          document
            .getElementById('imagePreview')
            ?.scrollBy({ top: 150, left: 150, behavior: 'smooth' });
        }}>
        <FontAwesomeIcon
          icon={faCaretDown}
          size={'xl'}
          className="mx-auto hover:scale-[1.4] rotate-[-90deg] lg:rotate-0"
        />
      </button>
    </div>
  );
}
