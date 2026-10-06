import { Link } from '@inertiajs/react';
import { login, register } from '@/routes';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#16233F]">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="font-serif text-xl font-semibold text-[#F7F6F2]">
                    BookApp
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link href="/explore" className="text-sm text-[#F7F6F2]/80 transition hover:text-[#F7F6F2]">
                        Explore stays
                    </Link>
                    <Link href="/host" className="text-sm text-[#F7F6F2]/80 transition hover:text-[#F7F6F2]">
                        Become a host
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href={login()}
                        className="text-sm text-[#F7F6F2]/80 transition hover:text-[#F7F6F2]"
                    >
                        Log in
                    </Link>
                    <Link
                        href={register()}
                        className="rounded-md bg-[#D9A441] px-4 py-2 text-sm font-medium text-[#16233F] transition hover:bg-[#D9A441]/90"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
}
