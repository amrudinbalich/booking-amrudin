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

    plainTextToken = '283523582352-5rRNNNKKNNKN';

    /*

        use case:

        if plain token exists upon form submission,
        automatically trigger the dialog..

    */

    const [ showToken, setShowToken ] = useState<boolean>(false);
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);
    const [ copied, setCopied ] = useState<boolean>(false);

    const showAction = () => {
        setShowToken(!showToken);
    };

    const copyAction = () => {
        console.log('');
        toast.info('Token copied.', { position: 'top-center' });
    };

    useEffect(() => { plainTextToken && setDialogOpen(true); }, [plainTextToken]);

    return (
        <>

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

                        <Button variant="outline" size="icon" onClick={() => copyAction()}>

                            <Tooltip>
                                <TooltipTrigger>
                                    <CopyIcon />
                                </TooltipTrigger>
                                <TooltipContent>Copy</TooltipContent>
                            </Tooltip>

                        </Button>
                    </Field>

                    <Alert variant="default">
                        <AlertCircleIcon />
                        <AlertTitle>Store it somewhere safe</AlertTitle>
                        <AlertDescription>
                            Treat this like a password. Anyone with this token has full access to your account via the API.
                        </AlertDescription>
                    </Alert>

                    {/* Utils */}
                    <Tooltip>
                        {/* <TooltipTrigger render={<B}></TooltipTrigger> */}
                    </Tooltip>

                </DialogContent>
            </Dialog>
        
            <div>

                <Label>
                    Token
                    <Input type={showToken ? 'text' : 'password'} value={plainTextToken} readOnly />
                </Label>

                {/* Show button */}
                <Button title={showToken ? 'Hide' : 'Show'} variant="ghost" size="icon" onClick={() => showAction()}>
                    {showToken ? <EyeOff />: <EyeIcon />}
                </Button>

                {/* Copy Button */}
                <Button variant="ghost" size="icon" onClick={() => copyAction()}>
                    <CopyIcon />
                </Button>

            </div>
        
        </>
    );

}