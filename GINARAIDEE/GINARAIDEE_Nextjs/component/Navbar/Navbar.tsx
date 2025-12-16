"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BiLogoGoogle } from "react-icons/bi";
import { useState, useEffect } from "react";
import ThemeToggle from "@/component/theme/ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const roomCode = searchParams.get("roomCode") || "default";

    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const menuItems = [
        { label: "สร้างห้อง", href: "/rooms/create" },
        { label: "เข้าร่วมห้อง", href: `/rooms/${roomCode}/join` },
        { label: "เกี่ยวกับ", href: "/rooms/about" },
    ];

    return (
        <nav className={`bg-white dark:bg-gray-900 shadow-xl border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ${
            visible ? "translate-y-0" : "-translate-y-full"
        }`}>
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* โลโก้ */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-orange-400 rounded-full flex items-center justify-center">
                        <BiLogoGoogle className="text-3xl text-white" />
                    </div>
                    <span className="text-xl font-bold text-orange-400">GINARAIDEE</span>
                </Link>

                {/* ปุ่ม hamburger สำหรับมือถือ */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <FiX className="text-2xl text-gray-700 dark:text-gray-300" />
                        ) : (
                            <FiMenu className="text-2xl text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>

                {/* เมนู desktop */}
                <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-300 font-medium">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="relative px-1 py-2 hover:text-orange-500 transition-colors duration-200">
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-1 h-[3px] bg-orange-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <ThemeToggle />
                </div>
            </div>

            {/* เมนูมือถือ */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden flex flex-col items-center justify-center px-6 py-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium border-t border-gray-200 dark:border-gray-700 space-y-4"
                >
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative py-2 hover:text-orange-500 transition-colors duration-200 text-center w-full"
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 bottom-0 h-[3px] bg-orange-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <div className="pt-2">
                        <ThemeToggle />
                    </div>
                </motion.div>
            )}
        </nav>
    );
}


//npm install framer-motion เพิ่มเติม
//npm install react-icons
//npm install aos
//npm install next-themes