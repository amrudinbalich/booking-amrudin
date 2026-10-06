import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/layouts/public/navbar';
import { Footer } from '@/layouts/public/footer';

export default function Home() {
    return (
        <>

            <main className="flex-1">
                <section className="bg-[#16233F] px-4 py-24 sm:px-6 sm:py-32">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="max-w-2xl font-serif text-5xl leading-tight text-[#F7F6F2] sm:text-6xl">
                            Find your next stay
                        </h1>
                        <p className="mt-6 max-w-md text-lg text-[#F7F6F2]/70">
                            Hand-picked places to stay, booked directly with people who
                            live there.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/explore"
                                className="rounded-md bg-[#D9A441] px-6 py-3 text-sm font-medium text-[#16233F] transition hover:bg-[#D9A441]/90"
                            >
                                Start exploring
                            </Link>
                            <Link
                                href="/host"
                                className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-[#F7F6F2] transition hover:bg-white/5"
                            >
                                List your place
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F7F6F2] px-4 py-20 sm:px-6">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="font-serif text-3xl text-[#16233F]">
                            A different kind of stay
                        </h2>
                        <p className="mt-3 max-w-md text-[#5B6472]">
                            No chains, no lobbies. Every listing is run by the person
                            who owns it.
                        </p>
                    </div>
                </section>
            </main>

        </>
    );
}