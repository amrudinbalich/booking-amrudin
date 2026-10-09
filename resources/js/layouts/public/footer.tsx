import { Link } from '@inertiajs/react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#16233F] text-[#F7F6F2]">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <div className="col-span-2 sm:col-span-1">
                        <span className="font-serif text-lg font-semibold">BookApp</span>
                        <p className="mt-2 text-sm text-[#F7F6F2]/60">
                            Stays worth remembering.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-[#F7F6F2]/90">Explore</span>
                        <Link href="/explore" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            Browse stays
                        </Link>
                        <Link href="/host" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            Become a host
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-[#F7F6F2]/90">Company</span>
                        <Link href="/about" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            Contact
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-[#F7F6F2]/90">Legal</span>
                        <Link href="/terms" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-sm text-[#F7F6F2]/60 hover:text-[#F7F6F2]">
                            Privacy
                        </Link>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[#F7F6F2]/50">
                    © {new Date().getFullYear()} BookApp. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
