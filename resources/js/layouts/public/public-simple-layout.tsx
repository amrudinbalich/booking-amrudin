import { Head } from "@inertiajs/react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export default function PublicSimpleLayout({ title, children } : { title: string, children: React.ReactNode }) {

    const headTitle = title ?? 'BookApp — Stays worth remembering';

    return (
        <>

            <Head title={headTitle} />

            <div className="flex min-h-svh flex-col">

                <Navbar />

                    { children }

                <Footer />

            </div>

        </>
    );
}