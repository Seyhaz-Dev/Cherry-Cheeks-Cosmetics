
function SearchBar({ placeholder }) {
  return (
    <form role="search" className="w-full h-10">
      <div className="relative min-w-0 w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input
          type="text"
          name="q"
          placeholder={placeholder}
          className="w-full h-full rounded-xl border border-[#E9E6EA] bg-white pl-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 sm:pl-12 sm:text-base"
        />
      </div>
    </form>
  )
}

export default SearchBar