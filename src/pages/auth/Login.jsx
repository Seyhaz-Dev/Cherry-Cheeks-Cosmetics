import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Store the email and password entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store checkbox and password visibility states
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleLogin = (e) => {e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // Demo only: this does not verify the user's credentials.
    alert(`Welcome back, ${email}!`);

    navigate("/");
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

        <form onSubmit={handleLogin} className="space-y-4">

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
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700" >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login