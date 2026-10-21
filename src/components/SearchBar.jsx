import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const FILTERS = [
  'All Product',
  'Skincare',
  'Makeup',
  'Hair Care',
  'Body Care',
  'Fragrance',
  'Tools & Accessories',
]

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Rating',
  'Newest',
]

function SearchBar({ placeholder ="Search Product Or Soming Els ... " }) {
  const [filter, setFilter] = useState('All Product')
  const [sort, setSort] = useState('Featured')

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center gap-3">

      <form role="search" onSubmit={(event) => event.preventDefault()} className="relative min-w-0 flex-1">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5"
        />
        <input
          type="text"
          name="q"
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-[#E9E6EA] bg-white pl-11 pr-28 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 sm:pl-12 sm:text-base"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 cursor-pointer rounded-full bg-pink-600 px-4 text-sm font-medium text-white transition hover:bg-pink-700"
        >
          Search
        </button>
      </form>

      <div className="relative shrink-0">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-11 w-48 cursor-pointer appearance-none rounded-full border border-[#E9E6EA] bg-white pl-4 pr-10  text-sm font-medium text-gray-600 outline-none transition hover:border-pink-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
        >
          {FILTERS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400"
        />
      </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort by"
            className="h-11 w-48 cursor-pointer appearance-none rounded-full border border-[#E9E6EA] bg-white pl-4 pr-10 text-sm font-medium text-gray-600 outline-none transition hover:border-pink-300 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
          >
            {SORT_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

    </div>

  )
}

export default SearchBar
