'use client'

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react'
import Link from "next/link";

const quotes = [
  "There are three states of being. Not knowing, action and completion.",
  "Accept that everything is a draft. It helps to get it done.",
  "There is no editing stage.",
  "Pretending you know what you're doing is almost the same as knowing what you are doing.",
  "Banish procrastination. If you wait more than a week to get an idea done, abandon it.",
  "The point of being done is not to finish but to get other things done.",
  "Once you're done you can throw it away.",
  "Laugh at perfection. It's boring and keeps you from being done.",
  "People without dirty hands are wrong. Doing something makes you right.",
  "Failure counts as done. So do mistakes.",
  "Destruction is a variant of done.",
  "If you have an idea and publish it on the internet, that counts as a ghost of done.",
  "Done is the engine of more"
]

export default function RandomQuoteHeader() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return <div className="relative min-h-dvh flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,background,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          {quote}
        </h1>
        <Link href="mailto:hello@doneculture.com" className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 hover:underline mt-24 inline-block" >
          hello@doneculture.com
        </Link>
      </div>
    </div>
}