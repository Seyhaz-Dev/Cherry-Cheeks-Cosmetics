import { Mail, MapPin, Phone } from 'lucide-react'

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
        <main className="bg-[#fbf8f5] px-5 pb-20 pt-28 sm:px-8 sm:pt-20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-2xl sm:mb-15">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#b34467]">
                        Cherry Cheeks customer care
                    </p>
                    <h1 className="mb-3text-4xl font-semibold leading-tight text-[#3b1725] sm:text-5xl">
                        Let’s talk skincare.
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-[#6c5b61] sm:text-lg">
                        Questions about your routine, an order, or one of our products? Send us a note and we’ll be glad to help.
                    </p>
                </div>

                <div className="grid overflow-hidden rounded-lg border border-[#eadde2] md:grid-cols-[0.8fr_1.2fr]">
                    <section className="bg-[#fbf4f6] px-6 py-8 sm:px-9 sm:py-10" aria-labelledby="contact-details-heading">
                        <h2 id="contact-details-heading" className="mb-3 text-xl font-semibold text-[#3b1725]">
                            Get in touch
                        </h2>
                        <p className="mb-9 max-w-sm text-sm leading-6 text-[#6c5b61]">
                            Our team is here to make finding your feel-good routine a little easier.
                        </p>

                        <address className="space-y-7 not-italic">
                            <a href="mailto:cherrycheeks@gmail.com" className="group flex items-start gap-4 text-[#3b1725]">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#b34467] ring-1 ring-[#eadde2]">
                                    <Mail size={18} aria-hidden="true" />
                                </span>
                                <span className="min-w-0 pt-0.5">
                                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#806e75]">Email</span>
                                    <span className="break-all text-sm font-medium group-hover:text-[#b34467]">cherrycheeks@gmail.com</span>
                                </span>
                            </a>

                            <a href="tel:+855962221351" className="group flex items-start gap-4 text-[#3b1725]">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#b34467] ring-1 ring-[#eadde2]">
                                    <Phone size={18} aria-hidden="true" />
                                </span>
                                <span className="pt-0.5">
                                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#806e75]">Phone</span>
                                    <span className="text-sm font-medium group-hover:text-[#b34467]">+855 96 222 1351</span>
                                </span>
                            </a>

                            <div className="flex items-start gap-4 text-[#3b1725]">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#b34467] ring-1 ring-[#eadde2]">
                                    <MapPin size={18} aria-hidden="true" />
                                </span>
                                <span className="pt-0.5">
                                    <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#806e75]">Location</span>
                                    <span className="text-sm font-medium">Phnom Penh, Cambodia</span>
                                </span>
                            </div>
                        </address>
                    </section>

                    <section className="bg-white px-6 py-8 rounded-lg sm:px-9 sm:py-10" aria-labelledby="contact-form-heading">
                        <h2 id="contact-form-heading" className="mb-2 text-xl font-semibold text-[#3b1725]">
                            Send us a message
                        </h2>
                        <p className="mb-7 text-sm leading-6 text-[#6c5b61]">
                            Fill in the details below and your email app will open with your message ready to send.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[#3b1725]">Your name</label>
                                <input id="contact-name" name="name" type="text" autoComplete="name" required
                                    className="w-full rounded-md border border-[#dfd2d8] bg-white px-3.5 py-3 text-sm text-[#3b1725] outline-none transition placeholder:text-[#9a8990] focus:border-[#b34467] focus:ring-2 focus:ring-[#b34467]/15" />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[#3b1725]">Email address</label>
                                <input id="contact-email" name="email" type="email" autoComplete="email" required
                                    className="w-full rounded-md border border-[#dfd2d8] bg-white px-3.5 py-3 text-sm text-[#3b1725] outline-none transition placeholder:text-[#9a8990] focus:border-[#b34467] focus:ring-2 focus:ring-[#b34467]/15" />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[#3b1725]">How can we help?</label>
                                <textarea id="contact-message" name="message" rows="5" required
                                    className="w-full resize-y rounded-md border border-[#dfd2d8] bg-white px-3.5 py-3 text-sm leading-6 text-[#3b1725] outline-none transition placeholder:text-[#9a8990] focus:border-[#b34467] focus:ring-2 focus:ring-[#b34467]/15" />
                            </div>

                            <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#a9365b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#872747] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a9365b] focus-visible:ring-offset-2 sm:w-auto">
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
