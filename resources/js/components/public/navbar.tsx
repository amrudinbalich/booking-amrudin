import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

const navLinks = [
    { label: 'Explore stays', href: '/explore' },
    { label: 'Become a host', href: '/host' },
];

export function Navbar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const { url } = page;

    const [open, setOpen] = useState(false);

    const linkClass = (href: string) =>
        `text-sm transition ${
            url.startsWith(href)
                ? 'text-[#D9A441]'
                : 'text-[#F7F6F2]/80 hover:text-[#F7F6F2]'
        }`;

    const ctaClass =
        'rounded-md bg-[#D9A441] px-4 py-2 text-center text-sm font-medium text-[#16233F] transition hover:bg-[#D9A441]/90';

    const authActions = auth.user ? (
        <>
            <span className="hidden size-8 items-center justify-center rounded-full bg-white/10 text-sm text-[#F7F6F2] md:flex">
                {auth.user.name.charAt(0).toUpperCase()}
            </span>
            <Link href={dashboard()} className={ctaClass}>
                Dashboard
            </Link>
        </>
    ) : (
        <>
            <Link href={login()} className="text-sm text-[#F7F6F2]/80 transition hover:text-[#F7F6F2]">
                Log in
            </Link>
            <Link href={register()} className={ctaClass}>
                Sign up
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#16233F]">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="font-serif text-xl font-semibold text-[#F7F6F2]">
                    BookApp
                </Link>

                {/* Desktop links */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop auth */}
                <div className="hidden items-center gap-3 md:flex">{authActions}</div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    className="rounded-md p-2 text-[#F7F6F2] md:hidden"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {/* Mobile panel */}
            {open && (
                <div className="border-t border-white/10 md:hidden">
                    <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={linkClass(link.href)}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div
                            className="flex flex-col gap-3 border-t border-white/10 pt-4"
                            onClick={() => setOpen(false)}
                        >
                            {authActions}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;