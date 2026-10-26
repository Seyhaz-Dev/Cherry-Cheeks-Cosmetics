
import { useEffect, useRef, useState } from 'react'

import {
  Bell,
  CheckCheck,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Users,
  UserRound,
  X,
  ArrowUpRight,
} from 'lucide-react'

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo1.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

// Admin navigation
const navigation = [
  {
    label: 'Overview',
    to: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Products',
    to: '/admin/products',
    icon: Package,
  },
  {
    label: 'Orders',
    to: '/admin/orders',
    icon: ClipboardList,
  },
  {
    label: 'Customers',
    to: '/admin/customers',
    icon: Users,
  },
  {
    label: 'Settings',
    to: '/admin/settings',
    icon: Settings,
  },
]

// Page titles
const PAGE_TITLES = {
  '/admin': {
    title: 'Overview',
    subtitle: "Here's what is happening with your store today.",
  },
  '/admin/products': {
    title: 'Product Management',
    subtitle: 'Manage your product inventory and details.',
  },
  '/admin/orders': {
    title: 'Orders',
    subtitle: 'Track and fulfil customer orders.',
  },
  '/admin/customers': {
    title: 'Customers',
    subtitle: 'See who is shopping with you.',
  },
  '/admin/settings': {
    title: 'Settings',
    subtitle: 'Manage your store preferences.',
  },
}

// Sidebar navigation style
const navLinkClass = ({ isActive }) =>
  `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-[#fbe3ee] text-[#b84f7b]'
      : 'text-[#5f5359] hover:bg-[#f8edf2]'
  }`

// Example notifications.
// Replace these with real notifications from your backend later.
const initialNotifications = [
  {
    id: 1,
    title: 'Welcome to your admin dashboard',
    message: 'Your Cherry Cheeks store is ready to manage.',
    time: 'Just now',
    read: false,
  },
  {
    id: 2,
    title: 'Check your orders',
    message: 'Review your latest customer orders.',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 3,
    title: 'Product management',
    message: 'Keep your product information up to date.',
    time: 'Today',
    read: true,
  },
]

// Profile card for the sidebar
function AdminProfile({ user, onLogout }) {
  const fullName =
    `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin'

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#f0e3e9] bg-white p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fbe3ee] text-[#a8446c]">
        <UserRound size={20} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#30252a]">
          {fullName}
        </p>

        <p className="mt-1 flex items-center gap-1 text-xs capitalize text-[#82757b]">
          {user?.role || 'admin'} 
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        aria-label="Logout"
        title="Logout"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#a8446c] transition hover:bg-[#fbe3ee]"
      >
        <LogOut size={17} />
      </button>
    </div>
  )
}

// Notification dropdown
function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAllRead,
  onClose,
}) {
  return (
    <div
      className="absolute right-0 top-full z-[80] mt-3 w-[min(90vw,360px)] overflow-hidden rounded-2xl border border-[#f0e3e9] bg-white shadow-xl"
      role="dialog"
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between border-b border-[#f3e8ed] px-4 py-4">
        <div>
          <h3 className="font-semibold text-[#4A001F]">Notifications</h3>
          <p className="mt-1 text-xs text-[#82757b]">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'You are all caught up'}
          </p>
        </div>

        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-1.5 text-xs font-medium text-[#b84f7b] transition hover:text-[#8f3158] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={15} />
          Mark all read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Bell className="mx-auto mb-3 text-[#c9a7b6]" size={28} />
            <p className="text-sm font-medium text-[#4A001F]">
              No notifications
            </p>
            <p className="mt-1 text-xs text-[#82757b]">
              New updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-3 border-b border-[#f7edf1] px-4 py-4 last:border-b-0 ${
                notification.read ? 'bg-white' : 'bg-[#fff6fa]'
              }`}
            >
              <div className="relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbe3ee] text-[#b84f7b]">
                <Bell size={16} />
                {!notification.read && (
                  <span className="absolute right-0 top-0 size-2 rounded-full bg-[#e7567e]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#4A001F]">
                  {notification.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#82757b]">
                  {notification.message}
                </p>
                <p className="mt-2 text-[11px] text-[#a2949a]">
                  {notification.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex w-full items-center justify-center gap-2 border-t border-[#f0e3e9] px-4 py-3 text-sm font-medium text-[#b84f7b] transition hover:bg-[#fff6fa]"
      >
        Close
        <X size={15} />
      </button>
    </div>
  )
}

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState(
    initialNotifications
  )

  const notificationRef = useRef(null)
const desktopNotificationRef = useRef(null)

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const fullName =
    `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin'

  // Close mobile navigation and notification dropdown after navigation
  useEffect(() => {
    setMenuOpen(false)
    setNotificationOpen(false)
  }, [location.pathname])

  // Close the notification dropdown when clicking outside it
  useEffect(() => {
    function handleOutsideClick(event) {
      const insideMobile = notificationRef.current?.contains(event.target)
      const insideDesktop = desktopNotificationRef.current?.contains(event.target)

      if (!insideMobile && !insideDesktop) {
        setNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleLogout = () => {
    setMenuOpen(false)
    setNotificationOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const handleMarkAllRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
  }

  const { title, subtitle } =
    PAGE_TITLES[location.pathname] ?? PAGE_TITLES['/admin']

  return (
    <div className="flex min-h-screen flex-col bg-[#fdf0f5] font-['Outfit',sans-serif] text-[#30252a] md:flex-row md:bg-[#fbf8f5]">
      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-40 md:hidden">
        <div className="flex h-16 items-center justify-between bg-[#fff9fc] px-4 shadow-sm">
          <Link to="/admin" aria-label="Admin overview">
            <img
              src={logo}
              alt="Cherry Cheeks Cosmetics"
              className="h-10 w-28 object-contain object-left"
            />
          </Link>

          <div className="flex items-center gap-1">
            {/* Mobile notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationOpen((open) => !open)}
                aria-label="Notifications"
                aria-expanded={notificationOpen}
                className="relative flex size-10 items-center justify-center rounded-lg text-[#4A001F] transition hover:bg-[#fbe3ee]"
              >
                <Bell size={21} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-[#e7567e] px-1 text-[10px] font-semibold leading-4 text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              
            </div>

            {/* Profile shortcut */}
            <Link
              to="/admin/settings"
              aria-label="Account settings"
              title="Account settings"
              className="flex size-10 items-center justify-center rounded-lg text-[#4A001F] transition hover:bg-[#fbe3ee]"
            >
              <UserRound size={21} strokeWidth={1.8} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open admin menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-lg text-[#4A001F] transition hover:bg-[#fbe3ee]"
            >
              <Menu size={23} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-OUT MENU */}
        <div
          className={`fixed inset-0 z-[60] ${
            menuOpen ? 'visible' : 'invisible'
          }`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <aside
            inert={!menuOpen}
            className={`absolute inset-y-0 left-0 flex w-[min(82vw,22rem)] flex-col bg-[#fff9fc] shadow-xl transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#f0e3e9] px-5 py-5">
              <Link to="/admin" aria-label="Admin overview">
                <img
                  src={logo}
                  alt="Cherry Cheeks Cosmetics"
                  className="h-12 w-28 object-contain object-left"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full text-[#30252a] transition hover:bg-[#fbe3ee]"
              >
                <X size={23} strokeWidth={1.8} />
              </button>
            </div>

            <div className="px-5 pb-2 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a8446c]">
                Admin Panel
              </p>
            </div>

            <nav
              aria-label="Admin navigation"
              className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-3"
            >
              {navigation.map(({ label, to, icon: Icon, end }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center gap-4 rounded-xl px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#fbe3ee] text-[#b84f7b]'
                        : 'text-[#5f5359] hover:bg-[#f8edf2]'
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{label}</span>
                </NavLink>
              ))}

              {/* VIEW STOREFRONT BUTTON */}
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#e7567e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#cc4169]"
              >
                <FontAwesomeIcon icon={faBagShopping} />
                View Storefront
                <ArrowUpRight size={16} />
              </Link>

              {/* Mobile account shortcut */}
              <Link
                to="/admin/settings"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center gap-4 rounded-xl px-4 text-sm font-medium text-[#5f5359] transition hover:bg-[#f8edf2]"
              >
                <UserRound size={19} strokeWidth={1.8} />
                My Profile & Settings
              </Link>
            </nav>

            <div className="border-t border-[#f0e3e9] p-4">
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#f0e3e9] bg-white p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fbe3ee] text-[#a8446c]">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#30252a]">
                    {fullName}
                  </p>
                  <p className="mt-1 text-xs capitalize text-[#82757b]">
                    {user?.role || 'admin'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-medium text-[#a8446c] transition hover:bg-[#fbe3ee]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#efd8e2] bg-[#fff9fc] md:flex md:min-h-screen">
        <Link
          to="/admin"
          className="flex h-[76px] shrink-0 items-center border-b border-[#f0e3e9] px-5"
        >
          <img
            src={logo}
            alt="Cherry Cheeks Cosmetics"
            className="h-12 w-32 object-contain object-left"
          />
        </Link>

        <nav
          aria-label="Admin navigation"
          className="flex flex-1 flex-col gap-1 p-4"
        >
          {navigation.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={navLinkClass}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}

        </nav>

        <div className="border-t border-[#f0e3e9] p-4">
          <AdminProfile user={user} onLogout={handleLogout} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">
        <header className="flex min-h-[76px] items-center justify-between gap-3 border-b border-[#f0e3e9] px-4 py-4 sm:px-6 md:px-8">
          <div className="min-w-0">
            <h2 className="text-[22px] font-bold leading-tight text-[#4A001F]">
              {title}
            </h2>

            <p className="mt-1 text-sm text-[#82757b]">
              {subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* DESKTOP NOTIFICATIONS */}
            <div className="relative hidden md:block" ref={desktopNotificationRef}>

              {/* NEW: the bell button */}
              <button
                type="button"
                onClick={() => setNotificationOpen((open) => !open)}
                aria-label="Notifications"
                aria-expanded={notificationOpen}
                className="relative flex size-10 items-center justify-center rounded-lg text-[#4A001F] transition hover:bg-[#fbe3ee]"
              >
                <Bell size={21} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-[#e7567e] px-1 text-[10px] font-semibold leading-4 text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <NotificationPanel
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onMarkAllRead={handleMarkAllRead}
                  onClose={() => setNotificationOpen(false)}
                />
              )}
            </div>

            {/* CLICK PROFILE TO OPEN SETTINGS */}
            <Link
              to="/admin/settings"
              title="Open profile and settings"
              className="hidden items-center gap-3 rounded-xl p-1.5 text-left transition hover:bg-[#fff0f6] sm:flex"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#fbe3ee] text-[#b84f7b]">
                <UserRound size={20} strokeWidth={1.8} />
              </div>

            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
