import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface BackButtonProps {
    href: string;
    name?: string;
    className?: string;
}

export function BackButton({ href, name = 'Back', className = '' }: BackButtonProps) {
    return (
        <Link
            href={href}
            className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} gap-1.5 text-muted-foreground hover:text-foreground ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            <span>{name}</span>
        </Link>
    );
}