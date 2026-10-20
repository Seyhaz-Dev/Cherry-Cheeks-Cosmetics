import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'

import {
  faBagShopping,
  faBars,
  faCircleInfo,
  faEnvelope,
  faHouse,
  faLayerGroup,
  faMagnifyingGlass,
  faShop,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const mobileLinks = [
  { to: '/', label: 'Home', icon: faHouse, end: true },
  { to: '/shop', label: 'Shop', icon: faShop },
  { to: '/categories', label: 'Categories', icon: faLayerGroup },
  { to: '/about', label: 'About', icon: faCircleInfo },
  { to: '/contact', label: 'Contact', icon: faEnvelope },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[var(--color-header-footer)] shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        <div>
          <Link to="/">
            <img src={logo} alt="Company Logo" className="h-14 w-auto object-contain md:h-17"
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

        <div className="flex items-center ">

          <Link to="/search" aria-label="Search" className="inline-flex h-10 w-10 items-center justify-center text-[var(--color-text)] hover:text-pink-600">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer text-[var(--color-text)] hover:text-pink-600"/>
            </Link>

          <Link to="/cart" aria-label="Cart" className="inline-flex h-10 w-10 items-center justify-center text-[var(--color-text)] hover:text-pink-600">
            <FontAwesomeIcon icon={faBagShopping} />
            </Link>

            <Link to="/profile" aria-label="Profile" className="hidden h-10 w-10 items-center justify-center text-[var(--color-text)] hover:text-pink-600 md:inline-flex">
              <FontAwesomeIcon icon={faUser} />
            </Link>

            <button type="button" className={`inline-flex h-10 w-10 items-center justify-center text-[var(--color-text)] hover:text-pink-600 md:hidden ${isMenuOpen ? 'invisible' : 'visible'}`} aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(true)} >
              <FontAwesomeIcon icon={faBars} />
            </button>

        </div>

      </nav>

      <div id="mobile-navigation" className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`} aria-hidden={!isMenuOpen}>
        
        <button type="button" className={`absolute inset-0 bg-black/35 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} aria-label="Close navigation menu" tabIndex={isMenuOpen ? 0 : -1} onClick={() => setIsMenuOpen(false)}/>
        
        <aside className={`absolute inset-y-0 left-0 flex w-[min(82vw,22rem)] flex-col bg-[var(--color-header-footer)] shadow-xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} inert={!isMenuOpen}>
          <div className="flex items-center justify-between px-6 pb-8 pt-6">
            
            <Link to="/" onClick={() => setIsMenuOpen(false)} aria-label="Cherry Cheeks home">
              <img src={logo} alt="Cherry Cheeks Beauty & Skincare" className="h-16 w-auto object-contain" />
            </Link>

            <button type="button" className="inline-flex h-15 w-15 items-center justify-center text-[var(--color-text)] hover:text-pink-600" aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

          </div>

          <nav className="flex flex-col gap-2 px-5">
            {mobileLinks.map(({ to, label, icon, end }) => (
              
              <NavLink key={to} to={to} end={end} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `flex min-h-14 items-center gap-4 rounded-xl px-4 text-base transition-colors ${isActive ? 'bg-pink-100 text-pink-600' : 'text-gray-800 hover:bg-pink-50 hover:text-pink-600'}`}>       
                <FontAwesomeIcon icon={icon} className="w-5 text-center" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 border-t border-pink-100 px-6 py-4">
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-gray-800 transition hover:text-pink-600">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-pink-500 shadow-sm">
                <FontAwesomeIcon icon={faUser} />
              </span>
              
              <span className="flex flex-col leading-tight">
                <span className="font-medium">My Profile</span>
                <span className="mt-1 text-sm text-gray-500">Customer account</span>
              </span>

            </Link>
          </div>

        </aside>
      </div>

    </header>
  )
}

export default Header