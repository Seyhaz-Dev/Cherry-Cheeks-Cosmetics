import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'

import {
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="bg-[var(--color-header-footer)] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link to="/" aria-label="Go to homepage">
              <img
                src={logo}
                alt="Cherry Cheeks Logo"
                className="h-16 w-auto object-contain sm:h-20"
              />
            </Link>

            <p className="mt-3 text-xs font-medium tracking-[0.2em] text-[var(--color-black)]">
              SKINCARE &amp; WELLNESS
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-black)]">
              Discover your natural glow with skincare made to
              make you feel beautiful and confident every day.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pink-text)] transition hover:bg-pink-400"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pink-text)] transition hover:bg-pink-400"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pink-text)] transition hover:bg-pink-400"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-[80px]">
            <h3 className="mb-5 text-base font-semibold text-[var(--color-pink-text)]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-[var(--color-black)]">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/shop" className="transition hover:text-white">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/categories" className="transition hover:text-white">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
            
          

          {/* Customer Care */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-[var(--color-pink-text)]">
              Customer Care
            </h3>

            <ul className="space-y-4 text-sm leading-6 text-[var(--color-black)]">
              <li>
                <a href="#shipping" className="transition hover:text-white">
                  Shipping Information
                </a>
              </li>

              <li>
                <a href="#returns" className="transition hover:text-white">
                  Returns &amp; Refunds
                </a>
              </li>

              <li>
                <a href="#faq" className="transition hover:text-white">
                  FAQs
                </a>
              </li>

              <li className="flex items-start gap-3 break-words">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mt-1 shrink-0"
                />
                <a
                  href="mailto:hello@cherrycheeks.com"
                  className="transition hover:text-white"
                >
                  hello@cherrycheeks.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mt-1 shrink-0"
                />
                <span>Contact our team</span>
              </li>

              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 shrink-0"
                />
                <span>Phnom Penh, Cambodia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--color-pink-text)]">
              Join Our Beauty Club
            </h3>

            <p className="mb-5 text-sm leading-7 text-[var(--color-black)]">
              Subscribe for skincare tips, beauty news, and special offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full min-w-0 overflow-hidden rounded-full border border-white/40 bg-[var(--color-white-text)]"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 bg-[var(--color-button)] px-4 text-white transition hover:opacity-80 sm:px-5"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>

            <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[var(--color-pink-text)]">
              Made with
              <FontAwesomeIcon icon={faHeart} />
              for your skin
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left lg:px-10">

          <p className="text-xs leading-5 text-[var(--color-black)]">
            © 2026 Cherry Cheeks. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-[var(--color-black)]">
            <a href="#privacy" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer
