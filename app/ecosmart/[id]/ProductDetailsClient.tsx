"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import ProductDetails from "../ProductDetails";
import Image from "next/image";

export default function ProductDetailsClient({ product, alternatives }) {
  const router = useRouter();
  const { logout } = useAuth();
  const { totalItems, clearCart } = useCart();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("amazon-green-user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      }
    }
  }, []);

  const handleAmazonGreen = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("amazon-green-user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.type === "customer") {
          router.push("/customer/dashboard");
          return;
        } else if (user.type === "seller") {
          router.push("/seller/dashboard");
          return;
        }
      }
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Greeting Strip */}
      <div className="w-full bg-[#232f3e] text-white text-sm">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-4 py-3 gap-4">
          <span>Hello, {userName ?? "Guest"}</span>
          <button
            onClick={() => { logout(); clearCart(); }}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-white text-xs font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
      {/* Amazon-style Header */}
      <header className="bg-[#131921] text-white py-2 sticky top-0 z-40 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl" role="img" aria-label="cart">🛒</span>
            <span className="text-2xl font-bold cursor-pointer hover:text-orange-300 transition-colors select-none" onClick={() => router.push("/")}>amazon</span>
          </div>
          {/* Search bar */}
          <div className="flex-grow mx-2 max-w-2xl">
            <div className="relative flex rounded-lg overflow-hidden">
              {/* Filter Dropdown */}
              <button className="flex items-center px-4 py-3 bg-gray-200 text-black font-normal text-base rounded-l-lg border-r border-gray-300 focus:outline-none">
                Select Category
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search Amazon"
                className="flex-grow px-4 py-3 text-gray-700 text-base font-normal focus:outline-none bg-white"
                style={{ minWidth: 0 }}
              />
              <button className="px-6 bg-[#ff9900] hover:bg-[#f3a847] text-black text-lg rounded-r-lg transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          {/* Right section */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Prime Button */}
            <button
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow"
              style={{ fontSize: '1rem' }}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01z" />
              </svg>
              Prime
            </button>
            <button
              className="relative flex items-center hover:text-orange-300 transition-colors"
              onClick={() => router.push("/cart")}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1.5" fill="currentColor" />
                <circle cx="17" cy="21" r="1.5" fill="currentColor" />
                <path d="M3 3h2l.4 2M7 6h13l-1.5 9H7.5L7 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="absolute -top-1 -right-1 text-xs bg-[#febd69] text-black px-1.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-orange-300 transition-colors"
              onClick={() => router.push('/customer/dashboard')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Account
            </button>
          </div>
        </div>
      </header>
      {/* Category Navigation Strip */}
      <nav className="w-full bg-[#232f3e] text-white text-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto px-4 py-3">
          <button
            className="flex items-center gap-1 hover:text-orange-300 transition-colors font-semibold"
            onClick={() => router.push("/ecosmart")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
            Home
          </button>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Electronics</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Books</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Fashion</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Home & Kitchen</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Toys</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Sports</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">More</span>
          <button
            onClick={handleAmazonGreen}
            className="ml-auto bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition text-white text-sm font-semibold shadow"
          >
            🌱 AmazonGreen
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        <ProductDetails
          product={product}
          onClose={() => router.push("/ecosmart")}
          fullPage={true}
          recommendations={
            alternatives.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-4 text-green-800">Sustainable Alternatives from Amazon Green</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {alternatives.map((alt) => (
                    <div key={alt.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                      <img src={alt.image} alt={alt.name} width={100} height={100} className="object-contain mb-2 rounded" />
                      <h4 className="font-semibold text-gray-900 text-center mb-1 text-sm line-clamp-2">{alt.name}</h4>
                      <div className="text-green-700 font-bold mb-2">₹{alt.price}</div>
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => router.push(`/product/${alt.id}`)}
                      >
                        View Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        />
      </main>

      {/* Minimal Footer */}
      <footer className="w-full bg-[#232f3e] text-white mt-12 py-6 text-center text-sm">
        <div className="font-bold text-lg mb-1">amazon</div>
        <div>© 2024, Amazon.com, Inc. or its affiliates</div>
      </footer>
    </div>
  );
} 