import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Award,
  Crown,
  Database,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck,
  UserPlus,
  Users
} from 'lucide-react'

// Map customer status to color badge styling
const STATUS = {
  Active: { label: 'Active', className: 'bg-[#b9f3c9] text-[#1f6b3a]' },
  Inactive: { label: 'Inactive', className: 'bg-[#fbd0d0] text-[#a02c2c]' },
  Pending: { label: 'Pending', className: 'bg-[#fde8b5] text-[#8a5a00]' }
}

// Map VIP tiers to badge styling
const TIERS = {
  Bronze: { label: 'Bronze', className: 'bg-[#f3e8e2] text-[#8c5837]' },
  Silver: { label: 'Silver', className: 'bg-[#e2e8f0] text-[#475569]' },
  Gold: { label: 'Gold', className: 'bg-[#fef3c7] text-[#92400e]' },
  Platinum: { label: 'Platinum', className: 'bg-[#e0e7ff] text-[#3730a3]' }
}

// Initial fallback mock data
const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-101',
    name: 'Olivia Bennett',
    email: 'olivia.b@example.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 14,
    totalSpent: 1280.40,
    tier: 'Platinum',
    status: 'Active',
    joinedDate: 'Jan 12, 2025',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CUST-102',
    name: 'Ethan Reynolds',
    email: 'e.reynolds@example.com',
    phone: '+1 (555) 876-5432',
    totalOrders: 3,
    totalSpent: 145.00,
    tier: 'Bronze',
    status: 'Active',
    joinedDate: 'Mar 04, 2025',
    avatar: ''
  },
  {
    id: 'CUST-103',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 345-6789',
    totalOrders: 28,
    totalSpent: 3410.20,
    tier: 'Gold',
    status: 'Active',
    joinedDate: 'Nov 18, 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'CUST-104',
    name: 'Liam Johnson',
    email: 'ljohnson@example.com',
    phone: '+1 (555) 987-6543',
    totalOrders: 1,
    totalSpent: 49.99,
    tier: 'Bronze',
    status: 'Inactive',
    joinedDate: 'Jun 22, 2025',
    avatar: ''
  },
  {
    id: 'CUST-105',
    name: 'Ava White',
    email: 'ava.white@example.com',
    phone: '+1 (555) 456-7890',
    totalOrders: 8,
    totalSpent: 620.50,
    tier: 'Silver',
    status: 'Pending',
    joinedDate: 'Sep 05, 2025',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  }
]

// Empty form template for resets
const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  tier: 'Bronze',
  status: 'Active',
  totalOrders: '0',
  totalSpent: '0',
  avatar: ''
}

const inputClass = 'mt-1 w-full rounded-md border border-[#e6d3dc] px-3 py-2 text-sm outline-none focus:border-[#e0568a]'

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm text-[#5f5359]">{label}</p>
        <span className={`flex size-9 items-center justify-center rounded-lg ${color}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  // Search & Filter state
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')

  // Modals & Action state
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const [customerToView, setCustomerToView] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')

  // Load initial customers or fall back
  useEffect(() => {
    fetch('/data/customers.json')
      .then((res) => {
        if (!res.ok) throw new Error('File not found')
        return res.json()
      })
      .then((data) => {
        setCustomers(data)
        setLoading(false)
      })
      .catch(() => {
        setCustomers(INITIAL_CUSTOMERS)
        setLoading(false)
      })
  }, [])

  // Dynamic calculations for stat cards
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === 'Active').length
  const vipCustomers = customers.filter((c) => c.tier === 'Gold' || c.tier === 'Platinum').length
  const inactiveCustomers = customers.filter((c) => c.status === 'Inactive' || c.status === 'Pending').length

  // Filter logic
  const visibleCustomers = customers.filter((c) => {
    const query = search.toLowerCase()
    const matchesSearch =
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query)

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter

    return matchesSearch && matchesStatus && matchesTier
  })

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setForm((oldForm) => ({ ...oldForm, avatar: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const openAddForm = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setShowForm(true)
  }

  const openEditForm = (c) => {
    setEditingId(c.id)
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone,
      tier: c.tier,
      status: c.status,
      totalOrders: String(c.totalOrders),
      totalSpent: String(c.totalSpent),
      avatar: c.avatar || ''
    })
    setFormError('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setForm(EMPTY_FORM)
    setFormError('')
    setEditingId(null)
  }

  const handleSave = () => {
    if (!form.name.trim()) return setFormError('Please enter a customer name.')
    if (!form.email.trim() || !form.email.includes('@')) return setFormError('Please enter a valid email address.')

    const values = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || 'N/A',
      tier: form.tier,
      status: form.status,
      totalOrders: Number(form.totalOrders) || 0,
      totalSpent: Number(form.totalSpent) || 0,
      avatar: form.avatar
    }

    if (editingId) {
      setCustomers(customers.map((c) => (c.id === editingId ? { ...c, ...values } : c)))
    } else {
      const newCustomer = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        ...values
      }
      setCustomers([newCustomer, ...customers])
    }

    closeForm()
  }

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== customerToDelete.id))
    setCustomerToDelete(null)
  }

  return (
    <div className="space-y-4 sm:space-y-5 font-sans text-slate-700">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Customers" value={totalCustomers} icon={Users} color="bg-[#fde0ec] text-[#e0568a]" />
        <StatCard label="Active Customers" value={activeCustomers} icon={UserCheck} color="bg-[#c9f5d8] text-[#1f9d55]" />
        <StatCard label="VIP Members" value={vipCustomers} icon={Crown} color="bg-[#fdebc0] text-[#d98a00]" />
        <StatCard label="Inactive / Pending" value={inactiveCustomers} icon={AlertTriangle} color="bg-[#e8d5fa] text-[#8f46d8]" />
      </div>

      {/* Main Table Container */}
      <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Customers</h2>
            <p className="text-sm text-[#82757b]">Total {customers.length} registered customers</p>
          </div>
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-1.5 rounded-full bg-[#e0568a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#cc4a7b] transition-colors"
          >
            <Plus size={16} />
            Add Customer
          </button>
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:max-w-sm sm:flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82757b]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="w-full rounded-md border border-[#e6d3dc] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#e0568a]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="rounded-md border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
            >
              <option value="all">All tiers</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[580px] text-left text-sm">
            <thead className="text-[#5f5359] border-b border-[#f0e3e9]">
              <tr>
                <th className="py-3 pr-4 font-medium">Customer</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Contact</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Orders</th>
                <th className="px-4 py-3 font-medium">Total Spent</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
                <th className="py-3 pl-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCustomers.map((c) => {
                const statusBadge = STATUS[c.status] || { label: c.status, className: 'bg-gray-100 text-gray-700' }
                const tierBadge = TIERS[c.tier] || { label: c.tier, className: 'bg-gray-100 text-gray-700' }

                return (
                  <tr key={c.id} className="border-t border-[#f0e3e9] hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        {c.avatar ? (
                          <img src={c.avatar} alt={c.name} className="size-10 rounded-full object-cover" />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-full bg-[#fbe3ee] text-[#e0568a] font-semibold">
                            {c.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">{c.name}</p>
                          <p className="text-xs text-[#82757b]">{c.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-700 flex items-center gap-1">
                          <Mail size={12} className="text-[#82757b]" /> {c.email}
                        </p>
                        <p className="text-xs text-[#82757b] flex items-center gap-1">
                          <Phone size={12} className="text-[#82757b]" /> {c.phone}
                        </p>
                      </div>
                    </td>

                    <td className="hidden px-4 py-3 text-[#82757b] sm:table-cell">{c.totalOrders} orders</td>

                    <td className="px-4 py-3 font-semibold text-slate-900">${Number(c.totalSpent).toFixed(2)}</td>

                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tierBadge.className}`}>
                        {tierBadge.label}
                      </span>
                    </td>

                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </td>

                    <td className="py-3 pl-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-[#e0568a]">
                        <button type="button" aria-label="Edit" onClick={() => openEditForm(c)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <Pencil size={15} />
                        </button>
                        <button type="button" aria-label="Delete" onClick={() => setCustomerToDelete(c)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <Trash2 size={15} />
                        </button>
                        <button type="button" aria-label="View profile" onClick={() => setCustomerToView(c)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {loading && <p className="py-10 text-center text-sm text-[#82757b]">Loading customers...</p>}
          {loadError && <p className="py-10 text-center text-sm text-[#a9365b]">{loadError}</p>}
          {!loading && !loadError && visibleCustomers.length === 0 && (
            <p className="py-10 text-center text-sm text-[#82757b]">No customers found.</p>
          )}
        </div>
      </section>

      {/* CREATE / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">{editingId ? 'Edit Customer' : 'Add Customer'}</h2>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-[#5f5359]">
                Full Name
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="e.g. Olivia Bennett" />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-[#5f5359]">
                  Email Address
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="olivia@example.com" />
                </label>
                <label className="block text-sm font-medium text-[#5f5359]">
                  Phone Number
                  <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-[#5f5359]">
                  Membership Tier
                  <select name="tier" value={form.tier} onChange={handleChange} className={inputClass}>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-[#5f5359]">
                  Account Status
                  <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-[#5f5359]">
                  Total Orders
                  <input name="totalOrders" type="number" min="0" value={form.totalOrders} onChange={handleChange} className={inputClass} />
                </label>
                <label className="block text-sm font-medium text-[#5f5359]">
                  Total Spent ($)
                  <input name="totalSpent" type="number" step="0.01" min="0" value={form.totalSpent} onChange={handleChange} className={inputClass} />
                </label>
              </div>

              <label className="block text-sm font-medium text-[#5f5359]">
                Profile Picture
                <div className="mt-1 flex items-center gap-3">
                  {form.avatar ? (
                    <img src={form.avatar} alt="Preview" className="size-12 rounded-full object-cover" />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#fbe3ee] text-[#e0568a]">
                      <UserPlus size={20} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleAvatar} className="text-sm" />
                </div>
              </label>
            </div>

            {formError && <p className="mt-4 text-sm text-[#a9365b]">{formError}</p>}

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
                Cancel
              </button>
              <button type="button" onClick={handleSave} className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]">
                {editingId ? 'Save changes' : 'Save customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {customerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Delete customer</h2>
            <p className="mt-2 text-sm text-[#5f5359]">
              Are you sure you want to delete customer <strong>{customerToDelete.name}</strong> ({customerToDelete.id})? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setCustomerToDelete(null)} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
                Cancel
              </button>
              <button type="button" onClick={confirmDelete} className="rounded-full bg-[#a9365b] px-5 py-2 text-sm font-medium text-white hover:bg-[#8f2b4b]">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {customerToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Customer Profile</h2>

            <div className="mt-4 flex items-center gap-4 border-b border-[#f0e3e9] pb-4">
              {customerToView.avatar ? (
                <img src={customerToView.avatar} alt={customerToView.name} className="size-16 rounded-full object-cover" />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-full bg-[#fbe3ee] text-[#e0568a] text-xl font-bold">
                  {customerToView.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-lg font-bold text-slate-900">{customerToView.name}</p>
                <p className="text-xs text-[#82757b]">{customerToView.id}</p>
                <div className="mt-1 flex gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TIERS[customerToView.tier]?.className}`}>
                    {customerToView.tier}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS[customerToView.status]?.className}`}>
                    {customerToView.status}
                  </span>
                </div>
              </div>
            </div>

            <dl className="mt-4 divide-y divide-[#f0e3e9] text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Email</dt>
                <dd className="font-medium text-slate-900">{customerToView.email}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Phone</dt>
                <dd className="font-medium text-slate-900">{customerToView.phone}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Member Since</dt>
                <dd className="font-medium text-slate-900">{customerToView.joinedDate}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Total Orders</dt>
                <dd className="font-medium text-slate-900">{customerToView.totalOrders} orders</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Lifetime Spend</dt>
                <dd className="font-semibold text-slate-900">${Number(customerToView.totalSpent).toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setCustomerToView(null)} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  openEditForm(customerToView)
                  setCustomerToView(null)
                }}
                className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}