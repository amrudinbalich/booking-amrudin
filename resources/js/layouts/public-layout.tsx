import type { PropsWithChildren } from 'react';
import Navbar from '@/components/public/navbar';
import Footer from '@/components/public/footer';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-svh flex-col bg-[#F7F6F2]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
