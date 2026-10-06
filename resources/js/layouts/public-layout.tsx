import PublicSimpleLayout from "./public/public-simple-layout";

export default function PublicLayout({ 
    title, 
    children
}: { 
    title: string,
    children: React.ReactNode
}) {
    return (
        <PublicSimpleLayout title={title}>
            { children }
        </PublicSimpleLayout>
    );
}