import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  // NEW: where the person was going before we sent them here (for example /checkout)
  const from = location.state?.from;
  const returnTo = from ? from.pathname + from.search : "/";
  const cameFromCheckout = from?.pathname === "/checkout";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    const result = register({ firstName, lastName, email, password });

    if (result.error) {
      setError(result.error);
      return;
    }

    // CHANGED: "Account created -> return to checkout"
    navigate(result.user.role === "admin" ? "/admin" : returnTo, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
      <div className="w-full max-w-[500px] rounded-[26px] bg-[#fefefe] p-4 ring-1 ring-[#f1d9e5] sm:p-5 md:p-6">

        <h2 className="mb-1 text-center text-[1.65rem] font-bold tracking-[-0.04em] text-[#1f1b1d] sm:text-[1.9rem]">
          Create your account
        </h2>

        <p className="mb-5 text-center text-[0.78rem] text-[#645d64] sm:text-[0.85rem]">
          Join for faster checkout, ritual notes, and early access.
        </p>

        {/* NEW: shown only when the person was sent here from the checkout */}
        {cameFromCheckout && (
          <p className="mb-4 rounded-lg bg-pink-50 px-3 py-2 text-center text-sm text-pink-700">
            Create an account to continue to checkout.
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-3.5">

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Password
            </label>
            <div className="flex rounded-xl border border-[#eadfe5] focus-within:border-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-xl px-3 py-2.5 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <label className="flex items-start gap-2.5 text-xs text-[#454147]">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 accent-blue-600"
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="font-semibold text-blue-600">
                Terms
              </a>{" "}
              and acknowledge the{" "}
              <a href="/privacy" className="font-semibold text-blue-600">
                Privacy Policy
              </a>.
            </span>
          </label>

          <button type="submit" className="mt-1 w-full rounded-xl bg-[#1d7ef0] px-4 py-3 text-base font-semibold text-white hover:bg-[#1770d8]">
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm"> Already have an account?{" "}
          {/* CHANGED: state={location.state} keeps the saved page */}
          <Link to="/login" state={location.state} className="text-blue-600 hover:text-blue-700">
            Sign in
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

export default Register