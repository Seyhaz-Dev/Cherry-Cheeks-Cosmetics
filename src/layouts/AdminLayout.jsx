import { useEffect, useState } from 'react'
import { ClipboardList, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingBag, Users, X } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

const navigation = [
	{ label: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
	{ label: 'Products', to: '/admin/products', icon: Package },
	{ label: 'Orders', to: '/admin/orders', icon: ClipboardList },
	{ label: 'Customers', to: '/admin/customers', icon: Users },
	{ label: 'Settings', to: '/admin/settings', icon: Settings }
]

const PAGE_TITLES = {
	'/admin': { title: 'Overview', subtitle: "Here's what is happening with your store today." },
	'/admin/products': { title: 'Product Management', subtitle: 'Manage your product inventory and details.' },
	'/admin/orders': { title: 'Orders', subtitle: 'Track and fulfil customer orders.' },
	'/admin/customers': { title: 'Customers', subtitle: 'See who is shopping with you.' },
	'/admin/settings': { title: 'Settings', subtitle: 'Manage your store preferences.' }
}

const navLinkClass = ({ isActive }) =>
	`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-[#fbe3ee] text-[#b84f7b]' : 'text-[#5f5359] hover:bg-[#f8edf2]'}`

function AdminLayout() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const [menuOpen, setMenuOpen] = useState(false)

	// Close the mobile menu whenever the page changes
	useEffect(() => {
		setMenuOpen(false)
	}, [location.pathname])

	const handleLogout = () => {
		logout()
		navigate('/login', { replace: true })
	}

	const { title, subtitle } = PAGE_TITLES[location.pathname] ?? PAGE_TITLES['/admin']

	return (
		<div className="flex min-h-screen flex-col bg-[#fdf0f5] text-[#30252a] md:flex-row md:bg-[#fbf8f5]">
			{/* ---------- Mobile header ---------- */}
			<div className="sticky top-0 z-40 md:hidden">
				<div className="flex h-16 items-center justify-between bg-[#fff0f6] px-4 shadow-[0_4px_8px_rgba(184,79,123,0.15)]">
					<Link to="/admin" aria-label="Admin overview">
						<img src={logo} alt="Cherry Cheeks Cosmetics" className="h-10 w-28 object-contain object-left" />
					</Link>

					<div className="flex items-center gap-1">
						<Link to="/shop" aria-label="View storefront" title="View storefront" className="flex size-10 items-center justify-center rounded-md text-[#30252a] hover:bg-[#f8edf2]">
							<FontAwesomeIcon icon={faBagShopping} className="text-xl" aria-hidden="true" />
						</Link>
						<button
							type="button"
							onClick={() => setMenuOpen((open) => !open)}
							aria-label={menuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={menuOpen}
							className="flex size-10 items-center justify-center rounded-md text-[#30252a] hover:bg-[#f8edf2]"
						>
							{menuOpen ? <X size={24} strokeWidth={1.6} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.6} aria-hidden="true" />}
						</button>
					</div>
				</div>

				{menuOpen && (
					<div className="absolute inset-x-0 top-full border-b border-[#efd8e2] bg-[#fff9fc] p-3 shadow-lg">
						<nav aria-label="Admin navigation" className="flex flex-col gap-1">
							{navigation.map(({ label, to, icon: Icon, end }) => (
								<NavLink key={label} to={to} end={end} className={navLinkClass}>
									<Icon size={17} strokeWidth={1.8} aria-hidden="true" />
									{label}
								</NavLink>
							))}
						</nav>

						<div className="mt-3 flex items-center gap-3 rounded-md bg-white p-3">
							<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbe3ee] text-xs font-semibold text-[#a8446c]">
								{user.firstName?.[0]}{user.lastName?.[0]}
							</span>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-semibold">{user.firstName} {user.lastName}</p>
								<p className="text-xs capitalize text-[#82757b]">{user.role}</p>
							</div>
							<button type="button" onClick={handleLogout} aria-label="Sign out" title="Sign out" className="flex size-9 shrink-0 items-center justify-center rounded-md text-[#74666d] hover:bg-[#f8edf2] hover:text-[#a9365b]">
								<LogOut size={17} aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* ---------- Desktop sidebar ---------- */}
			<aside className="hidden w-60 shrink-0 flex-col border-r border-[#efd8e2] bg-[#fff9fc] md:flex md:min-h-screen">
				<Link to="/admin" className="flex h-[76px] shrink-0 items-center border-b border-[#f0e3e9] px-5">
					<img src={logo} alt="Cherry Cheeks Cosmetics" className="h-12 w-32 object-contain object-left" />
				</Link>

				<nav aria-label="Admin navigation" className="flex flex-1 flex-col gap-1 p-4">
					{navigation.map(({ label, to, icon: Icon, end }) => (
						<NavLink key={label} to={to} end={end} className={navLinkClass}>
							<Icon size={17} strokeWidth={1.8} aria-hidden="true" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="border-t border-[#f0e3e9] p-4">
					<div className="flex items-center gap-3 rounded-md bg-white p-3">
						<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbe3ee] text-xs font-semibold text-[#a8446c]">
							{user.firstName?.[0]}{user.lastName?.[0]}
						</span>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold">{user.firstName} {user.lastName}</p>
							<p className="text-xs capitalize text-[#82757b]">{user.role}</p>
						</div>
						<button type="button" onClick={handleLogout} aria-label="Sign out" title="Sign out" className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#74666d] hover:bg-[#f8edf2] hover:text-[#a9365b]">
							<LogOut size={16} aria-hidden="true" />
						</button>
					</div>
					<Link to="/shop" className="mt-3 block px-3 text-sm text-[#74666d] hover:text-[#30252a]">
						View storefront
					</Link>
				</div>
			</aside>

			{/* ---------- Content ---------- */}
			<div className="min-w-0 flex-1">
				<header className="px-4 pb-0 pt-6 sm:px-6 md:flex md:min-h-[76px] md:items-center md:justify-between md:border-b md:border-[#f0e3e9] md:bg-[#fff9fc] md:px-8 md:py-0">
					<div>
						<h1 className="text-2xl font-semibold md:text-lg">{title}</h1>
						<p className="mt-1 text-sm text-[#82757b]">{subtitle}</p>
					</div>
				</header>
				<div className="p-4 sm:p-6 lg:p-8">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default AdminLayout