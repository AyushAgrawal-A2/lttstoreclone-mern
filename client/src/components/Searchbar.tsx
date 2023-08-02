import { API_URL } from '../config';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchbarProps {
  setOverflow: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchbar({ setOverflow }: SearchbarProps) {
  const [searchbarIsShown, setSearchbarIsShown] = useState<boolean>(false);
  const [searchResultsAreShown, setSearchResultsAreShown] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function getSearchResult() {
      if (!searchText) {
        setSearchResultsAreShown(false);
        return;
      }
      const path = API_URL + '/collections/all';
      const url = new URL(path);
      url.searchParams.set('page', '1');
      url.searchParams.set('perPage', '4');
      url.searchParams.set('sortBy', 'bestseller');
      url.searchParams.set('searchText', searchText);
      fetch(url)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('fetch failed');
        })
        .then(({ productCards }) => {
          setProductCards(productCards);
          setSearchResultsAreShown(true);
        })
        .catch((e) => console.log(e));
    }
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(getSearchResult, 300);
    return () => clearTimeout(timeoutId.current);
  }, [searchText]);

  function displaySearchbar() {
    setOverflow('hidden');
    setSearchbarIsShown(true);
  }

  function hideSearchbar() {
    setOverflow('auto');
    setSearchbarIsShown(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    gotoSearchPage();
  }

  function gotoSearchPage() {
    console.log(searchText);
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size={'lg'}
        className="hover:scale-[1.15] px-2"
        onClick={displaySearchbar}
      />
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gradient justify-center items-center ${
          searchbarIsShown ? 'flex' : 'hidden'
        }`}>
        <form
          onSubmit={handleSubmit}
          className="relative bg-bgSecondary rounded-md flex items-center h-12 w-10/12 lg:w-3/5">
          <input
            id="search-items"
            placeholder=" "
            className="peer bg-bgSecondary pt-3 pl-3 rounded-md outline-0 text-fgSecondary w-[95%] font-semibold"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <label
            htmlFor="search-items"
            className="absolute top-0 left-3 text-fgSecondary text-xs peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:text-lg peer-placeholder-shown:top-2 font-semibold">
            Search
          </label>
          {searchResultsAreShown && (
            <div className="bg-fgSecondary absolute top-12 w-full p-3 font-bold text-fgTertiary rounded-md border border-bgSecondary">
              {productCards.length > 0 && (
                <div>
                  <div className="p-1">Products</div>
                  {productCards.map((productCard) => (
                    <Link
                      key={productCard.path}
                      to={productCard.path}
                      className="flex items-center w-full hover:underline p-2">
                      <img
                        src={productCard.images[0].src}
                        className="h-14"
                      />
                      <div className="pl-4">{productCard.title}</div>
                    </Link>
                  ))}
                </div>
              )}
              <div
                className="p-2 cursor-pointer"
                onClick={gotoSearchPage}>
                Search for "{searchText}"
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={'xl'}
            className="hover:scale-[1.15] text-fgSecondary p-2 cursor-pointer"
            onClick={gotoSearchPage}
          />
          <FontAwesomeIcon
            icon={faXmark}
            size={'2xl'}
            className="hover:scale-[1.15] absolute right-[-35px]"
            onClick={hideSearchbar}
          />
        </form>
      </div>
      <div
        className={
          'w-full h-screen top-0 left-0 z-[-1] bg-black opacity-30' +
          (searchbarIsShown ? ' absolute' : ' hidden')
        }
        onClick={hideSearchbar}
      />
    </div>
  );
}
