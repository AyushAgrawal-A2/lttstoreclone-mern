import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ImageBannerProps {
  banner: Banner[];
}

export default function ImageBanner({ banner }: ImageBannerProps) {
  const [imgNo, setImgNo] = useState(0);
  function prevImage() {
    setImgNo((prev) => (prev - 1 + banner.length) % banner.length);
  }
  function nextImage() {
    setImgNo((prev) => (prev + 1) % banner.length);
  }
  return (
    <div className="relative">
      <img
        src={banner[imgNo].imgURL}
        className="rounded-2xl"
      />
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="absolute top-1/2 left-5 translate-y-[-50%] text-4xl hover:scale-110 hidden lg:block text-white cursor-pointer"
        onClick={prevImage}
      />
      <FontAwesomeIcon
        icon={faChevronRight}
        className="absolute top-1/2 right-5 translate-y-[-50%] text-4xl hover:scale-110 hidden lg:block text-white cursor-pointer"
        onClick={nextImage}
      />
      <div className="absolute bottom-5 left-1/2 translate-x-[-50%] border-[3px] border-white bg-gray-500 rounded-full p-1 flex items-center">
        {Array(banner.length)
          .fill(0)
          .map((_, idx) => {
            return (
              <FontAwesomeIcon
                key={idx}
                icon={imgNo === idx ? faCircle : faCircleDot}
                className="text-sm mr-2 last:mr-0 text-white cursor-pointer"
                onClick={() => setImgNo(idx)}
              />
            );
          })}
      </div>
    </div>
  );
}
