"use client";

import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Disclosure,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  UserIcon,
  HomeIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { UserCheck2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../img/Aikon-logo.webp";
import axios from "axios";
import { UserContext } from "@/context/AuthContext";
import { Toaster } from "sonner";

// const Categorys = [
//   {
//     name: "Taekwondo",
//     href: "/shop?category=Taekwondo",
//     subcategories: [
//       { name: "Dobok", href: "/shop?category=Taekwondo&sub=Dobok" },
//       { name: "Belts", href: "/shop?category=Taekwondo&sub=Belts" },
//       { name: "Protective Gear", href: "/shop?category=Taekwondo&sub=ProtectiveGear" },
//     ],
//   },
//   {
//     name: "Karate",
//     href: "/shop?category=Karate",
//     subcategories: [
//       { name: "Karate Gi", href: "/shop?category=Karate&sub=KarateGi" },
//       { name: "Gloves", href: "/shop?category=Karate&sub=Gloves" },
//       { name: "Shin Guards", href: "/shop?category=Karate&sub=ShinGuards" },
//     ],
//   },
//   {
//     name: "Judo",
//     href: "/shop?category=Judo",
//     subcategories: [
//       { name: "Judo Gi", href: "/shop?category=Judo&sub=JudoGi" },
//       { name: "Belts", href: "/shop?category=Judo&sub=Belts" },
//       { name: "Mats", href: "/shop?category=Judo&sub=Mats" },
//     ],
//   },
//   {
//     name: "Training Equipment",
//     href: "/shop?category=Training Equipment",
//     subcategories: [
//       { name: "Punching Bags", href: "/shop?category=TrainingEquipment&sub=PunchingBags" },
//       { name: "Speed Balls", href: "/shop?category=TrainingEquipment&sub=SpeedBalls" },
//       { name: "Skipping Ropes", href: "/shop?category=TrainingEquipment&sub=SkippingRopes" },
//     ],
//   },
// ];

/* Desktop Navigation Component */
function DesktopNav() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [Categorys, setCategorys] = useState([]);

  const { user } = useContext(UserContext);

  const getMainCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory?limit=5`,
        {
          withCredentials: true,
        }
      );

      setCategorys(data?.msg);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getMainCategory();
  }, []);
  return (
    <div className="hidden lg:flex lg:gap-x-8">
      <Link
        href="/"
        className="text-sm font-semibold text-gray-900 hover:text-gray-600 flex items-center gap-x-1"
      >
        <HomeIcon className="h-5 w-5" aria-hidden="true" /> Home
      </Link>
      <Link
        href="/shop"
        className="text-sm font-semibold text-gray-900 hover:text-gray-600 flex items-center gap-x-1"
      >
        <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" /> Shop
      </Link>
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
          Category
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </PopoverButton>
        <PopoverPanel className="absolute z-10 mt-3 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          <div className="p-4">
            {Categorys.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(item.name)} // Set hovered category
                onMouseLeave={() => setHoveredCategory(null)} // Reset when mouse leaves
              >
                <Link
                  href={`/shop/maincategory=${item.name}`}
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 rounded-sm shadow-sm"
                >
                  {item.name}
                </Link>

                {/* Subcategory dropdown */}
                {hoveredCategory === item.name && item.subCategory && (
                  <div className="absolute left-full top-0 ml-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                    {item.subCategory.map((sub) => (
                      <Link
                        key={sub.name}
                        href={`/shop/subcategory=${sub.name}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </PopoverPanel>
      </Popover>
      <Link
        href="/about"
        className="text-sm font-semibold text-gray-900 hover:text-gray-600 flex items-center gap-x-1"
      >
        <InformationCircleIcon className="h-5 w-5" aria-hidden="true" /> About
        Store
      </Link>
      <Link
        href="/contact"
        className="text-sm font-semibold text-gray-900 hover:text-gray-600 flex items-center gap-x-1"
      >
        <PhoneIcon className="h-5 w-5" aria-hidden="true" /> Contact
      </Link>
    </div>
  );
}

/* Mobile Navigation Component */
function MobileNav({ onLinkClick }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const [Categorys, setCategorys] = useState([]);

  const { user } = useContext(UserContext);

  const getMainCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory`,
        {
          withCredentials: true,
        }
      );

      setCategorys(data?.msg);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    getMainCategory();
  }, []);
  return (
    <div className="mt-6 space-y-2">
      <Link
        href="/"
        onClick={onLinkClick}
        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
      >
        <HomeIcon className="h-6 w-6" aria-hidden="true" /> Home
      </Link>
      <Link
        href="/shop"
        onClick={onLinkClick}
        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
      >
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" /> Shop
      </Link>
      {Categorys.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setHoveredCategory(item.name)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {/* Category button */}
          <Link
            href={`/shop/${item._id}`}
            className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 rounded-sm shadow-sm"
          >
            {item.name}
          </Link>

          {/* Subcategory dropdown */}
          {hoveredCategory === item.name && item.subCategory && (
            <div className="absolute left-full top-0 ml-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
              {item.subCategory.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.products[0]}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      <Link
        href="/about"
        onClick={onLinkClick}
        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
      >
        <InformationCircleIcon className="h-6 w-6" aria-hidden="true" /> About
        Store
      </Link>
      <Link
        href="/contact"
        onClick={onLinkClick}
        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
      >
        <PhoneIcon className="h-6 w-6" aria-hidden="true" /> Contact
      </Link>

      {/* Icons Section (only for desktop) */}
      <Link
        href="/cart"
        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-5 flex items-center gap-x-2"
      >
        <ShoppingBagIcon className="h-6 w-6" /> Cart
      </Link>
      {!user ? (
        <Link
          href="/account"
          className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-5 flex items-center gap-x-2"
        >
          <UserIcon className="h-6 w-6" /> SignIn
        </Link>
      ) : (
        <Link
          href="/profile"
          className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-5 flex items-center gap-x-2"
        >
          <UserCheck2Icon className="h-6 w-6" /> Profile
        </Link>
      )}
    </div>
  );
}

/* Main Header Component */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <div className="container-fluid">
        <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
            {/* Logo Section */}
            <div className="flex-1">
              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  alt="AIKON SPORTS Logo"
                  width={64}
                  height={64}
                />
                <h3 className="text-black font-semibold text-2xl ml-2">
                  AIKON SPORTS
                </h3>
              </Link>
            </div>

            {/* Mobile Menu Button (visible on mobile) */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Icons Section (only for desktop) */}
            <div className="hidden ml-3 lg:flex lg:space-x-6">
              <Link
                href="/cart"
                className="text-gray-700 hover:text-gray-900 flex items-center gap-x-2"
              >
                <ShoppingBagIcon className="h-6 w-6" /> Cart
              </Link>

              {!user ? (
                <Link
                  href="/account"
                  className="text-gray-700 hover:text-gray-900 flex items-center gap-x-2"
                >
                  <UserIcon className="h-6 w-6" /> SignIn
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-gray-900 flex items-center gap-x-2"
                >
                  <UserCheck2Icon className="h-6 w-6" /> Profile
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Dialog */}
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            {/* Overlay */}
            <div
              className="fixed inset-0 z-50 bg-black/30"
              aria-hidden="true"
            />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src={logo}
                    alt="AIKON SPORTS Logo"
                    width={64}
                    height={64}
                  />
                  <h3 className="text-black font-semibold text-xl ml-2">
                    AIKON SPORTS
                  </h3>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <MobileNav onLinkClick={() => setMobileMenuOpen(false)} />
            </DialogPanel>
          </Dialog>
        </header>
      </div>
    </>
  );
}
