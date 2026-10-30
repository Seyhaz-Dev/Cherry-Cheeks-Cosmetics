import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ChevronDown } from 'lucide-react'

const DEFAULT_SORT = 'Sort: Featured'

const SORT_OPTIONS = [
  DEFAULT_SORT,
  'Price: Low to High',
  'Price: High to Low',
  'Rating',
  'Newest',
]

function SearchBar({
  onQueryChange,
  onFilterChange,
  onSortChange,
  initialQuery = '',
  initialCategory = '',
  initialSort = DEFAULT_SORT,
  categoryPlaceholder = 'All Product',
  customDropdownIcons = false,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Are we already on the search results page?
  const isSearchPage = location.pathname === '/search'

  // If props are provided, use controlled mode. Otherwise use internal state with URL params.
  const controlled = onQueryChange !== undefined

  const [internalQuery, setInternalQuery] = useState(searchParams.get('q') || initialQuery)
  const [internalCategory, setInternalCategory] = useState(searchParams.get('category') || initialCategory)
  const [internalSort, setInternalSort] = useState(searchParams.get('sort') || initialSort)

  const query = controlled ? initialQuery : internalQuery
  const category = controlled ? initialCategory : internalCategory
  const sort = controlled ? initialSort : internalSort

  // Category names (starts with defaults, replaced by the JSON file)
  const [categories, setCategories] = useState([  ])

  // 1. Load categories from public/student-data/categories.json
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch('/student-data/categories.json')
        const data = await response.json()

        setCategories(data.map((item) => item.name))
      } catch (error) {
        console.error('Could not load categories:', error)
      }
    }

    getCategories()
  }, [])

  // 2. Build the URL and go to the search page
  function goToSearch(newQuery, newCategory, newSort) {
    const params = new URLSearchParams()

    if (newQuery.trim()) params.set('q', newQuery.trim())
    if (newCategory) params.set('category', newCategory)
    if (newSort !== DEFAULT_SORT) params.set('sort', newSort)

    const text = params.toString()
    const url = text ? `/search?${text}` : '/search'

    // On the search page, replace the history entry so Back doesn't get cluttered
    navigate(url, { replace: isSearchPage })
  }

  // 3. Event handlers
  function handleSubmit(event) {
    event.preventDefault()
    if (controlled) {
      // In controlled mode, just trigger the query change
      onQueryChange(query)
    } else {
      goToSearch(query, category, sort)
    }
  }

  function handleQueryChange(event) {
    const value = event.target.value
    if (controlled) {
      onQueryChange(value)
    } else {
      setInternalQuery(value)
      // On the results page, update results while typing
      if (isSearchPage) goToSearch(value, category, sort)
    }
  }

  function handleCategoryChange(event) {
    const value = event.target.value
    if (controlled) {
      onFilterChange(value)
    } else {
      setInternalCategory(value)
      goToSearch(query, value, sort)
    }
  }

  function handleSortChange(event) {
    const value = event.target.value
    if (controlled) {
      onSortChange(value)
    } else {
      setInternalSort(value)
      goToSearch(query, category, value)
    }
  }

  // 4. What appears on screen
  const selectStyle =
    `h-11 w-full rounded-full border border-[#E9E6EA] bg-white px-4 text-sm font-medium text-gray-600 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 sm:w-48 ${customDropdownIcons ? 'appearance-none pr-10' : ''}`

  function renderDropdownIcon() {
    return customDropdownIcons ? (
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-600"
      />
    ) : null
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search box */}
      <form onSubmit={handleSubmit} role="search" className="relative w-full sm:flex-1">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search Product ..."
          autoComplete="off"
          className="h-11 w-full rounded-full border border-[#E9E6EA] bg-white pl-11 pr-24 text-sm outline-none placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-full bg-pink-600 px-4 text-sm font-medium text-white hover:bg-pink-700"
        >
          Search
        </button>
      </form>

      {/* Category dropdown */}
      <div className="relative w-full sm:w-48">
        <select
          value={category}
          onChange={handleCategoryChange}
          aria-label="Filter products"
          className={selectStyle}
        >
          <option value="">{categoryPlaceholder}</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderDropdownIcon()}
      </div>

      {/* Sort dropdown */}
      <div className="relative w-full sm:w-48">
        <select
          value={sort}
          onChange={handleSortChange}
          aria-label="Sort by"
          className={selectStyle}
        >
          {SORT_OPTIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {renderDropdownIcon()}
      </div>
    </div>
  )
}

export default SearchBar