import Link from "next/link";
import React from "react";
import ClientPartOfPage_Form from "./ClientPartOfServerPages/c_page";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
        {/* NEW BADGE */}
        <Link
          href="https://prebuiltui.com"
          target="_blank"
          className="flex items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20"
        >
          <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full">
            NEW
          </span>
          <span className="flex items-center gap-2">
            Try 30 days free trial option
          </span>
        </Link>

        {/* HEADING */}
        <h1 className="text-center text-[40px] leading-12 md:text-6xl md:leading-17.5 mt-4 font-semibold max-w-3xl">
          Turn thoughts into slides instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Create, customize and present faster than ever with intelligent design
          powered by AI.
        </p>

        {/* FORM */}
        <ClientPartOfPage_Form />

        <Link href="/projects">
          <p className="mt-22">ProjectBuilderPage</p>
        </Link>
      </section>
    </>
  );
}
