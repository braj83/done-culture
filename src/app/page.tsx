import RandomQuoteHeader from "@/components/hero/hero";

export default function Home() {
  return (
    <div data-theme="dark">
      <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <RandomQuoteHeader />
      </main>
    </div>
  );
}
