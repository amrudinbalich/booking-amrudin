import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, Check, Copy, CopyIcon, Eye, EyeIcon, EyeOff } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Field, FieldGroup } from "@/components/ui/field";

import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

import { 
    Alert, 
    AlertDescription, 
    AlertTitle 
} from "@/components/ui/alert";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { toast } from "sonner";

type GeneratedTokenProps = {
    plainTextToken: string;
}

export default function GeneratedTokenDisplay({ plainTextToken }: GeneratedTokenProps) {
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);

    const copyAction = async () => {
        try {
            await navigator.clipboard.writeText(plainTextToken);
            toast.success('Token copied.', { position: 'top-center' });
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy token.', { position: 'top-center' });
        }
    };

    useEffect(() => {
        plainTextToken && setDialogOpen(true);
    }, [plainTextToken]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your access token</DialogTitle>
                    <DialogDescription>
                        Copy it now — for security reasons, you won't be able to see it again.
                    </DialogDescription>
                </DialogHeader>

                <Field orientation="horizontal">
                    <Label htmlFor="token" className="sr-only">Access token</Label>
                    <Input id="token" defaultValue={plainTextToken} readOnly />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={copyAction}>
                                <CopyIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy</TooltipContent>
                    </Tooltip>
                </Field>

                <Alert variant="default">
                    <AlertCircleIcon />
                    <AlertTitle>Store it somewhere safe</AlertTitle>
                    <AlertDescription>
                        Treat this like a password. Anyone with this token has full access to your account via the API.
                    </AlertDescription>
                </Alert>
            </DialogContent>
        </Dialog>
    );

}