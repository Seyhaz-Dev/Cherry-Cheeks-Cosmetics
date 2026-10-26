import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import defaultLogo from '../../assets/logo1.png'

const SETTINGS_KEY = 'cherry-cheeks-admin-settings'
const SETTINGS_EVENT = 'cherry-settings-updated'

const DEFAULT_SETTINGS = {
	storeName: 'Cherry Cheeks Cosmetics',
	supportEmail: 'support@cherrycheeks.com',
	phone: '+1 555 0142',
	address: '12 Rose Garden Street, Phnom Penh',
	description: 'Clean, cruelty-free beauty essentials for glowing skin.',
	logo: '',
}

const inputClass = 'mt-1 w-full rounded-md border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]'

function readSettings(user) {
	const defaults = {
		...DEFAULT_SETTINGS,
		supportEmail: user?.email || DEFAULT_SETTINGS.supportEmail,
		phone: user?.phone || DEFAULT_SETTINGS.phone,
	}

	try {
		return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }
	} catch {
		return defaults
	}
}

export default function Settings() {
	const { user, updateProfile, changePassword } = useAuth()
	const [settings, setSettings] = useState(() => readSettings(user))
	const [profile, setProfile] = useState({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
	})
	const [passwords, setPasswords] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [error, setError] = useState('')

	useEffect(() => {
		const syncSettings = () => setSettings(readSettings(user))

		window.addEventListener('storage', syncSettings)
		window.addEventListener(SETTINGS_EVENT, syncSettings)

		return () => {
			window.removeEventListener('storage', syncSettings)
			window.removeEventListener(SETTINGS_EVENT, syncSettings)
		}
	}, [user])

	const onChange = (event) => {
		const { name, value } = event.target
		setSettings({ ...settings, [name]: value })
	}

	const onProfileChange = (event) => {
		const { name, value } = event.target
		setProfile({ ...profile, [name]: value })
	}

	const onPasswordChange = (event) => {
		const { name, value } = event.target
		setPasswords({ ...passwords, [name]: value })
	}

	const onLogoChange = (event) => {
		const file = event.target.files?.[0]
		if (!file) return

		if (file.size > 2 * 1024 * 1024) {
			setError('Logo must be smaller than 2 MB.')
			return
		}

		const reader = new FileReader()
		reader.onload = () => setSettings((current) => ({ ...current, logo: reader.result }))
		reader.readAsDataURL(file)
		setError('')
	}

	const handleSave = (event) => {
		event.preventDefault()
		setError('')

		if (!settings.storeName.trim()) {
			setError('Store name is required.')
			return
		}
		if (!settings.supportEmail.includes('@')) {
			setError('Enter a valid support email.')
			return
		}

		if (profile.firstName !== user?.firstName || profile.lastName !== user?.lastName || profile.email !== user?.email) {
			const result = updateProfile(profile)
			if (result.error) {
				setError(result.error)
				return
			}
		}

		const wantsPasswordChange = passwords.currentPassword || passwords.newPassword || passwords.confirmPassword

		if (wantsPasswordChange) {
			if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
				setError('Fill in all password fields.')
				return
			}
			if (passwords.newPassword !== passwords.confirmPassword) {
				setError('New passwords do not match.')
				return
			}

			const result = changePassword(passwords)
			if (result.error) {
				setError(result.error)
				return
			}

			setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
		}

		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
		window.dispatchEvent(new Event(SETTINGS_EVENT))
	}

	return (
		<form onSubmit={handleSave} className="space-y-5">
			<section className="rounded-xl bg-white p-5">
				<h2 className="text-base font-semibold">Store logo</h2>
				<p className="text-sm text-[#82757b]">Upload the logo used for your store.</p>

				<div className="mt-4 flex flex-wrap items-center gap-4">
					<img
						src={settings.logo || defaultLogo}
						alt="Store logo"
						className={`h-20 w-20 rounded-full border border-[#f0e3e9] bg-[#fff9fc] ${
              settings.logo ? 'object-cover' : 'object-contain p-2'
            }`}
					/>

					<div>
						<label className="inline-block cursor-pointer rounded-full bg-[#fbe3ee] px-4 py-2 text-sm font-medium text-[#a8446c] hover:bg-[#f8d7e6]">
							Upload new logo
							<input type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
						</label>
						<p className="mt-1 text-xs text-[#82757b]">PNG, JPG or SVG up to 2 MB.</p>
						{settings.logo && (
							<button
								type="button"
								onClick={() => setSettings({ ...settings, logo: '' })}
								className="mt-1 text-xs font-medium text-[#a9365b] hover:underline"
							>
								Remove logo
							</button>
						)}
					</div>
				</div>
			</section>

			<section className="rounded-xl bg-white p-5">
				<h2 className="text-base font-semibold">Store information</h2>
				<p className="text-sm text-[#82757b]">Basic information shown to your customers.</p>

				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<label className="block text-sm font-medium text-[#5f5359] sm:col-span-2">
						Store name
						<input name="storeName" value={settings.storeName} onChange={onChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359]">
						Support email
						<input name="supportEmail" type="email" value={settings.supportEmail} onChange={onChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359]">
						Phone number
						<input name="phone" value={settings.phone} onChange={onChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359] sm:col-span-2">
						Address
						<input name="address" value={settings.address} onChange={onChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359] sm:col-span-2">
						Store description
						<textarea name="description" rows={3} value={settings.description} onChange={onChange} className={inputClass} />
					</label>
				</div>
			</section>

			<section className="rounded-xl bg-white p-5">
				<h2 className="text-base font-semibold">Admin account</h2>
				<p className="text-sm text-[#82757b]">Update your admin details and password.</p>

				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<label className="block text-sm font-medium text-[#5f5359]">
						First name
						<input name="firstName" value={profile.firstName} onChange={onProfileChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359]">
						Last name
						<input name="lastName" value={profile.lastName} onChange={onProfileChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359] sm:col-span-2">
						Email address
						<input name="email" type="email" value={profile.email} onChange={onProfileChange} className={inputClass} />
					</label>

					<label className="block text-sm font-medium text-[#5f5359] sm:col-span-2">
						Current password
						<input
							name="currentPassword"
							type="password"
							autoComplete="current-password"
							placeholder="Leave blank to keep the current password"
							value={passwords.currentPassword}
							onChange={onPasswordChange}
							className={inputClass}
						/>
					</label>

					<label className="block text-sm font-medium text-[#5f5359]">
						New password
						<input
							name="newPassword"
							type="password"
							autoComplete="new-password"
							value={passwords.newPassword}
							onChange={onPasswordChange}
							className={inputClass}
						/>
					</label>

					<label className="block text-sm font-medium text-[#5f5359]">
						Confirm new password
						<input
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
							value={passwords.confirmPassword}
							onChange={onPasswordChange}
							className={inputClass}
						/>
					</label>
				</div>
			</section>

			<div className="flex flex-wrap items-center gap-4">
				<button type="submit" className="rounded-full bg-[#e0568a] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#cc4a7b]">
					Save changes
				</button>
				{error && <p className="text-sm text-[#a9365b]">{error}</p>}
			</div>
		</form>
	)
}
