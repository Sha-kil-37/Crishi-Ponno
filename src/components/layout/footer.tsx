"use client";

import Link from "next/link";

//
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
//
const paymentMethod = [
  "BKASH",
  "ROCKET",
  "NAGAD",
  "MASTERCARD",
  "VISACARD",
  "PAYPAL",
];
//
export default function Footer() {
  //
  return (
    <footer className="border-t backdrop-blur-md border-[#dcebdc] pt-8 bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl ">
        <div className="grid grid-cols-5">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className="mb-4 uppercase tracking-[0.16em]">
                {section.title}
              </h5>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="transition hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]">
            Payment methods
          </p>
          <div className="flex items-center gap-2 mt-2">
            {paymentMethod.map((method, i) => (
              <p
                key={i}
                className="rounded border border-slate-300 bg-white px-3 py-1  text-slate-600"
              >
                {method}
              </p>
            ))}
          </div>
          <div className="flex gap-x-4 items-center mt-2 justify-end">
            <Link href={"#"} className="underline">
              Crishi Ponno App
            </Link>
            <Link href="#">Google Play store</Link>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-center">Copyright &copy; 2026 কৃষি পন্য</p>
      </div>
    </footer>
  );
}
