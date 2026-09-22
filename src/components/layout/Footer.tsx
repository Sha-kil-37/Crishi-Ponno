"use client";

import Link from "next/link";

const footerLinks = [
  {
    title: "About Crishi Ponno",
    links: [
      "Why choose Crishi Ponno",
      "Co-Create Pitch",
      "Corporate responsibility",
      "Careers",
    ],
  },
  {
    title: "Help Center",
    links: [
      "Buyer Help Center",
      "Live chat",
      "File a trade dispute",
      "Refunds",
      "Report IP infringement",
      "Report a violation",
    ],
  },
  {
    title: "Order protections",
    links: [
      "Secure payments",
      "Money-back guarantee",
      "Guaranteed on-time delivery",
      "After-sales protections",
      "Production monitoring & inspection services",
      "Policies and rules",
    ],
  },
  {
    title: "Sell on Crishi Ponno",
    links: [
      "Sell on Crishi Ponno",
      "Start selling",
      "Check order status",
      "Become a Verified Supplier",
      "Partnerships",
    ],
  },
  {
    title: "Source on Crishi Ponno",
    links: ["Verified manufacturers", "Request for Quotation"],
  },
];

const paymentMethod = [
  "BKASH",
  "ROCKET",
  "NAGAD",
  "MASTERCARD",
  "VISACARD",
  "PAYPAL",
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#dcebdc] bg-[#0f2f26] text-[#ecf7f1]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2.2fr] lg:items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f6eb] text-xl font-black text-[#0f2f26] shadow-sm">
                C
              </div>
              <div>
                <p className="text-lg font-bold tracking-[0.14em] text-[#dff5e5]">
                  CRISHI PONNO
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#9fc8b3]">
                  Smart sourcing
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#cfe6d7]">
              Connecting trusted agricultural products, suppliers, and buyers
              across Bangladesh with secure transactions and dependable service.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#"
                className="rounded-full border border-[#5ea57a] bg-[#173f35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ecf7f1] transition hover:border-[#84d8a0] hover:bg-[#1d4f42]"
              >
                Crishi Ponno App
              </Link>
              <Link
                href="#"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ecf7f1] transition hover:bg-white/10"
              >
                Google Play Store
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#a9d9b6]">
                  {section.title}
                </h5>
                <ul className="space-y-3 text-sm text-[#dcefe3]">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        className="transition-colors duration-200 hover:text-white hover:underline"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a9d9b6]">
                Payment methods
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {paymentMethod.map((method, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-[#ecf7f1]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#dcefe3]">
              <Link
                href="#"
                className="transition hover:text-white hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="transition hover:text-white hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="transition hover:text-white hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-[#cfe6d7] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 কৃষি পন্য. All rights reserved.</p>
          <p>Built for smarter, safer agricultural sourcing.</p>
        </div>
      </div>
    </footer>
  );
}
