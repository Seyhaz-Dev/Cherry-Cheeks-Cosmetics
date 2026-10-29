import { Mail, MapPin, Phone, Send } from 'lucide-react'

function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')
        const email = formData.get('email')
        const message = formData.get('message')
        const subject = `Contact form message from ${name}`
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`

        window.location.href = `mailto:cherrycheeks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    return (
        <main className="bg-[#fbf8f5] px-5 pb-20 pt-10 font-['Outfit',sans-serif] text-[#292524] sm:px-8 sm:pt-10">
            <div className="mx-auto max-w-6xl">

                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#89565a] sm:text-sm">
                        Cherry Cheeks customer care
                    </p>
                    <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Let's talk <span className="text-[#e94f7d]">skincare</span>
                    </h1>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#817874] sm:text-base">
                        Questions about your routine, an order, or one of our products? Send us a note and we'll be glad to help.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

                    <section aria-labelledby="contact-details-heading" className="space-y-4">
                        <h2 id="contact-details-heading" className="sr-only">Contact details</h2>

                        <address className="space-y-4 not-italic">

                            <a href="mailto:cherrycheeks@gmail.com" className="group flex items-center gap-4 rounded-2xl border border-[#eee4df] bg-white p-5 transition hover:border-[#e94f7d]/40 hover:shadow-md" >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fde0ec] text-[#e94f7d]">
                                    <Mail size={20} aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-xs font-medium uppercase tracking-wider text-[#89565a]">Email</span>
                                    <span className="break-all text-sm font-medium group-hover:text-[#e94f7d]">cherrycheeks@gmail.com</span>
                                </span>
                            </a>

                            <a href="tel:+855962221351" className="group flex items-center gap-4 rounded-2xl border border-[#eee4df] bg-white p-5 transition hover:border-[#e94f7d]/40 hover:shadow-md" >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fde0ec] text-[#e94f7d]">
                                    <Phone size={20} aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-xs font-medium uppercase tracking-wider text-[#89565a]">Phone</span>
                                    <span className="text-sm font-medium group-hover:text-[#e94f7d]">+855 96 222 1351</span>
                                </span>
                            </a>

                            <div className="flex items-center gap-4 rounded-2xl border border-[#eee4df] bg-white p-5">
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fde0ec] text-[#e94f7d]">
                                    <MapPin size={20} aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-xs font-medium uppercase tracking-wider text-[#89565a]">Location</span>
                                    <span className="text-sm font-medium">Phnom Penh, Cambodia</span>
                                </span>
                            </div>
                        </address>

                        <div className="overflow-hidden rounded-2xl border border-[#eee4df] bg-white">
                            <iframe title="Google Map showing Phnom Penh, Cambodia"
                                src="https://www.google.com/maps?q=Phnom%20Penh%2C%20Cambodia&output=embed"
                                className="h-56 w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" />

                            <a href="https://www.google.com/maps/search/?api=1&query=Phnom%20Penh%2C%20Cambodia"
                                target="_blank"
                                rel="noreferrer"
                                className="block border-t border-[#eee4df] px-5 py-3 text-sm font-medium text-[#e94f7d] transition hover:bg-[#fff0f6]" >
                                Open in Google Maps 
                            </a>
                        </div>
                    </section>

                    <section aria-labelledby="contact-form-heading" className="rounded-[28px] border border-[#eee4df] bg-white p-6 shadow-sm sm:p-10" >
                        <h2 id="contact-form-heading" className="text-2xl font-semibold">
                            Send us a message
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-[#817874]">
                            Fill in the details below and your email app will open with your message ready to send.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Your name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        placeholder="Your name"
                                        className="w-full rounded-xl border border-[#eee4df] bg-[#fbf8f5] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa6] focus:border-[#e94f7d] focus:bg-white focus:ring-4 focus:ring-[#e94f7d]/10"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">Email address</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-[#eee4df] bg-[#fbf8f5] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa6] focus:border-[#e94f7d] focus:bg-white focus:ring-4 focus:ring-[#e94f7d]/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">How can we help?</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="6"
                                    required
                                    placeholder="Tell us about your skin, your order or your question..."
                                    className="w-full resize-y rounded-xl border border-[#eee4df] bg-[#fbf8f5] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#b5aaa6] focus:border-[#e94f7d] focus:bg-white focus:ring-4 focus:ring-[#e94f7d]/10"
                                />
                            </div>

                            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e94f7d] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#d93d6c] sm:w-auto" >
                                Send message
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Contact