import { useState } from "react";

function ProFile() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <section className="bg-[#fbf8f5] font-bold">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:gap-10 lg:px-8 lg:py-12">
        <h2>My Account</h2>

        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
          <div className="flex w-full lg:w-72 flex-col items-center rounded-xl border border-gray-200 p-6 bg-white">
            <div className="relative h-40 w-40">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#e8478a] text-5xl text-white">
                SC
              </div>
              <button className="absolute -bottom-1 -right-3 rounded-full border border-pink-200 bg-white px-4 py-1 text-sm text-[#e8478a]">
                Edit Profile
              </button>
            </div>

            <div className="mt-5 flex flex-col text-center">
              <h4>Sophea Chanhello</h4>
              <p className="text-gray-500">sophea@example.com</p>
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
              <form action="">
                <div className="flex flex-col sm:flex-row justify-between pt-5 gap-4 sm:gap-6 lg:gap-10 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Full name</label>
                    <input type="text" className="border px-2 py-1 rounded-xl w-full" placeholder="Sophea Chan" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Email</label>
                    <input type="text" className="border px-2 py-1 rounded-xl w-full" placeholder="sophea@example.com" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between pt-5 gap-4 sm:gap-6 lg:gap-10 w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Phone</label>
                    <input type="text" className="border px-2 py-1 rounded-xl w-full" placeholder="+855 123 456 789" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="">Location</label>
                    <input type="text" className="border px-2 py-1 rounded-xl w-full" placeholder="Phnom Penh" />
                  </div>
                </div>
                <div className="w-full py-5 flex flex-col">
                  <label htmlFor="">Bio</label>
                  <input type="text" className="border pb-10 px-2 py-1 rounded-xl" placeholder="" />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="rounded-xl bg-[#e8478a] px-6 py-2 text-white">
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