import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const DEFAULT_FILTER = 'All Product'
const DEFAULT_SORT = 'Sort: Featured'

const FILTERS = [
  DEFAULT_FILTER,
  'Skincare',
  'Makeup',
  'Hair Care',
  'Body Care',
  'Fragrance',
  'Tools & Accessories',
]

const SORT_OPTIONS = [
  DEFAULT_SORT,
  'Price: Low to High',
  'Price: High to Low',
  'Rating',
  'Newest',
]

function PillSelect({ value, onChange, options, label, textClassName = 'text-gray-600' }) {
  return (
    <div className="group relative h-11 w-full min-w-0 flex-1 rounded-full border border-[#E9E6EA] bg-white transition hover:border-pink-300 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 sm:w-48 sm:flex-none sm:shrink-0">
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

function buildSearchUrl({ query, filter, sort }) {
  const params = new URLSearchParams()
  const trimmedQuery = query.trim()

  if (trimmedQuery) params.set('q', trimmedQuery)
  if (filter !== DEFAULT_FILTER) params.set('category', filter)
  if (sort !== DEFAULT_SORT) params.set('sort', sort)

  const search = params.toString()
  return search ? `/search?${search}` : '/search'
}

function SearchBar({
  placeholder = 'Search Product ...',
  onQueryChange,
  onFilterChange,
  onSortChange,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const isSearchPage = location.pathname === '/search'
  const isLiveFilter = Boolean(onQueryChange || onFilterChange || onSortChange)

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [filter, setFilter] = useState(searchParams.get('category') ?? DEFAULT_FILTER)
  const [sort, setSort] = useState(searchParams.get('sort') ?? DEFAULT_SORT)

  // On the results page the grid updates while typing, without pressing Enter.
  useEffect(() => {
    if (!isSearchPage) return

    const target = buildSearchUrl({ query, filter, sort })
    if (target === `${location.pathname}${location.search}`) return

    const timeout = setTimeout(() => {
      navigate(target, { replace: true })
    }, 200)

    return () => clearTimeout(timeout)
  }, [query, filter, sort, isSearchPage, navigate, location.pathname, location.search])

  const runSearch = ({
    nextQuery = query,
    nextFilter = filter,
    nextSort = sort,
  } = {}) => {
    navigate(buildSearchUrl({ query: nextQuery, filter: nextFilter, sort: nextSort }))
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    onQueryChange?.(value)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    onFilterChange?.(value)
    if (!isSearchPage && !isLiveFilter) runSearch({ nextFilter: value })
  }

  const handleSortChange = (value) => {
    setSort(value)
    onSortChange?.(value)
    if (!isSearchPage && !isLiveFilter) runSearch({ nextSort: value })
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            if (!isLiveFilter) runSearch()
          }}
          className="relative w-full min-w-0 sm:flex-1"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5"
          />
          <input
            type="text"
            name="q"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="h-11 w-full rounded-full border border-[#E9E6EA] bg-white pl-11 pr-24 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 sm:pl-12 sm:pr-28 sm:text-base"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 cursor-pointer rounded-full bg-pink-600 px-3 text-sm font-medium text-white transition hover:bg-pink-700 sm:px-4"
          >
            Search
          </button>
        </form>

        <div className="flex w-full gap-3 sm:w-auto sm:shrink-0">
          <PillSelect
            value={filter}
            onChange={handleFilterChange}
            options={FILTERS}
            label="Filter products"
          />

          <PillSelect
            value={sort}
            onChange={handleSortChange}
            options={SORT_OPTIONS}
            label="Sort by"
            textClassName="text-gray-400"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
