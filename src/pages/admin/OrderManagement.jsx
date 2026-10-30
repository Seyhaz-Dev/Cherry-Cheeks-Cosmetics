import { useState } from 'react'
import { useOrders } from '../../context/OrderContext'
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Database, MoreHorizontal, Package, Pencil, Plus, Search, Trash2 } from 'lucide-react'

// Map order status to color pill styling
const STATUS = {
  Processing: { label: 'Processing', className: 'bg-[#dbeafe] text-[#1e40af]' },
  Pending: { label: 'Pending', className: 'bg-[#fde8b5] text-[#8a5a00]' },
  Completed: { label: 'Completed', className: 'bg-[#b9f3c9] text-[#1f6b3a]' },
}

// Empty form template for reset/creation
const EMPTY_FORM = { customer: '', items: '1 Item', total: '', payment: 'Paid', status: 'Pending' }

// Standardized input style matching ProductManagement
const inputClass = 'mt-1 w-full rounded-md border border-[#e6d3dc] px-3 py-2 text-sm outline-none focus:border-[#e0568a]'
const ordersPerPage = 5

// Reusable Stat Card matching ProductManagement design
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

export default function OrderManagement() {
  // Orders now come from the shared OrderContext
  const { orders, addOrder, updateOrder, deleteOrder } = useOrders()

  // Search & Filter state
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Modals & Action target states
  const [orderToDelete, setOrderToDelete] = useState(null)
  const [orderToView, setOrderToView] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')

  // Stat computations
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length
  const processingOrders = orders.filter((o) => o.status === 'Processing').length
  const completedOrders = orders.filter((o) => o.status === 'Completed').length

  // Filtered orders list based on search term & status filter
  const visibleOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(visibleOrders.length / ordersPerPage))
  const page = Math.min(currentPage, totalPages)
  const startIndex = (page - 1) * ordersPerPage
  const pageOrders = visibleOrders.slice(startIndex, startIndex + ordersPerPage)
  const firstShown = visibleOrders.length === 0 ? 0 : startIndex + 1
  const lastShown = startIndex + pageOrders.length

  // Handlers for Form & Actions
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openAddForm = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setShowForm(true)
  }

  const openEditForm = (o) => {
    setEditingId(o.id)
    setForm({
      customer: o.customer,
      items: o.items,
      total: String(o.total),
      payment: o.payment,
      status: o.status,
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
    if (!form.customer.trim()) return setFormError('Please enter a customer name.')
    if (form.total === '' || Number(form.total) <= 0) return setFormError('Please enter a valid total amount.')

    const values = {
      customer: form.customer.trim(),
      items: form.items.trim() || '1 Item',
      total: Number(form.total),
      payment: form.payment,
      status: form.status,
    }

    if (editingId) {
      updateOrder(editingId, values)
    } else {
      // Manual order created by admin
      const newOrder = addOrder({
        customer: values.customer,
        cartItems: [],
        total: values.total,
        payment: values.payment,
      })
      // addOrder defaults to "Pending" and "0 Items", so apply the form's values
      updateOrder(newOrder.id, { status: values.status, items: values.items })
    }

    closeForm()
  }

  const confirmDelete = () => {
    deleteOrder(orderToDelete.id)
    setOrderToDelete(null)
  }

  return (
    <div className="space-y-4 sm:space-y-5 font-sans text-slate-700">
      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Orders" value={totalOrders} icon={Package} color="bg-[#fde0ec] text-[#e0568a]" />
        <StatCard label="Pending" value={pendingOrders} icon={Clock} color="bg-[#fdebc0] text-[#d98a00]" />
        <StatCard label="Processing" value={processingOrders} icon={Database} color="bg-[#dbeafe] text-[#1e40af]" />
        <StatCard label="Completed" value={completedOrders} icon={CheckCircle2} color="bg-[#c9f5d8] text-[#1f9d55]" />
      </div>

      {/* Main Container */}
      <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Orders</h2>
            <p className="text-sm text-[#82757b]">Total {orders.length} orders</p>
          </div>
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-1.5 rounded-full bg-[#e0568a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#cc4a7b] transition-colors"
          >
            <Plus size={16} />
            New Order
          </button>
        </div>

        {/* Toolbar: Search input & Status Dropdown */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:max-w-sm sm:flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82757b]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              placeholder="Search by ID or customer..."
              className="w-full rounded-full border border-[#e6d3dc] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#e0568a]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
            className="rounded-full border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Table View */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-[#5f5359]">
              <tr>
                <th className="py-3 pr-4 font-medium">Order</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Date</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="py-3 pl-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((o) => {
                const statusBadge = STATUS[o.status] || { label: o.status, className: 'bg-gray-100 text-gray-700' }

                return (
                  <tr key={o.id} className="border-t border-[#f0e3e9]">
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-semibold">{o.id}</p>
                        <p className="text-xs text-[#82757b]">{o.customer} · {o.payment}</p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">{o.date}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">{o.items}</td>
                    <td className="px-4 py-3 font-semibold">${Number(o.total).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center gap-1 text-[#e0568a]">
                        <button type="button" aria-label="Edit" onClick={() => openEditForm(o)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <Pencil size={15} />
                        </button>
                        <button type="button" aria-label="Delete" onClick={() => setOrderToDelete(o)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <Trash2 size={15} />
                        </button>
                        <button type="button" aria-label="View details" onClick={() => setOrderToView(o)} className="rounded-md p-2 hover:bg-[#fff0f6]">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {visibleOrders.length === 0 && (
            <p className="py-10 text-center text-sm text-[#82757b]">No orders found.</p>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-[#82757b] sm:flex-row">
          <p>Showing {firstShown}–{lastShown} of {visibleOrders.length}</p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex size-8 items-center justify-center rounded-md border border-[#e6d3dc] hover:bg-[#f8edf2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setCurrentPage(number)}
                aria-current={number === page ? 'page' : undefined}
                className={`flex size-8 items-center justify-center rounded-md border text-sm ${
                  number === page
                    ? 'border-[#e0568a] bg-[#e0568a] text-white'
                    : 'border-[#e6d3dc] text-[#30252a] hover:bg-[#f8edf2]'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
              className="flex size-8 items-center justify-center rounded-md border border-[#e6d3dc] hover:bg-[#f8edf2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CREATE / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">{editingId ? 'Edit Order' : 'Add Order'}</h2>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-[#5f5359]">
                Customer Name
                <input name="customer" value={form.customer} onChange={handleChange} className={inputClass} placeholder="e.g. Olivia Bennett" />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-[#5f5359]">
                  Total ($)
                  <input name="total" type="number" step="0.01" value={form.total} onChange={handleChange} className={inputClass} placeholder="0.00" />
                </label>
                <label className="block text-sm font-medium text-[#5f5359]">
                  Items Count
                  <input name="items" value={form.items} onChange={handleChange} className={inputClass} placeholder="e.g. 2 Items" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-[#5f5359]">
                  Status
                  <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-[#5f5359]">
                  Payment Status
                  <select name="payment" value={form.payment} onChange={handleChange} className={inputClass}>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </label>
              </div>
            </div>

            {formError && <p className="mt-4 text-sm text-[#a9365b]">{formError}</p>}

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
                Cancel
              </button>
              <button type="button" onClick={handleSave} className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]">
                {editingId ? 'Save changes' : 'Save order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Delete order</h2>
            <p className="mt-2 text-sm text-[#5f5359]">
              Delete order <strong>{orderToDelete.id}</strong> ({orderToDelete.customer})? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOrderToDelete(null)} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
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
      {orderToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Order Details</h2>

            <div className="mt-4 flex items-center justify-between border-b border-[#f0e3e9] pb-4">
              <div>
                <p className="text-xl font-bold text-slate-900">{orderToView.id}</p>
                <p className="text-sm text-[#82757b]">{orderToView.customer}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS[orderToView.status]?.className}`}>
                {STATUS[orderToView.status]?.label || orderToView.status}
              </span>
            </div>

            <dl className="mt-4 divide-y divide-[#f0e3e9] text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Order Date</dt>
                <dd className="font-medium">{orderToView.date}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Items</dt>
                <dd className="font-medium">{orderToView.items}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Payment Status</dt>
                <dd className="font-medium">{orderToView.payment}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#82757b]">Total Amount</dt>
                <dd className="font-semibold text-slate-900">${Number(orderToView.total).toFixed(2)}</dd>
              </div>

              {/* Purchased products (only for orders placed through Checkout) */}
              {orderToView.lineItems?.length > 0 && (
                <div className="py-2.5">
                  <dt className="text-[#82757b]">Products</dt>
                  {orderToView.lineItems.map((li, i) => (
                    <dd key={i} className="mt-1 flex justify-between font-medium">
                      <span>{li.name} × {li.quantity}</span>
                      <span>${(li.price * li.quantity).toFixed(2)}</span>
                    </dd>
                  ))}
                </div>
              )}
            </dl>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOrderToView(null)} className="rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-[#f8edf2]">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  openEditForm(orderToView)
                  setOrderToView(null)
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