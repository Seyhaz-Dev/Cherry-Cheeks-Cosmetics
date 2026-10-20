
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <footer className="bg-[#705658] px-6 pt-12 text-white">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest">
            CHERRY CHEEKS
          </h2>

          <p className="mt-2 text-xs tracking-widest text-pink-200">
            SKINCARE &amp; WELLNESS
          </p>

          <p className="mt-4 text-sm leading-6 text-pink-100">
            Discover your natural glow with skincare made to
            make you feel beautiful and confident every day.
          </p>

          {/* Social Media */}
          <div className="mt-5 flex gap-3">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-pink-400"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-pink-400"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-pink-400"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-pink-100">
            <li>
              <a href="/" className="hover:text-white">Home</a>
            </li>

            <li>
              <a href="/shop" className="hover:text-white">Shop All</a>
            </li>

            <li>
              <a href="/about" className="hover:text-white">About Us</a>
            </li>

            <li>
              <a href="/contact" className="hover:text-white">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Customer Care
          </h3>

          <ul className="space-y-4 text-sm text-pink-100">
            <li>
              <a href="#shipping" className="hover:text-white">
                Shipping Information
              </a>
            </li>

            <li>
              <a href="#returns" className="hover:text-white">
                Returns &amp; Refunds
              </a>
            </li>

            <li>
              <a href="#faq" className="hover:text-white">FAQs</a>
            </li>

            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>hello@cherrycheeks.com</span>
            </li>

            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>Contact our team</span>
            </li>

            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Phnom Penh, Cambodia</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">
            Join Our Beauty Club
          </h3>

          <p className="mb-5 text-sm leading-6 text-pink-100">
            Subscribe for skincare tips, beauty news, and special offers.
          </p>

          <form className="flex overflow-hidden rounded-full border border-white/30 bg-white">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-800 outline-none"
            />

            <button
              type="button"
              aria-label="Subscribe"
              className="bg-pink-400 px-5 text-white hover:bg-pink-500"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

          <p className="mt-4 flex items-center gap-2 text-xs text-pink-200">
            Made with
            <FontAwesomeIcon icon={faHeart} />
            for your skin
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-pink-100 sm:flex-row">

          <p>
            © 2026 Cherry Cheeks. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#terms" className="hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer
