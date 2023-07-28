import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blogCard: BlogCard;
}

export default function BlogCard({ blogCard }: BlogCardProps) {
  const navigate = useNavigate();
  const { path, heading, cardText, date, imgURL } = blogCard;

  return imgURL ? (
    <div
      className="group p-2 h-full flex flex-col hover:scale-105"
      onClick={() => navigate(path)}>
      <img
        className="rounded-2xl max-h-80 h-full w-full object-cover"
        src={imgURL}
      />
      <div className="text-center tracking-wide text-xl font-black group-hover:underline">
        {heading}
      </div>
      <div className="text-center tracking-wide text-xs font-semibold py-2 uppercase">
        {date}
      </div>
      <div className="tracking-wide font-semibold">{cardText}</div>
    </div>
  ) : (
    <div
      className="group p-2 h-full flex flex-col justify-center leading-8 bg-bgTertiary rounded-2xl hover:scale-105"
      onClick={() => navigate(path)}>
      <div className="text-center text-xl font-black p-4 group-hover:underline">
        {heading}
      </div>
      <div className="font-semibold tracking-wide px-8">{cardText}</div>
      <div className="text-center text-xs font-semibold p-4 uppercase">
        {date}
      </div>
    </div>
  );
}
