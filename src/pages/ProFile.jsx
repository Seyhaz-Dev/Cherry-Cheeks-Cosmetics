import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProFile() {
  const { user, updateProfile } = useAuth();
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

  const handleSelectImage = () => {
    setActiveTab("personal");
    setMessage("");
    setError("");
    fileInputRef.current?.click();
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
  };

  const avatarSrc = formData.avatar || user?.avatar;

  return (
    <section className="bg-[#fbf8f5] font-bold">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:gap-10 lg:px-8 lg:py-12">
        <h2>My Account</h2>

        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
          <div className="flex w-full lg:w-72 flex-col items-center rounded-xl border border-gray-200 p-6 bg-white">
            <div className="relative h-40 w-40">
              {avatarSrc ? (
                <img src={avatarSrc} alt="Profile" className="h-full w-full rounded-full object-cover" />
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
                onClick={handleSelectImage}
                className="absolute -bottom-1 -right-3 rounded-full border border-pink-200 bg-white px-4 py-1 text-sm text-[#e8478a]"
              >
                Edit Profile
              </button>
            </div>

            <div className="mt-5 flex flex-col text-center">
              <h4>
                {formData.firstName || user?.firstName} {formData.lastName || user?.lastName}
              </h4>
              <p className="text-gray-500">{formData.email || user?.email}</p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-2">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                  activeTab === "personal"
                    ? "bg-[#e8478a] text-white"
                    : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                  activeTab === "security"
                    ? "bg-[#e8478a] text-white"
                    : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                  activeTab === "settings"
                    ? "bg-[#e8478a] text-white"
                    : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          {activeTab === "personal" && (
            <div className="flex flex-col border border-gray-200 rounded-xl w-full py-5 px-4 sm:px-6 lg:px-10 bg-white">
              <h4>Personal information</h4>
              <form onSubmit={handleSave}>
                <div className="flex flex-col sm:flex-row justify-between pt-5 gap-4 sm:gap-6 lg:gap-10 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">First name</label>
                    <input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded-xl w-full"
                      placeholder="First name"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Last name</label>
                    <input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded-xl w-full"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pt-5 gap-4 sm:gap-6 lg:gap-10 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded-xl w-full"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Phone</label>
                    <input
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded-xl w-full"
                      placeholder="+855 123 456 789"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pt-5 gap-4 sm:gap-6 lg:gap-10 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Location</label>
                    <input
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded-xl w-full"
                      placeholder="Phnom Penh"
                    />
                  </div>
                </div>
                <div className="w-full py-5 flex flex-col">
                  <label htmlFor="">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border px-2 py-2 rounded-xl h-24"
                    placeholder=""
                  />
                </div>
                <div className="w-full pb-5 flex flex-col">
                  <label htmlFor="">Profile Picture</label>
                  <div className="flex items-center gap-4 mt-2">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8478a] text-xl text-white">
                        {getInitials()}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleSelectImage}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      Choose Image
                    </button>
                  </div>
                </div>
                {message && <p className="text-green-600 mb-2">{message}</p>}
                {error && <p className="text-red-600 mb-2">{error}</p>}
                <div className="flex justify-end">
                  <button type="submit" className="rounded-xl bg-[#e8478a] px-6 py-2 text-white">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="flex flex-col border border-gray-200 rounded-xl w-full py-5 px-4 sm:px-6 lg:px-10 bg-white">
              <h4>Security</h4>
              <form action="">
                <div className="flex flex-col gap-5 pt-5 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Current Password</label>
                    <input type="password" className="border px-2 py-1 rounded-xl w-full" placeholder="Enter current password" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">New Password</label>
                    <input type="password" className="border px-2 py-1 rounded-xl w-full" placeholder="Enter new password" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Confirm New Password</label>
                    <input type="password" className="border px-2 py-1 rounded-xl w-full" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="mb-1">Two-Factor Authentication</h4>
                    <p className="text-gray-500 font-normal">Add an extra layer of security to your account</p>
                  </div>
                  <button type="button" className="rounded-xl border border-gray-200 px-6 py-2 text-gray-700">
                    Enable
                  </button>
                </div>
                <div className="flex justify-end mt-6">
                  <button type="button" className="rounded-xl bg-[#e8478a] px-6 py-2 text-white">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex flex-col border border-gray-200 rounded-xl w-full py-5 px-4 sm:px-6 lg:px-10 bg-white">
              <h4>Settings</h4>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-4">
                  <div>
                    <h4 className="mb-1">Email Notifications</h4>
                    <p className="text-gray-500 font-normal">Receive email updates about your orders</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e8478a] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-4">
                  <div>
                    <h4 className="mb-1">SMS Notifications</h4>
                    <p className="text-gray-500 font-normal">Receive SMS updates about your orders</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e8478a] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="mb-1">Marketing Emails</h4>
                    <p className="text-gray-500 font-normal">Receive promotional emails and offers</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#e8478a] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="button" className="rounded-xl bg-[#e8478a] px-6 py-2 text-white">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProFile;