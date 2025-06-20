import { useRouter, useParams } from "next/navigation"
import ProductDetails from "../ProductDetails"
import { useMemo } from "react"
import { allProducts } from "@/lib/products-data"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import { useEffect, useState } from "react"
import ProductDetailsClient from "./ProductDetailsClient"

const products = [
  {
    id: 1,
    name: "Sony WH-1000XM4 Wireless Industry Leading Noise Canceling Overhead Headphones",
    price: 299.99 * 83,
    originalPrice: 349.99 * 83,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    badge: "Amazon's Choice",
    discount: "14% off",
    category: "electronics",
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charge (10 min charge for 5 hours of playback). Touch sensor controls to pause play skip tracks, control volume, activate your voice assistant, and answer phone calls. Speak-to-chat technology automatically reduces volume during conversations.",
    features: [
      "Industry-leading noise canceling with Dual Noise Sensor technology",
      "Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo",
      "Up to 30-hour battery life with quick charge (10 min charge for 5 hours of playback)",
      "Touch sensor controls to pause play skip tracks, control volume, activate your voice assistant, and answer phone calls",
      "Speak-to-chat technology automatically reduces volume during conversations",
      "Superior call quality with precise voice pickup",
      "Wearing detection pauses playback when headphones are removed",
    ],
    specifications: {
      "Battery Life": "30 hours (NC ON), 38 hours (NC OFF)",
      "Bluetooth Version": "Bluetooth 5.0",
      "Weight": "254g",
      "Charging Time": "3 hours (full charge)",
      "Quick Charge": "10 min charge for 5 hours playback",
      "Water Resistance": "No",
      "Driver Unit": "40mm dome type",
      "Frequency Response": "4 Hz-40,000 Hz"
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 5G Android Smartphone 128GB Unlocked Phantom Gray",
    price: 699.99 * 83,
    originalPrice: 799.99 * 83,
    image: "https://m.media-amazon.com/images/I/91iwO+XKsVL.jpg",
    badge: "Best Seller",
    discount: "13% off",
    category: "electronics",
    description:
      "The Samsung Galaxy S21 features a stunning 6.2-inch Dynamic AMOLED display, powerful Snapdragon 888 processor, and a versatile triple camera system. Experience the power of Galaxy with advanced pro-grade camera, all-day intelligent battery, and hyperfast processing speed.",
    features: [
      "6.2-inch Dynamic AMOLED 2X display with 120Hz refresh rate",
      "Snapdragon 888 5G Mobile Platform",
      "Pro-grade triple camera system with 64MP telephoto lens",
      "5G and Wi-Fi 6E capable for ultra-fast connectivity",
      "All-day intelligent battery with fast wireless charging",
      "Water resistant design (IP68)",
      "Samsung Knox security platform",
    ],
    specifications: {
      "Display": "6.2-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 888 5G",
      "RAM": "8GB",
      "Storage": "128GB",
      "Battery": "4000mAh",
      "Camera": "64MP + 12MP + 12MP",
      "Front Camera": "10MP",
      "Water Resistance": "IP68"
    },
  },
  {
    id: 3,
    name: "HP Pavilion 15.6 inch FHD Laptop, AMD Ryzen 5, 8GB RAM, 256GB SSD",
    price: 599.49 * 83,
    originalPrice: 699.99 * 83,
    image: "https://m.media-amazon.com/images/I/71lWuRFiCoL._UF1000,1000_QL80_.jpg",
    discount: "14% off",
    category: "electronics",
    description:
      "Powerful performance meets sleek design with the HP Pavilion laptop. Perfect for work, entertainment, and everything in between. Features AMD Ryzen processor, full HD display, and fast SSD storage.",
    features: [
      "AMD Ryzen 5 processor for responsive performance",
      "15.6-inch Full HD IPS micro-edge display",
      "8GB DDR4 RAM for smooth multitasking",
      "256GB PCIe NVMe M.2 SSD storage",
      "Windows 11 Home pre-installed",
      "HP Fast Charge technology",
      "Dual speakers tuned by B&O",
    ],
    specifications: {
      "Processor": "AMD Ryzen 5 5500U",
      "Display": "15.6-inch Full HD (1920 x 1080)",
      "RAM": "8GB DDR4-3200 SDRAM",
      "Storage": "256GB PCIe NVMe M.2 SSD",
      "Graphics": "AMD Radeon Graphics",
      "OS": "Windows 11 Home",
      "Battery": "Up to 8 hours",
      "Weight": "3.86 lbs"
    },
  },
  {
    id: 4,
    name: "Regular Cotton T-Shirt - Classic Fit",
    price: 1299,
    originalPrice: 1499,
    image: "https://fullyfilmy.in/cdn/shop/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1747992993",
    badge: undefined,
    discount: "13% off",
    category: "clothing",
    description:
      "A classic fit, regular cotton t-shirt. Soft, comfortable, and perfect for everyday wear. Not made with organic or sustainable materials.",
    features: [
      "100% regular cotton",
      "Classic fit",
      "Available in multiple colors",
      "Machine washable",
      "Durable and comfortable",
      "No special certifications",
      "Standard packaging"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Classic",
      "Colors": "White, Black, Blue, Red",
      "Sizes": "S, M, L, XL, XXL",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in India",
      "Sustainability": "None"
    },
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);
  const alternatives = useMemo(() => {
    if (product?.id === 4) {
      // Add the sustainable alternative for the t-shirt
      return [
        {
          id: 1,
          name: "Organic Cotton T-Shirt - Sustainable Fashion",
          price: 699,
          image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
        },
      ];
    }
    return allProducts
      .filter((p) => p.category && product && p.category.toLowerCase() === (product.category?.toLowerCase() || "") && p.name !== product.name)
      .slice(0, 3);
  }, [product]);
  return (
    <ProductDetailsClient product={product} alternatives={alternatives} />
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const product = products.find((p) => p.id === id)
  return {
    title: product ? `${product.name} | AmazonGreen` : 'Product | AmazonGreen',
    description: product ? product.description : 'Product details on AmazonGreen',
  }
}
