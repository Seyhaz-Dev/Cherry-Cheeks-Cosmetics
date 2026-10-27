import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // NEW: where the person was going before we sent them here (for example /checkout)
  const from = location.state?.from;
  const returnTo = from ? from.pathname + from.search : "/";
  const cameFromCheckout = from?.pathname === "/checkout";

  // Store the email and password entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store checkbox and password visibility states
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const result = login({ email, password, rememberMe });

    if (result.error) {
      setError(result.error);
      return;
    }

    // CHANGED: admins go to /admin, everyone else goes back to where they were going
    navigate(result.user.role === "admin" ? "/admin" : returnTo, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8fb] px-3 py-6 sm:px-4 sm:py-8">
      <div className="w-full max-w-[500px] rounded-[26px] bg-white p-4 ring-1 ring-[#f1d9e5] sm:p-5 md:p-6">

        <div className="mb-1 text-center">
          <h2 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[#1f1b1d] sm:text-[1.9rem]">
            Welcome back
          </h2>
        </div>

        <p className="mb-5 text-center text-[0.78rem] text-[#645d64] sm:text-[0.85rem]">
          Return to your saved rituals, orders, and rewards.
        </p>

        {/* NEW: shown only when the person was sent here from the checkout */}
        {cameFromCheckout && (
          <p className="mb-4 rounded-lg bg-pink-50 px-3 py-2 text-center text-sm text-pink-700">
            Please sign in to continue to checkout.
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.8rem] font-semibold text-[#2c2b2d] sm:text-[0.85rem]">
              Email address
            </label>

            <input id="email" type="email" placeholder="Enter your email address" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[#eadfe5] px-3 py-3 text-[0.92rem] text-[#2b2a2d] outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[0.8rem] font-semibold text-[#2c2b2d] sm:text-[0.85rem]">
              Password
            </label>

            <div className="relative">
              <input id="password" type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#eadfe5] px-3 py-3 pr-20 text-[0.92rem] text-[#2b2a2d] outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-[0.8rem] text-[#454147]">
              <input type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded accent-blue-600" />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-[0.8rem] text-blue-600 hover:text-blue-800" >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="mt-1 w-full rounded-xl bg-[#1d7ef0] px-4 py-3 text-[0.96rem] font-semibold text-white transition hover:bg-[#1770d8] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 sm:text-[1rem]" >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#454147]">
          Don't have an account?{" "}
          {/* CHANGED: state={location.state} keeps the saved page ("New customer" in your flow) */}
          <Link to="/register" state={location.state} className="font-medium text-blue-600 hover:text-blue-700" >
            Register
          </Link>
        </p>

        {/* NEW: a way out for people who are only browsing */}
        <p className="mt-3 text-center text-sm">
          <Link to="/shop" className="text-[#645d64] hover:text-[#1f1b1d]">
            ← Continue shopping
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login