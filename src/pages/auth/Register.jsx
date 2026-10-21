import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    alert("Create account button works!");

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!agree) {
        alert("Please agree to the Terms and Privacy Policy.");
        return;
    }

    alert("Account form completed successfully!");
    navigate("/login");
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

        <form onSubmit={handleRegister} className="space-y-3.5">

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

          <button  type="button" onClick={() => alert("Button works!")} className="mt-1 w-full rounded-xl bg-[#1d7ef0] px-4 py-3 text-base font-semibold text-white hover:bg-[#1770d8]">
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm"> Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register