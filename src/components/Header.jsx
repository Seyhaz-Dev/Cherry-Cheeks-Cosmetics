
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Seyha<span className="text-gray-900">Dev.</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-gray-600 hover:text-purple-600">
            Home
          </Link>

          <Link to="/about" className="text-gray-600 hover:text-purple-600">
            About
          </Link>

          <Link to="/projects" className="text-gray-600 hover:text-purple-600">
            Projects
          </Link>

          <Link to="/contact" className="text-gray-600 hover:text-purple-600">
            Contact
          </Link>
        </div>

        {/* Contact Button */}
        <Link
          to="/contact"
          className="rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition hover:bg-purple-700"
        >
          Contact Me
        </Link>
      </nav>
    </header>
  )
}

export default Header
