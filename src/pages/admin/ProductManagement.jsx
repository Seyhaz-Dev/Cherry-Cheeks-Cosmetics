import { useEffect, useState } from 'react'
import { AlertTriangle, Database, MoreHorizontal, Package, PackageX, Pencil, Plus, Search, Trash2 } from 'lucide-react'

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
// Use it like this: STATUS[getStatus(p.stock)].label
const STATUS = {
	in: { label: 'In stock', className: 'bg-[#b9f3c9] text-[#1f6b3a]' },
	low: { label: 'Low stock', className: 'bg-[#fde8b5] text-[#8a5a00]' },
	out: { label: 'Out of stock', className: 'bg-[#fbd0d0] text-[#a02c2c]' }
}

// The options in the Category dropdown
const CATEGORIES = ['Skincare', 'Lips', 'Face', 'Eyes', 'Cheeks']

// What the form looks like when it is empty. Used to reset the form.
const EMPTY_FORM = { name: '', type: '', category: 'Skincare', price: '', stock: '', image: '' }

// One style shared by all the form inputs (so we don't repeat it 5 times)
const inputClass = 'mt-1 w-full rounded-md border border-[#e6d3dc] px-3 py-2 text-sm outline-none focus:border-[#e0568a]'

// A small reusable box for the 4 stat cards at the top.
// We write it once and use it 4 times with different label / value / icon / color.
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

	// NEW: true while the file is still loading
	const [loading, setLoading] = useState(true)

	// NEW: a message if the file could not be loaded
	const [loadError, setLoadError] = useState('')

	// NEW: useEffect runs ONE time, when the page opens (that is what the [] at the end means)
	useEffect(() => {
		fetch('/data/products.json')            // ask the server for the file
			.then((res) => {
				if (!res.ok) throw new Error('File not found')   // the file is missing
				return res.json()               // turn the file text into a JavaScript list
			})
			.then((data) => {
				setProducts(data)               // put the list in the page's memory
				setLoading(false)               // stop showing "Loading..."
			})
			.catch(() => {
				setLoadError('Could not load the products. Check public/data/products.json')
				setLoading(false)
			})
	}, [])

	// Toolbar: the text in the search box, and the chosen status filter
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')

	// DELETE: the product the person clicked. null = nobody, so the popup is closed.
	const [productToDelete, setProductToDelete] = useState(null)

	// ADD / EDIT: is the popup open? what is typed in it? is there an error message?
	const [showForm, setShowForm] = useState(false)
	const [form, setForm] = useState(EMPTY_FORM)
	const [formError, setFormError] = useState('')

	// ADD / EDIT: null = we are ADDING a new product.
	//  a number = we are EDITING the product with that id.
	const [editingId, setEditingId] = useState(null)

	// VIEW: the product shown in the details popup. null = popup closed.
	const [productToView, setProductToView] = useState(null)

	// DELETE: keep every product EXCEPT the chosen one, then close the popup.
	// filter() builds a new list with only the items that pass the test.
	const confirmDelete = () => {
		setProducts(products.filter((p) => p.id !== productToDelete.id))
		setProductToDelete(null)
	}

	// FORM: runs on every keystroke. Copies the form and changes only the field you typed in.
	// It works for all 5 inputs because each input has a "name" (e.target.name).
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	// Runs when you choose a picture file
	const handleImage = (e) => {
		const file = e.target.files[0]      // the file the person chose
		if (!file) return                   // nothing chosen, stop

		const reader = new FileReader()     // a tool that reads files
		reader.onload = () => {
			setForm((oldForm) => ({ ...oldForm, image: reader.result }))   // save the picture (as text) in the form
		}
		reader.readAsDataURL(file)          // start reading
	}

	// ADD: open the popup EMPTY (add mode)
	const openAddForm = () => {
		setEditingId(null)
		setForm(EMPTY_FORM)
		setShowForm(true)
	}

	// EDIT: open the popup FILLED with this product's values (edit mode)
	// String() turns numbers into text, because inputs hold text.
	const openEditForm = (p) => {
		setEditingId(p.id)
		setForm({
			name: p.name,
			type: p.type,
			category: p.category,
			price: String(p.price),
			stock: String(p.stock),
			image: p.image
		})
		setShowForm(true)
	}

	// FORM: close the popup and reset everything so it is clean next time
	const closeForm = () => {
		setShowForm(false)
		setForm(EMPTY_FORM)
		setFormError('')
		setEditingId(null)
	}

	// ADD or EDIT: runs when you press the Save button
	const handleSave = () => {
		// Step 1: check the form. "return" stops the function, so a bad form is never saved.
		if (!form.name.trim()) return setFormError('Please enter a product name.')
		if (form.price === '' || Number(form.price) < 0) return setFormError('Please enter a valid price.')
		if (form.stock === '' || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
			return setFormError('Stock must be a whole number.')
		}

		// Step 2: turn the typed text into the right types.
		// Number() makes price and stock real numbers.
		const values = {
			name: form.name.trim(),
			type: form.type.trim(),
			category: form.category,
			price: Number(form.price),
			stock: Number(form.stock),
			image: form.image
		}

		// Step 3: edit or add?
		if (editingId) {
			// EDIT: map() goes through every product.
			// For the one with the matching id, use { ...p, ...values } = old product + new values on top.
			// Every other product stays the same.
			setProducts(products.map((p) => (p.id === editingId ? { ...p, ...values } : p)))
		} else {
			// ADD: new product first, then all the old ones. Date.now() makes a unique id.
			setProducts([{ id: Date.now(), image: '', ...values }, ...products])
		}

		closeForm()
	}

	// Numbers for the stat cards. They update by themselves when products changes.
	const inStock = products.filter((p) => getStatus(p.stock) === 'in').length
	const lowStock = products.filter((p) => getStatus(p.stock) === 'low').length
	const outOfStock = products.filter((p) => getStatus(p.stock) === 'out').length

	// The products to SHOW in the table = the full list after search + status filter.
	const visibleProducts = products.filter((p) => {
		const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
		const matchesStatus = statusFilter === 'all' || getStatus(p.stock) === statusFilter
		return matchesSearch && matchesStatus
	})


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
					{/* onClick = what to do when clicked. Here: open the popup in Add mode. */}
					<button type="button" onClick={openAddForm} className="flex items-center gap-1.5 rounded-full bg-[#e0568a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#cc4a7b]">
						<Plus size={16} />
						Add Product
					</button>
				</div>

				{/* Search box + status filter */}
				<div className="mt-4 flex flex-col gap-3 sm:flex-row">
					<div className="relative sm:max-w-sm sm:flex-1">
						<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82757b]" />
						{/* value = what the box shows. onChange = save what you type into "search". */}
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search products"
							className="w-full rounded-md border border-[#e6d3dc] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#e0568a]"
						/>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="rounded-md border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
					>
						<option value="all">All statuses</option>
						<option value="in">In stock</option>
						<option value="low">Low stock</option>
						<option value="out">Out of stock</option>
					</select>
				</div>

				{/* The table. overflow-x-auto lets it scroll sideways on small screens. */}
				<div className="mt-4 overflow-x-auto">
					<table className="w-full min-w-[480px] text-left text-sm">

						{/* Column titles. "hidden md:table-cell" = hide on phones, show on bigger screens. */}
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
							{/* map() = make ONE table row for EACH product in the list.
							    key = a unique id so React can tell the rows apart. */}
							{visibleProducts.map((p) => {
								const status = STATUS[getStatus(p.stock)] // the label + colours for this row

								return (
									<tr key={p.id} className="border-t border-[#f0e3e9]">

										{/* Picture + name + "Type · $Price" */}
										<td className="py-3 pr-4">
											<div className="flex items-center gap-3">
												{/* If the product has an image show it, otherwise a pink square */}
												{p.image ? (
													<img src={p.image} alt={p.name} className="size-10 rounded-lg object-cover" />
												) : (
													<span className="size-10 rounded-lg bg-[#fbe3ee]" />
												)}
												<div>
													<p className="font-semibold">{p.name}</p>
													<p className="text-xs text-[#82757b]">{p.type} · ${p.price}</p>
												</div>
											</div>
										</td>

										<td className="hidden px-4 py-3 md:table-cell">{p.category}</td>
										<td className="hidden px-4 py-3 md:table-cell">${p.price}</td>
										<td className="whitespace-nowrap px-4 py-3">{p.stock} units</td>

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

					{/* NEW: shown while the JSON file is loading */}
					{loading && (
						<p className="py-10 text-center text-sm text-[#82757b]">Loading products...</p>
					)}

					{/* NEW: shown if the JSON file could not be loaded */}
					{loadError && (
						<p className="py-10 text-center text-sm text-[#a9365b]">{loadError}</p>
					)}

					{/* CHANGED: only when loading is finished and there is no error */}
					{!loading && !loadError && visibleProducts.length === 0 && (
						<p className="py-10 text-center text-sm text-[#82757b]">No products found.</p>
					)}
				</div>
			</section>

			{/*EDIT popup (shows when showForm is true) */}
			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">

						{/* The title changes depending on the mode */}
						<h2 className="text-lg font-semibold">{editingId ? 'Edit product' : 'Add product'}</h2>

						<div className="mt-4 space-y-4">
							{/* Each input has: name (which field), value (what it shows), onChange (save what you type) */}
							<label className="block text-sm font-medium text-[#5f5359]">
								Name
								<input name="name" value={form.name} onChange={handleChange} className={inputClass} />
							</label>

							<div className="grid grid-cols-2 gap-4">
								<label className="block text-sm font-medium text-[#5f5359]">
									Type (e.g. Serum)
									<input name="type" value={form.type} onChange={handleChange} className={inputClass} />
								</label>
								<label className="block text-sm font-medium text-[#5f5359]">
									Category
									<select name="category" value={form.category} onChange={handleChange} className={inputClass}>
										{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
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
									<input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} className={inputClass} />
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

						{/* Red error message. Shows only when formError is not empty. */}
						{formError && <p className="mt-4 text-sm text-[#a9365b]">{formError}</p>}

						<div className="mt-6 flex justify-end gap-2">
							<button type="button" onClick={closeForm} className="rounded-full px-4 py-2 text-sm hover:bg-[#f8edf2]">
								Cancel
							</button>
							{/* The button text changes depending on the mode */}
							<button type="button" onClick={handleSave} className="rounded-full bg-[#e0568a] px-5 py-2 text-sm font-medium text-white hover:bg-[#cc4a7b]">
								{editingId ? 'Save changes' : 'Save product'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ----- DELETE popup (shows when productToDelete is not null) ----- */}
			{productToDelete && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-sm rounded-xl bg-white p-6">
						<h2 className="text-lg font-semibold">Delete product</h2>
						<p className="mt-2 text-sm text-[#5f5359]">
							Delete <strong>{productToDelete.name}</strong>? This can't be undone.
						</p>
						<div className="mt-6 flex justify-end gap-2">
							{/* Cancel: set it back to null, which closes the popup and deletes nothing */}
							<button type="button" onClick={() => setProductToDelete(null)} className="rounded-full px-4 py-2 text-sm hover:bg-[#f8edf2]">
								Cancel
							</button>
							{/* Delete: run confirmDelete, which removes the product */}
							<button type="button" onClick={confirmDelete} className="rounded-full bg-[#a9365b] px-5 py-2 text-sm font-medium text-white">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ----- VIEW popup (shows when productToView is not null) ----- */}
			{productToView && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
						<h2 className="text-lg font-semibold">Product details</h2>

						{/* Picture + name + status pill */}
						<div className="mt-4 flex items-center gap-4">
							{productToView.image ? (
								<img src={productToView.image} alt={productToView.name} className="size-20 rounded-lg object-cover" />
							) : (
								<span className="size-20 rounded-lg bg-[#fbe3ee]" />
							)}
							<div>
								<p className="text-lg font-semibold">{productToView.name}</p>
								<span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS[getStatus(productToView.stock)].className}`}>
									{STATUS[getStatus(productToView.stock)].label}
								</span>
							</div>
						</div>

						{/* List of details. "|| '—'" shows a dash when the value is empty. */}
						<dl className="mt-5 divide-y divide-[#f0e3e9] text-sm">
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Category</dt>
								<dd className="font-medium">{productToView.category}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Type</dt>
								<dd className="font-medium">{productToView.type || '—'}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Price</dt>
								<dd className="font-medium">${productToView.price}</dd>
							</div>
							<div className="flex justify-between py-2.5">
								<dt className="text-[#82757b]">Stock</dt>
								<dd className="font-medium">{productToView.stock} units</dd>
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

		</div>
	)
}

export default ProductManagement