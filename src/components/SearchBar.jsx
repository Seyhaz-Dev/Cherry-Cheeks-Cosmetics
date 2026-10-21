import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
  'Sort: Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Rating',
  'Newest',
]

function PillSelect({ value, onChange, options, label, textClassName = 'text-gray-600' }) {
  return (
    <div className="group relative h-11 w-48 shrink-0 rounded-full border border-[#E9E6EA] bg-white transition hover:border-pink-300 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100">
      {/* Visible content: text + icon centered together */}
      <div
        className={`pointer-events-none flex h-full items-center justify-center gap-2 px-4 text-sm font-medium ${textClassName}`}
      >
        <span className="truncate">{value}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          className="h-3 w-3 shrink-0 text-gray-400"
        />
      </div>

      {/* Real select, invisible, covers the whole pill */}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full opacity-0"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

function SearchBar({ placeholder = 'Search Product Or Something Else ...' }) {
  const [filter, setFilter] = useState('All Product')
  const [sort, setSort] = useState('Sort: Featured')

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center gap-3">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="relative min-w-0 flex-1"
        >
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

        <PillSelect
          value={filter}
          onChange={setFilter}
          options={FILTERS}
          label="Filter products"
        />

        <PillSelect
          value={sort}
          onChange={setSort}
          options={SORT_OPTIONS}
          label="Sort by"
          textClassName="text-gray-400"
        />
      </div>
    </div>
  )
}

export default SearchBar