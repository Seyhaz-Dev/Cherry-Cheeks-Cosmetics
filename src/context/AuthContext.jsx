import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'cherry-cheeks-demo-users'
const SESSION_KEY = 'cherry-cheeks-demo-session'
const DEMO_ADMIN = {
  email: 'admin@cherrycheeks.com',
  password: 'admin#123!',
  firstName: 'Store',
  lastName: 'Admin',
  role: 'admin',
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function readSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

function AuthProvider({ children }) {
  const [users, setUsers] = useState(readUsers)
  const [user, setUser] = useState(readSession)

  const register = ({ firstName, lastName, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some((account) => account.email === normalizedEmail)) {
      return { error: 'An account with this email already exists.' }
    }

    const account = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
      role: 'user',
    }
    const nextUsers = [...users, account]
    const signedInUser = { ...account }
    delete signedInUser.password

    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(signedInUser))
    setUsers(nextUsers)
    setUser(signedInUser)

    return { user: signedInUser }
  }

  const login = ({ email, password, rememberMe }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const account = normalizedEmail === DEMO_ADMIN.email && password === DEMO_ADMIN.password
      ? DEMO_ADMIN
      : users.find(
        (savedAccount) => savedAccount.email === normalizedEmail && savedAccount.password === password,
      )

    if (!account) {
      return { error: 'Email or password is incorrect.' }
    }

    const signedInUser = { ...account }
    delete signedInUser.password
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem(SESSION_KEY, JSON.stringify(signedInUser))
    setUser(signedInUser)

    return { user: signedInUser }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const updateProfile = (updates) => {
    if (!user) {
      return { error: 'No user logged in.' }
    }

    const normalizedEmail = updates.email ? updates.email.trim().toLowerCase() : user.email

    if (normalizedEmail !== user.email && users.some((account) => account.email === normalizedEmail)) {
      return { error: 'An account with this email already exists.' }
    }

    const updatedUser = {
      ...user,
      firstName: updates.firstName !== undefined ? updates.firstName.trim() : user.firstName,
      lastName: updates.lastName !== undefined ? updates.lastName.trim() : user.lastName,
      email: normalizedEmail,
      phone: updates.phone !== undefined ? updates.phone.trim() : user.phone || '',
      location: updates.location !== undefined ? updates.location.trim() : user.location || '',
      bio: updates.bio !== undefined ? updates.bio.trim() : user.bio || '',
      avatar: updates.avatar !== undefined ? updates.avatar : user.avatar || '',
    }

    const nextUsers = users.map((account) =>
      account.email === user.email
        ? { ...account, ...updates, email: normalizedEmail, avatar: updates.avatar !== undefined ? updates.avatar : account.avatar || '' }
        : account
    )

    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
    const session = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
    session.setItem(SESSION_KEY, JSON.stringify(updatedUser))
    setUsers(nextUsers)
    setUser(updatedUser)

    return { user: updatedUser }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }