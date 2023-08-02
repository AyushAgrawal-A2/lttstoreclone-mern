import { API_URL } from '../config';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Blog() {
  const path = API_URL + '/blogs/' + useParams().blog ?? '';
  const [curBlogPath, setCurBlogPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const navigate = useNavigate();

  useEffect(() => {
    if (curBlogPath !== path) {
      setCurBlogPath(path);
      setLoading(true);
    }
    if (loading) {
      fetch(path)
        .then((res) => {
          if (res.ok) return res.json();
          navigate('/404');
        })
        .then((blog) => {
          setBlog(blog);
          setLoading(false);
        })
        .catch(() => {
          navigate('/404');
        });
    }
  }, [path, curBlogPath, loading, blog, navigate]);

  if (!blog) return <Loading />;

  document.title = blog.heading + ' - Linus Tech Tips Store';

  const { heading, date, contents } = blog;

  return (
    <main className="m-8">
      <div className="max-w-4xl mx-auto leading-8 p-8 md:p-20 rounded-xl bg-fgSecondary">
        <div className="text-2xl md:text-4xl font-bold">{heading}</div>
        <div className="text-xs font-semibold py-2">{date}</div>
        <div className="py-4 md:p-4">
          {contents.map(({ type, data }) =>
            type === 'text' ? (
              <p
                key={data}
                className="whitespace-pre-line py-2 font-semibold text-sm md:text-base">
                {data}
              </p>
            ) : (
              <img
                key={data}
                className="mx-auto"
                src={data}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
