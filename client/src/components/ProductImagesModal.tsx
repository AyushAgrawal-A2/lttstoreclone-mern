import { useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ProductImagesModalProps = {
  title: string;
  images: Image[];
  displayModal: boolean;
  modalIdx: number;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductImagesModal({
  title,
  images,
  displayModal,
  modalIdx,
  setDisplayModal,
}: ProductImagesModalProps) {
  useEffect(() => {
    if (displayModal) {
      document.getElementById(`imageModal${modalIdx}`)?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [displayModal, modalIdx]);

  return (
    <div
      className={`z-10 h-max w-full absolute box-border top-0 left-0 p-3 bg-[#000000] ${
        !displayModal && 'hidden'
      }`}
      onClick={() => setDisplayModal(false)}>
      <button className="fixed top-5 right-10 text-black bg-[#FFFFFF] h-10 w-10 rounded-full flex justify-center items-center">
        <FontAwesomeIcon
          icon={faXmark}
          size={'lg'}
        />
      </button>
      {images.map((image, idx) => (
        <div key={idx}>
          <img
            src={image.src}
            id={`imageModal${idx}`}
            className="mx-auto max-w-5xl cursor-zoom-out"
          />
          <div>{title}</div>
        </div>
      ))}
    </div>
  );
}
