import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBagShopping,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div>
          <Link to="/">
            <img src={logo} alt="Company Logo" className="h-17 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">

          <Link to="/" className="text-gray-600 hover:text-pink-600">
            Home
          </Link>

          <Link to="/projects" className="text-gray-600 hover:text-pink-600">
            Shop
          </Link>

          <Link to="/contact" className="text-gray-600 hover:text-pink-600">
            Categories
          </Link>
          
          <Link to="/about" className="text-gray-600 hover:text-pink-600">
            About
          </Link>

          <Link to="/about" className="text-gray-600 hover:text-pink-600">
            Contact
          </Link>
        </div>

        <div className="flex w-10 items-center gap-4">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-600 hover:text-pink-600" />
          <FontAwesomeIcon icon={faBagShopping} className="text-gray-600 hover:text-pink-600" />
        </div>

      </nav>
    </header>
  )
}

export default Header