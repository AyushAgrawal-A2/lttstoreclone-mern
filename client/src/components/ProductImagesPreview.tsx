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
    <div>
      <button
        className="w-full"
        onClick={() => {
          document
            .getElementById('imagePreview')
            ?.scrollBy({ top: 150, behavior: 'smooth' });
        }}>
        <FontAwesomeIcon
          icon={faCaretUp}
          size={'xl'}
          className="mx-auto hover:scale-[1.4]"
        />
      </button>
      <ul
        id="imagePreview"
        className="max-h-[50vh] w-max overflow-auto no-scrollbar flex flex-col shrink-0 gap-1">
        {images.map((image, idx) => (
          <li key={idx}>
            <button className="hover:opacity-90">
              <img
                src={image.src}
                className="object-contain h-28 w-28 rounded-lg bg-[#f2f2f2]"
                onClick={() => imageScroll(idx)}
              />
            </button>
          </li>
        ))}
      </ul>
      <button
        className="w-full"
        onClick={() => {
          document
            .getElementById('imagePreview')
            ?.scrollBy({ top: -150, behavior: 'smooth' });
        }}>
        <FontAwesomeIcon
          icon={faCaretDown}
          size={'xl'}
          className="mx-auto hover:scale-[1.4]"
        />
      </button>
    </div>
  );
}
