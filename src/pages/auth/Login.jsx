import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center  px-3 py-6 sm:px-4 sm:py-8">
        <div className="w-full max-w-[500px] rounded-[26px] bg-[#fefefe] p-4  ring-1 ring-[#f1d9e5] sm:p-5 md:p-6">
            <div className="mb-1 text-center">
                
                <h2 className=" text-[1.65rem] font-bold tracking-[-0.04em] text-[#1f1b1d] sm:text-[1.9rem]">
                    Welcome back
                </h2>
            </div>

            <p className="mb-5 text-center text-[0.78rem] text-[#645d64] sm:text-[0.85rem]">
                Return to your saved rituals, orders, and rewards.       
            </p>

            <form className="space-y-3.5">

                <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-[#2c2b2d] sm:text-[0.85rem]"> Email address </label>
                    <input type="email" value="" readOnly className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 text-[0.92rem] text-[#2b2a2d] outline-none transition " />
                </div>

                <div>
                    <label className="mb-1.5 block text-[0.8rem] font-semibold text-[#2c2b2d] sm:text-[0.85rem]"> Password </label>
                    <div className="relative">
                        <input type="password" value="" readOnly className="w-full rounded-xl border border-[#eadfe5] px-3 py-2.5 pr-10 text-[0.92rem] text-[#2b2a2d] outline-none transition" />
                    </div>
                </div>

                <label className="flex items-start gap-2.5 text-[0.76rem] text-[#454147] sm:text-[0.8rem]">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-[#d7c4cf] accent-[#0d6efd]" />
                    <span> Remember me </span> 
                    <span className="ml-auto text-[#1f1b1d]">Forgot password?</span>
                
                </label>

                <button type="button" onClick={() => navigate("/")} className="mt-1 w-full rounded-xl bg-[#1d7ef0] px-4 py-3 text-[0.96rem] font-semibold text-white transition hover:bg-[#1770d8] sm:text-[1rem]">
                    Sign in
                </button>
            </form>

            <p className="mt-5 text-center text-base gap-2 sm:text-sm">Don't have an account? 
                <a href="/register" className="text-sm  text-blue-600 hover:text-blue-700">Register</a>
            </p>
        </div>
    </div>
  )
}

export default Login
