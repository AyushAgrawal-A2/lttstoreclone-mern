import { API_URL } from '../config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';

export default function Blogs() {
  document.title = 'The Newsletter Archive - Linus Tech Tips Store';
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const [blogCards, setBlogCards] = useState<BlogCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mainEl = document.getElementById('main');
    mainEl?.addEventListener('scroll', handleScroll);
    function handleScroll() {
      if (
        !loading &&
        !allLoaded &&
        mainEl &&
        mainEl.clientHeight + mainEl.scrollTop >= mainEl.scrollHeight
      ) {
        setPage((prev) => prev + 1);
        setLoading(true);
      }
    }
    if (loading && !allLoaded) {
      const path = API_URL + '/blogs';
      const url = new URL(path);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('perPage', '12');
      fetch(url)
        .then((res) => {
          if (res.ok) return res.json();
          navigate('/404');
        })
        .then(({ blogCards }) => {
          if (blogCards.length < 12) setAllLoaded(true);
          setBlogCards((prev) => [
            ...prev.slice(0, 12 * (page - 1)),
            ...blogCards,
          ]);
          setLoading(false);
        })
        .catch(() => {
          navigate('/404');
        });
    }
    return () => mainEl?.removeEventListener('scroll', handleScroll);
  }, [page, loading, allLoaded, navigate]);

  return (
    <main className="m-8">
      <div className="w-max mx-auto text-[40px] font-semibold">
        The Newsletter Archive
      </div>
      <div className="max-w-[1800px] mx-auto py-4 px-12">
        <div className="flex flex-wrap">
          {blogCards.map((blogCard) => (
            <div
              key={blogCard.path}
              className="w-full lg:w-1/3 p-4">
              <BlogCard blogCard={blogCard} />
            </div>
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </main>
  );
}
