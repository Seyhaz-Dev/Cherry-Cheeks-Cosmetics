import { useEffect, useState } from 'react'
import { AlertTriangle, ChevronLeft, ChevronRight, Database, MoreHorizontal, Package, PackageX, Pencil, Plus, Search, Trash2 } from 'lucide-react'

// Turns a stock number into a status word.
//   0 units      -> 'out'
//   1 to 10      -> 'low'
//   11 or more   -> 'in'
function getStatus(stock) {
	if (stock === 0) return 'out'
	if (stock <= 10) return 'low'
	return 'in'
}

// The text and colours for each stock status.
const STATUS = {
	in: { label: 'In stock', className: 'bg-[#b9f3c9] text-[#1f6b3a]' },
	low: { label: 'Low stock', className: 'bg-[#fde8b5] text-[#8a5a00]' },
	out: { label: 'Out of stock', className: 'bg-[#fbd0d0] text-[#a02c2c]' }
}

// How many products show on one page
const productsPerPage = 5

// What the form looks like when it is empty. Used to reset the form.
const EMPTY_FORM = {
	name: '',
	sku: '',
	categoryId: '',
	price: '',
	stockQuantity: '',
	image: ''
}

// One style shared by all the form inputs
const inputClass = 'mt-1 w-full rounded-md border border-[#e6d3dc] px-3 py-2 text-sm outline-none focus:border-[#e0568a]'

// A small reusable box for the 4 stat cards at the top.
function StatCard({ label, value, icon: Icon, color }) {
	return (
		<div className="rounded-xl bg-white p-4 sm:p-5">
			<div className="flex items-start justify-between">
				<p className="text-sm text-[#5f5359]">{label}</p>
				<span className={`flex size-9 items-center justify-center rounded-lg ${color}`}>
					<Icon size={18} />
				</span>
			</div>
			<p className="mt-3 text-2xl font-semibold">{value}</p>
		</div>
	)
}

function ProductManagement() {
	// The live list of products. Create, Edit and Delete all change this one.
	const [products, setProducts] = useState([])

	// The categories list (from categories.json)
	const [categories, setCategories] = useState([])

	const [loading, setLoading] = useState(true)
	const [loadError, setLoadError] = useState('')

	// The page the person is on (starts at 1)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		async function getData() {
			// Load products from localStorage (admin-added products)
			const localProducts = localStorage.getItem('cherry-cheeks-products')
			if (localProducts) {
				setProducts(JSON.parse(localProducts))
			} else {
				// If no localStorage, load from JSON file
				try {
					const productsResponse = await fetch('/student-data/products.json')
					const productsData = await productsResponse.json()
					setProducts(productsData)
				} catch (error) {
					setLoadError('Failed to load products')
				}
			}

			// Load categories
			try {
				const categoriesResponse = await fetch('/student-data/categories.json')
				const categoriesData = await categoriesResponse.json()
				setCategories(categoriesData)
			} catch (error) {
				setLoadError('Failed to load categories')
			}

			setLoading(false)
		}

		getData()
	}, [])

	// Save products to localStorage whenever they change
	useEffect(() => {
		try {
			if (products.length > 0) {
				localStorage.setItem('cherry-cheeks-products', JSON.stringify(products))
			}
		} catch (error) {
			console.error('Failed to save products to localStorage:', error)
			// If image is too large, save without images
			const productsWithoutImages = products.map(p => ({ ...p, image: null }))
			localStorage.setItem('cherry-cheeks-products', JSON.stringify(productsWithoutImages))
		}
	}, [products])

	// Finds the category name from a categoryId. Shows "—" if it is not found.
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId)
		return category ? category.name : '—'
	}

	// Toolbar: the text in the search box, and the chosen status filter
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')

	// DELETE: the product the person clicked. null = popup closed.
	const [productToDelete, setProductToDelete] = useState(null)

	// ADD / EDIT: is the popup open? what is typed in it? is there an error message?
	const [showForm, setShowForm] = useState(false)
	const [form, setForm] = useState(EMPTY_FORM)
	const [formError, setFormError] = useState('')

	// ADD / EDIT: null = we are ADDING. a number = we are EDITING the product with that id.
	const [editingId, setEditingId] = useState(null)

	// VIEW: the product shown in the details popup. null = popup closed.
	const [productToView, setProductToView] = useState(null)

	// NOTIFICATION: shows a success message
	const [notification, setNotification] = useState(null)

	// DELETE: keep every product EXCEPT the chosen one, then close the popup.
	const confirmDelete = () => {
		setProducts(products.filter((p) => p.id !== productToDelete.id))
		setProductToDelete(null)
		setNotification('Product deleted successfully')
		setTimeout(() => setNotification(null), 3000)
	}

	// FORM: runs on every keystroke. Changes only the field you typed in.
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	// Runs when you choose a picture file
	const handleImage = (e) => {
		const file = e.target.files[0]
		if (!file) return

		const reader = new FileReader()
		reader.onload = () => {
			const img = new Image()
			img.onload = () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				
				// Resize to max 300x300 to reduce size
				const maxSize = 300
				let width = img.width
				let height = img.height
				
				if (width > height) {
					if (width > maxSize) {
						height *= maxSize / width
						width = maxSize
					}
				} else {
					if (height > maxSize) {
						width *= maxSize / height
						height = maxSize
					}
				}
				
				canvas.width = width
				canvas.height = height
				ctx.drawImage(img, 0, 0, width, height)
				
				// Compress as JPEG with 0.7 quality
				const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)
				setForm((oldForm) => ({ ...oldForm, image: compressedDataUrl }))
			}
			img.src = reader.result
		}
		reader.readAsDataURL(file)
	}

	// ADD: open the popup EMPTY. The category starts as the first one in the list.
	const openAddForm = () => {
		setEditingId(null)
		setForm({ ...EMPTY_FORM, categoryId: categories[0]?.id ?? '' })
		setShowForm(true)
	}

	// EDIT: open the popup FILLED with this product's values.
	// String() turns numbers into text, because inputs hold text.
	const openEditForm = (p) => {
		setEditingId(p.id)
		setForm({
			name: p.name,
			sku: p.sku,
			categoryId: p.categoryId,
			price: String(p.price),
			stockQuantity: String(p.stockQuantity),
			image: p.image ?? ''
		})
		setShowForm(true)
	}

	// FORM: close the popup and reset everything.
	const closeForm = () => {
		setShowForm(false)
		setForm(EMPTY_FORM)
		setFormError('')
		setEditingId(null)
	}

	// ADD or EDIT: runs when you press the Save button
	const handleSave = () => {
		// Step 1: check the form.
		if (!form.name.trim()) return setFormError('Please enter a product name.')
		if (form.categoryId === '') return setFormError('Please choose a category.')
		if (form.price === '' || Number(form.price) < 0) return setFormError('Please enter a valid price.')
		if (form.stockQuantity === '' || !Number.isInteger(Number(form.stockQuantity)) || Number(form.stockQuantity) < 0) {
			return setFormError('Stock must be a whole number.')
		}

		// Step 2: turn the typed text into the right types.
		const values = {
			name: form.name.trim(),
			sku: form.sku.trim(),
			categoryId: Number(form.categoryId),
			price: Number(form.price),
			stockQuantity: Number(form.stockQuantity),
			image: form.image
		}

		// Step 3: edit or add?
		if (editingId !== null) {
			// EDIT: replace only the product with this id.
			setProducts(products.map((p) => (p.id === editingId ? { ...p, ...values } : p)))
			setNotification('Product updated successfully')
		} else {
			// ADD: new product first. brand and active are filled in for you.
			setProducts([{ id: Date.now(), brand: 'Cherry Cheeks', active: true, ...values }, ...products])
			setNotification('Product added successfully')
		}

		closeForm()
		setTimeout(() => setNotification(null), 3000)
	}

	// Numbers for the stat cards.
	const inStock = products.filter((p) => getStatus(p.stockQuantity) === 'in').length
	const lowStock = products.filter((p) => getStatus(p.stockQuantity) === 'low').length
	const outOfStock = products.filter((p) => getStatus(p.stockQuantity) === 'out').length

	// The products after search + status filter (all pages together).
	const visibleProducts = products.filter((p) => {
		const text = search.toLowerCase()
		const matchesSearch = p.name.toLowerCase().includes(text) || p.sku.toLowerCase().includes(text)
		const matchesStatus = statusFilter === 'all' || getStatus(p.stockQuantity) === statusFilter
		return matchesSearch && matchesStatus
	})

	// ===== PAGINATION =====

	// How many pages there are (Math.ceil rounds up: 12 products / 5 per page = 3 pages)
	const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage))

	// Safety: after a delete, never stay on a page that no longer exists
	const page = Math.min(currentPage, totalPages)

	// Page 1 starts at item 0, page 2 at item 5, and so on
	const startIndex = (page - 1) * productsPerPage

	// ONLY the products for this page. The table draws these.
	const pageProducts = visibleProducts.slice(startIndex, startIndex + productsPerPage)

	// For the text "Showing 1–5 of 12"
	const firstShown = visibleProducts.length === 0 ? 0 : startIndex + 1
	const lastShown = startIndex + pageProducts.length

	return (
		<div className="space-y-4 sm:space-y-5">

			<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
				<StatCard label="Total Products" value={products.length} icon={Package} color="bg-[#fde0ec] text-[#e0568a]" />
				<StatCard label="In Stock" value={inStock} icon={Database} color="bg-[#c9f5d8] text-[#1f9d55]" />
				<StatCard label="Low Stock" value={lowStock} icon={AlertTriangle} color="bg-[#fdebc0] text-[#d98a00]" />
				<StatCard label="Out of Stock" value={outOfStock} icon={PackageX} color="bg-[#e8d5fa] text-[#8f46d8]" />
			</div>

			<section className="rounded-xl bg-white p-4 sm:p-6">

				<div className="flex items-start justify-between gap-3">
					<div>
						<h2 className="text-lg font-semibold">Products</h2>
						<p className="text-sm text-[#82757b]">Total {products.length} products</p>
					</div>
					<button type="button" onClick={openAddForm} className="flex items-center gap-1.5 rounded-full bg-[#e0568a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#cc4a7b]">
						<Plus size={16} />
						Add Product
					</button>
				</div>

				{/* Search box + status filter. Both go back to page 1 when they change. */}
				<div className="mt-4 flex flex-col gap-3 sm:flex-row">
					<div className="relative sm:max-w-sm sm:flex-1">
						<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82757b]" />
						<input
							value={search}
							onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
							placeholder="Search name or SKU"
							className="w-full rounded-full border border-[#e6d3dc] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#e0568a]"
						/>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
						className="rounded-full border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
					>
						<option value="all">All statuses</option>
						<option value="in">In stock</option>
						<option value="low">Low stock</option>
						<option value="out">Out of stock</option>
					</select>
				</div>

				{/* The table */}
				<div className="mt-4 overflow-x-auto">
					<table className="w-full min-w-[480px] text-left text-sm">

						<thead className="text-[#5f5359]">
							<tr>
								<th className="py-3 pr-4 font-medium">Products</th>
								<th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
								<th className="hidden px-4 py-3 font-medium md:table-cell">Price</th>
								<th className="px-4 py-3 font-medium">Stock</th>
								<th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
								<th className="py-3 pl-4 font-medium">Actions</th>
							</tr>
						</thead>

						<tbody>
							{/* Draws pageProducts (only this page), not visibleProducts */}
							{pageProducts.map((p) => {
								const status = STATUS[getStatus(p.stockQuantity)]

								return (
									<tr key={p.id} className="border-t border-[#f0e3e9]">

										<td className="py-3 pr-4">
											<div className="flex items-center gap-3">
												{p.image ? (
													<img src={p.image} alt={p.name} className="size-10 rounded-lg object-cover" />
												) : (
													<span className="size-10 rounded-lg bg-[#fbe3ee]" />
												)}
												<div>
													<p className="font-semibold">{p.name}</p>
													<p className="text-xs text-[#82757b]">{p.sku} · ${p.price.toFixed(2)}</p>
												</div>
											</div>
										</td>

										<td className="hidden px-4 py-3 md:table-cell">{getCategoryName(p.categoryId)}</td>
										<td className="hidden px-4 py-3 md:table-cell">${p.price.toFixed(2)}</td>
										<td className="whitespace-nowrap px-4 py-3">{p.stockQuantity} units</td>

										<td className="hidden px-4 py-3 sm:table-cell">
											<span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
										</td>

										<td className="py-3 pl-4">
											<div className="flex items-center gap-1 text-[#e0568a]">
												<button type="button" aria-label="Edit" onClick={() => openEditForm(p)} className="rounded-md p-2 hover:bg-[#fff0f6]"><Pencil size={15} /></button>
												<button type="button" aria-label="Delete" onClick={() => setProductToDelete(p)} className="rounded-md p-2 hover:bg-[#fff0f6]"><Trash2 size={15} /></button>
												<button type="button" aria-label="View details" onClick={() => setProductToView(p)} className="rounded-md p-2 hover:bg-[#fff0f6]"><MoreHorizontal size={16} /></button>
											</div>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>

					{loading && (
						<p className="py-10 text-center text-sm text-[#82757b]">Loading products...</p>
					)}

					{loadError && (
						<p className="py-10 text-center text-sm text-[#a9365b]">{loadError}</p>
					)}

					{!loading && !loadError && visibleProducts.length === 0 && (
						<p className="py-10 text-center text-sm text-[#82757b]">No products found.</p>
					)}
				</div>

				{/* ===== PAGINATION BAR ===== */}
				<div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-[#82757b] sm:flex-row">

					<p>Showing {firstShown}–{lastShown} of {visibleProducts.length}</p>

					<div className="flex items-center gap-1.5">

						{/* Previous: faded on page 1 */}
						<button
							type="button"
							onClick={() => setCurrentPage(page - 1)}
							disabled={page === 1}
							aria-label="Previous page"
							className="flex size-8 items-center justify-center rounded-md border border-[#e6d3dc] hover:bg-[#f8edf2] disabled:cursor-not-allowed disabled:opacity-40"
						>
							<ChevronLeft size={14} />
						</button>

						{/* One button for each page: 1, 2, 3 ... */}
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

						{/* Next: faded on the last page */}
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

			{/* ADD / EDIT popup */}
			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">

						<h2 className="text-lg font-semibold">{editingId !== null ? 'Edit product' : 'Add product'}</h2>

						<div className="mt-4 space-y-4">
							<label className="block text-sm font-medium text-[#5f5359]">
								Name
								<input name="name" value={form.name} onChange={handleChange} className={inputClass} />
							</label>

							<div className="grid grid-cols-2 gap-4">
								<label className="block text-sm font-medium text-[#5f5359]">
									SKU (e.g. SK-105)
									<input name="sku" value={form.sku} onChange={handleChange} className={inputClass} />
								</label>
								<label className="block text-sm font-medium text-[#5f5359]">
									Category
									<select name="categoryId" value={form.categoryId} onChange={handleChange} className={inputClass}>
										{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
									</select>
								</label>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<label className="block text-sm font-medium text-[#5f5359]">
									Price ($)
									<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className={inputClass} />
								</label>
								<label className="block text-sm font-medium text-[#5f5359]">
									Stock (units)
									<input name="stockQuantity" type="number" min="0" step="1" value={form.stockQuantity} onChange={handleChange} className={inputClass} />
								</label>
							</div>

							<label className="block text-sm font-medium text-[#5f5359]">
								Picture
								<div className="mt-1 flex items-center gap-3">
									{form.image ? (
										<img src={form.image} alt="Preview" className="size-14 rounded-lg object-cover" />
									) : (
										<span className="size-14 rounded-lg bg-[#fbe3ee]" />
									)}
									<input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
								</div>
							</label>
						</div>

						{formError && <p className="mt-4 text-sm text-[#a9365b]">{formError}</p>}

						<div className="mt-6 flex justify-end gap-2">
							<button type="button" onClick={closeForm} className="rounded-full px-4 py-2 text-sm hover:bg-[#f8edf2]">
								Cancel
							</button>
							<button type="button" onClick={handleSave} className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]">
								{editingId !== null ? 'Save changes' : 'Save product'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* DELETE popup */}
			{productToDelete && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-sm rounded-xl bg-white p-6">
						<h2 className="text-lg font-semibold">Delete product</h2>
						<p className="mt-2 text-sm text-[#5f5359]">
							Delete <strong>{productToDelete.name}</strong>? This can't be undone.
						</p>
						<div className="mt-6 flex justify-end gap-2">
							<button type="button" onClick={() => setProductToDelete(null)} className="rounded-full px-4 py-2 text-sm hover:bg-[#f8edf2]">
								Cancel
							</button>
							<button type="button" onClick={confirmDelete} className="rounded-full bg-[#a9365b] px-5 py-2 text-sm font-medium text-white">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* VIEW popup */}
			{productToView && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
						<h2 className="text-lg font-semibold">Product details</h2>

						<div className="mt-4 flex items-center gap-4">
							{productToView.image ? (
								<img src={productToView.image} alt={productToView.name} className="size-20 rounded-lg object-cover" />
							) : (
								<span className="size-20 rounded-lg bg-[#fbe3ee]" />
							)}
							<div>
								<p className="text-lg font-semibold">{productToView.name}</p>
								<span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS[getStatus(productToView.stockQuantity)].className}`}>
									{STATUS[getStatus(productToView.stockQuantity)].label}
								</span>
							</div>
						</div>

						<dl className="mt-5 divide-y divide-[#f0e3e9] text-sm">
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Category</dt>
								<dd className="font-medium">{getCategoryName(productToView.categoryId)}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">SKU</dt>
								<dd className="font-medium">{productToView.sku || '—'}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Brand</dt>
								<dd className="font-medium">{productToView.brand}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Price</dt>
								<dd className="font-medium">${productToView.price.toFixed(2)}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Stock</dt>
								<dd className="font-medium">{productToView.stockQuantity} units</dd>
							</div>
						</dl>

						<div className="mt-6 flex justify-end gap-2">
							<button type="button" onClick={() => setProductToView(null)} className="rounded-full px-4 py-2 text-sm hover:bg-[#f8edf2]">
								Close
							</button>
							<button type="button" onClick={() => { openEditForm(productToView); setProductToView(null) }} className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]">
								Edit
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Notification toast */}
			{notification && (
				<div className="fixed bottom-4 right-4 z-50 rounded-lg bg-[#1f9d55] px-6 py-3 text-white shadow-lg">
					<p className="text-sm font-medium">{notification}</p>
				</div>
			)}

		</div>
	)
}

export default ProductManagement