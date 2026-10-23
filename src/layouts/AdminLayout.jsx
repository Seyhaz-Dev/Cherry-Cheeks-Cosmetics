import { ClipboardList, LayoutDashboard, Package, Settings, Users, LogOut } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo1.png'

const navigation = [
	{ label: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
	{ label: 'Products', to: '/admin/products', icon: Package },
	{ label: 'Orders', to: '/admin/orders', icon: ClipboardList },
	{ label: 'Customers', to: '/admin/customers', icon: Users },
	{ label: 'Settings', to: '/admin/settings', icon: Settings },
]

function AdminLayout() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<div className="flex min-h-screen flex-col bg-[#f8d7e6] text-[#30252a] md:flex-row">
			<aside className="flex w-full shrink-0 flex-col border-b border-[#efd8e2] bg-[#fff9fc] md:min-h-screen md:w-60 md:border-b-0 md:border-r">
				<Link to="/admin" className="flex h-[76px] shrink-0 items-center border-b border-[#f0e3e9] px-5">
					<img src={logo} alt="Cherry Cheeks Cosmetics" className="h-12 w-32 object-contain object-left" />
				</Link>

				<nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col md:gap-1 md:p-4">
					{navigation.map(({ label, to, icon: Icon, end }) => (
						<NavLink
							key={label}
							to={to}
							end={end}
							className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-[#fbe3ee] text-[#b84f7b]' : 'text-[#5f5359] hover:bg-[#f8edf2]'}`}
						>
							<Icon size={17} strokeWidth={1.8} aria-hidden="true" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="hidden border-t border-[#f0e3e9] p-4 md:block">
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

				<div className="flex items-center justify-between gap-3 px-4 pb-3 md:hidden">
					<span className="truncate text-xs text-[#74666d]">{user.firstName} {user.lastName} · {user.role}</span>
					<button type="button" onClick={handleLogout} aria-label="Sign out" title="Sign out" className="flex size-9 shrink-0 items-center justify-center rounded-md text-[#74666d] hover:bg-[#f8edf2] hover:text-[#a9365b]">
						<LogOut size={17} aria-hidden="true" />
					</button>
				</div>
			</aside>

			<div className="min-w-0 flex-1">
				<header className="flex min-h-[76px] items-center justify-between border-b border-[#f0e3e9] bg-[#fff9fc] px-5 sm:px-8">
					<div>
						<p className="text-lg font-semibold">Good morning, {user.firstName === 'Store' ? 'Admin' : user.firstName}!</p>
						<p className="text-sm text-[#82757b]">Here&apos;s what is happening with your store today.</p>
					</div>
				</header>
				<main className="p-4 sm:p-6 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
