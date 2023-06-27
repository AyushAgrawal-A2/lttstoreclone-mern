import { useParams } from 'react-router-dom';

export default function Collections() {
  const { category } = useParams();
  document.title = category + ' - Linus Tech Tips Store';
  return <div>{category}</div>;
}
