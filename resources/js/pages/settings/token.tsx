import { Head, usePage, router } from "@inertiajs/react";
import { index as showToken } from '@/routes/token';
import Heading from "@/components/heading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Form } from "@inertiajs/react";
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

import TokenController from '@/actions/App/Http/Controllers/Settings/TokenController';
import GeneratedTokenDisplay from "@/components/generated-token";

import {
    Field,
    FieldDescription,
    // FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge"
import { token } from "@/routes/sanctum";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
    hasToken: boolean;
    tokenName: string;
    active: boolean;
    // plainTextToken?: string;
}

export default function Token( 
    { hasToken, tokenName, active }: Props
) {
    const { flash } = usePage();
    const plainTextToken = flash.plainTextToken || '';
    const [ showGenerateForm, setShowGenerateForm ] = useState<boolean>(false);

    const tokenExistsFromBefore = hasToken && !plainTextToken;

    console.log('pttoken->', plainTextToken);

    return (
        <>
            <Head title="Access Token" />

            <div className="space-y-6">

                <Heading
                    variant="small"
                    title="Access Token"
                    description="Create an API key to securely integrate with third-party applications and services."
                />

                {/* STANJE 1: nema tokena — prazan state + dugme koje otvara formu */}
                {!hasToken && !showGenerateForm && !plainTextToken && (
                    <div className="rounded-lg border border-dashed p-6 text-center">

                        <p className="text-sm text-muted-foreground">
                            You don't have an active access token yet.
                        </p>
                        <Button className="mt-4" onClick={() => setShowGenerateForm(true)}>
                            Generate token
                        </Button>

                    </div>
                )}

                {/* STATE 2: Token is just being generated. */}
                {plainTextToken && <GeneratedTokenDisplay plainTextToken={plainTextToken} />}

                {/* STANJE 3: token postoji, ali nije upravo generisan */}
                {tokenExistsFromBefore && !showGenerateForm && (
                <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-sm font-medium">{tokenName}</p>
                            <Badge variant={active ? 'default' : 'destructive'}>
                                {active ? 'Active' : 'Expired'}
                            </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Regenerating will revoke the current token. Anything using it will stop working.
                        </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                        <Button variant="outline" onClick={() => setShowGenerateForm(true)}>
                            Regenerate
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                    Revoke
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Revoke this token?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Anything using <span className="font-mono">{tokenName}</span> will
                                        stop working immediately. This can't be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        // className="bg-destructive text-white hover:bg-destructive/90"
                                        onClick={() => router.delete(TokenController.destroy.url())}
                                    >
                                        Revoke token
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                )}

                {/* FORMA — pojavljuje se samo kad je showGenerateForm true,
                    bilo iz stanja 1 (prvi put) ili stanja 3 (regenerate) */}
                {showGenerateForm && (
                    <Form 
                        id="token-form" 
                        method="POST" 
                        action={TokenController.generate.url()}
                        resetOnSuccess
                        onSuccess={() => setShowGenerateForm(false)}
                    >
                        {({ errors, processing, reset }) => (
                            <>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="token_name">Token name</Label>
                                        <Input id="token_name" name="token_name" type="text" placeholder="my-token" />
                                        <InputError message={errors.token_name} />

                                        <FieldDescription>
                                            Keep token names in a lowercase dash format like: my-token, company-token, acme-company-token.
                                        </FieldDescription>
                                    </Field>

                                    <div className="flex justify-end gap-2">

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                reset();
                                                setShowGenerateForm(false);
                                            }}
                                            >
                                                Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            data-test="generate-token-button"
                                        >
                                            {processing ? 'Generating...' : 'Generate'}
                                        </Button>

                                    </div>

                                </FieldGroup>

                            </>
                        )}
                    </Form>
                )}


            </div>
        </>
    );
}

Token.layout = {
    breadcrumbs: [
        {
            title: 'Access Token',
            href: showToken(),
        },
    ],
};