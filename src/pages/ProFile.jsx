import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const inputClass =
  "w-full rounded-xl border border-[#eee4df] bg-[#fbf8f5] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa6] focus:border-[#e94f7d] focus:bg-white focus:ring-4 focus:ring-[#e94f7d]/10";

function ProFile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const getInitials = () => {
    const first = user?.firstName?.[0] || formData.firstName?.[0] || "";
    const last = user?.lastName?.[0] || formData.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const result = updateProfile(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setMessage("Profile updated successfully!");
    }
  };

  const handleEditClick = () => {
    setActiveTab("personal");
    setMessage("");
    setError("");
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const avatarSrc = formData.avatar || user?.avatar;

  const tabClass = (tab) =>
    `w-full rounded-xl px-4 py-2 text-left text-sm ${
      activeTab === tab
        ? "bg-[#e8478a] text-white"
        : "border border-[#eee4df] bg-white text-gray-700"
    }`;

  const toggleTrack =
    "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e8478a] peer-checked:after:translate-x-full peer-checked:after:border-white";

  return (
    <section className="bg-[#fbf8f5] ">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:gap-4 lg:px-8 lg:py-10">
        <h2>My Account</h2>

        {/* Profile card (left) + form (right), equal height */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-stretch lg:gap-10">
          {/* LEFT: profile card */}
          <div className="flex w-full flex-col items-center rounded-2xl border border-[#eee4df] bg-white p-6 lg:justify-center">
            <div className="relative h-40 w-40">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#e8478a] text-5xl text-white">
                  {getInitials()}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                onClick={handleEditClick}
                className="absolute -bottom-1 -right-3 rounded-xl bg-[#e8478a] px-4 py-1 text-sm text-white"
              >
                Edit
              </button>
            </div>

            <div className="mt-5 flex max-w-full flex-col text-center">
              <h4 className="break-words">
                {formData.firstName || user?.firstName}{" "}
                {formData.lastName || user?.lastName}
              </h4>
              <p className="break-all text-gray-500">
                {formData.email || user?.email}
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-2">
              <button onClick={() => setActiveTab("personal")} className={tabClass("personal")}>
                Personal Information
              </button>
              <button onClick={() => setActiveTab("security")} className={tabClass("security")}>
                Security
              </button>
              <button onClick={() => setActiveTab("settings")} className={tabClass("settings")}>
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-30 items-center justify-between rounded-xl border border-[#eee4df] px-4 py-2 text-left text-sm text-red-500"
              >
                Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
          </div>

          {/* RIGHT: form panels */}
          <div className="min-w-0">
            {activeTab === "personal" && (
              <div className="flex h-full w-full flex-col rounded-2xl border border-[#eee4df] bg-white px-4 py-5 sm:px-6 lg:px-10">
                <h4>Personal information</h4>
                <form onSubmit={handleSave}>
                  <div className="flex w-full flex-col justify-between gap-4 pt-5 sm:flex-row sm:gap-6 lg:gap-10">
                    <div className="flex w-full flex-col">
                      <label htmlFor="firstName">First name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="First name"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label htmlFor="lastName">Last name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col justify-between gap-4 pt-5 sm:flex-row sm:gap-6 lg:gap-10">
                    <div className="flex w-full flex-col">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="+855 123 456 789"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col justify-between gap-4 pt-5 sm:flex-row sm:gap-6 lg:gap-10">
                    <div className="flex w-full flex-col">
                      <label htmlFor="location">Location</label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Phnom Penh"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col py-5">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="h-24 w-full resize-y rounded-xl border border-[#eee4df] bg-[#fbf8f5] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#b5aaa6] focus:border-[#e94f7d] focus:bg-white focus:ring-4 focus:ring-[#e94f7d]/10"
                      placeholder=""
                    />
                  </div>

                  {message && <p className="mb-2 text-green-600">{message}</p>}
                  {error && <p className="mb-2 text-red-600">{error}</p>}
                  <div className="flex justify-end gap-3">
                    <button
                      type="submit"
                      className="rounded-xl bg-[#e8478a] px-6 py-2 text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="flex h-full w-full flex-col rounded-2xl border border-[#eee4df] bg-white px-4 py-5 sm:px-6 lg:px-10">
                <h4>Security</h4>
                <form action="">
                  <div className="flex w-full flex-col gap-5 pt-5">
                    <div className="flex w-full flex-col">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        className={inputClass}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        className={inputClass}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className={inputClass}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="mb-1">Two-Factor Authentication</h4>
                      <p className="font-normal text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl border border-[#eee4df] px-6 py-2 text-gray-700"
                    >
                      Enable
                    </button>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="rounded-xl bg-[#e8478a] px-6 py-2 text-white"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="flex h-full w-full flex-col rounded-2xl border border-[#eee4df] bg-white px-4 py-5 sm:px-6 lg:px-10">
                <h4>Settings</h4>
                <div className="flex flex-col gap-5 pt-5">
                  <div className="flex flex-col items-start justify-between gap-3 border-b border-[#eee4df] pb-4 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="mb-1">Email Notifications</h4>
                      <p className="font-normal text-gray-500">
                        Receive email updates about your orders
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className={toggleTrack}></div>
                    </label>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-3 border-b border-[#eee4df] pb-4 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="mb-1">SMS Notifications</h4>
                      <p className="font-normal text-gray-500">
                        Receive SMS updates about your orders
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className={toggleTrack}></div>
                    </label>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="mb-1">Marketing Emails</h4>
                      <p className="font-normal text-gray-500">
                        Receive promotional emails and offers
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className={toggleTrack}></div>
                    </label>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-xl bg-[#e8478a] px-6 py-2 text-white"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProFile;