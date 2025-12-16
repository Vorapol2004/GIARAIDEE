// app/layout.tsx
'use client';

import { ThemeProvider as CustomThemeProvider } from '@/component/theme/ThemeContext';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Navbar from "@/component/Navbar/Navbar";
import './globals.css';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Use client-side only rendering for dynamic styles
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <html lang="th" suppressHydrationWarning>
        <body
            className="flex flex-col min-h-screen text-[rgb(var(--foreground-rgb))] transition-colors duration-300 ease-in-out"
            style={{
                overflowY: mounted ? (isHomePage ? 'hidden' : 'auto') : 'auto',
                overscrollBehavior: 'contain' // Use the camelCase version for React
            }}
        >
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CustomThemeProvider>
                <Navbar />
                <div
                    className="pt-16 flex-grow flex flex-col"
                    style={{ overflow: mounted && isHomePage ? 'hidden' : 'auto' }}
                >
                    <main
                        className="flex-grow flex flex-col"
                        style={{ overflow: mounted && isHomePage ? 'hidden' : 'auto' }}
                    >
                        {children}
                    </main>
                </div>
            </CustomThemeProvider>
        </NextThemeProvider>
        </body>
        </html>
    );
}