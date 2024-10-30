'use client'; // Ensure this is at the top

import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Provider from '@/redux/provider';
import { Footer, Navbar } from '@/components/common';
import { Setup } from '@/components/utils';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    
    // Define the routes where Navbar and Footer should not be shown
    const noNavFooterRoutes = ['/auth/login', '/auth/register'];

    // Conditional logic for showing the Navbar and Footer
    const showNavFooter = !noNavFooterRoutes.includes(pathname);

    return (
        <html lang='en'>
            <body className={inter.className}>
                <Provider>
                    <Setup />
                    {/* Conditionally render the Navbar and Footer */}
                    {showNavFooter && <Navbar />}
                    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8'>
                        {children}
                    </div>
                    {showNavFooter && <Footer />}
                </Provider>
            </body>
        </html>
    );
}
