import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBagShopping,
  faMagnifyingGlass,
  faUser,
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

          <Link to="/shop" className="text-gray-600 hover:text-pink-600">
            Shop
          </Link>

          <Link to="/categories" className="text-gray-600 hover:text-pink-600">
            Categories
          </Link>
          
          <Link to="/about" className="text-gray-600 hover:text-pink-600">
            About
          </Link>

          <Link to="/contact" className="text-gray-600 hover:text-pink-600">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">

            <Link to="/search">
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="cursor-pointer text-gray-600 hover:text-pink-600"
                />
            </Link>

            <Link to="/cart">
                <FontAwesomeIcon
                icon={faBagShopping}
                className="cursor-pointer text-gray-600 hover:text-pink-600"
                />
            </Link>

            <Link to="/profile">
                <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer text-gray-600 hover:text-pink-600"
                />
            </Link>

        </div>

      </nav>
    </header>
  )
}

export default Header