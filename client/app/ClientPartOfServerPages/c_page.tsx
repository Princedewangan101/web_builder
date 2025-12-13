"use client";

import { Loader2 } from "lucide-react";
import React from "react";

const ClientPartOfPage_Form = () => {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => { 
        setLoading(false)
     },3000)
  };
  return (
    <>
      {/* FORM */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/2 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 ring-indigo-500 focus-within:ring-2 transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Describe your presentation in details"
          className="bg-transparent outline-none text-gray-300 resize-none w-full"
          required
        />

        <button className="ml-auto flex items-center gap-2 bg-linear-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
          {!loading ? "Create with AI" : (
            <>
            Creating  <Loader2 className="animate-spin size-4 text-white"/>
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default ClientPartOfPage_Form;
