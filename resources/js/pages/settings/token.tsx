import { Head } from "@inertiajs/react";
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

type Props = {
    hasToken: boolean;
    plainTextToken?: string;
}

export default function Token( 
    { hasToken, plainTextToken }: Props
) {
    
    const [ showGenerateForm, setShowGenerateForm ] = useState<boolean>(false);

    // console.log(hasToken, showGenerateForm);

    return (
        <>
            <Head title="Access Token" />

            <div className="space-y-6">

                <Heading
                    variant="small"
                    title="Access Token"
                    description="Create an API key to securely integrate with third-party applications and services."
                />

                <GeneratedTokenDisplay plainTextToken={plainTextToken ?? '283523582352-5rRNNNKKNNKN'} />


                {/* STANJE 2: token upravo generisan — prikaži ga jednom, pa gotovo */}
                {plainTextToken && (

                    <></>

                    // <GeneratedTokenDisplay />

                    // <div>
                    //     <h1>Token:</h1>

                    //     <span className="text-secondary">{plainTextToken}</span>

                    //     <br />

                    //     <Input type="text" defaultValue={plainTextToken} disabled />

                    //                                                 {/* ovdje ide: veliko polje sa tokenom + Copy dugme + upozorenje
                    //        "save this now, won't be shown again" */}

                    // </div>

                )}

                {/* STANJE 3: token postoji, ali nije upravo generisan — meta podaci, bez samog tokena */}
                {hasToken && !plainTextToken && !showGenerateForm && (
                    <div>
                        {/* ovdje ide: "Token created on ..." + Regenerate dugme (sa AlertDialog potvrdom)
                           Regenerate dugme → setShowGenerateForm(true) ili direktno regeneriše */}
                    </div>
                )}

                {/* STANJE 1: nema tokena — prazan state + dugme koje otvara formu */}
                {!hasToken && !showGenerateForm && !plainTextToken && (
                    <div>
                        No token, empty state.

                        <p>
                            <Button onClick={() => setShowGenerateForm(!showGenerateForm)}>Generate Token</Button>
                        </p>
                        
                        {/* "No active token." + <Button onClick={() => setShowGenerateForm(true)}>Generate token</Button> */}
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
                    >
                        {({ errors, processing, wasSuccessful }) => (
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

                                    <Button 
                                        disabled={processing}
                                        data-test="generate-token-button"
                                    >
                                        {processing ? 'Generating...' : 'Generate'}
                                    </Button>
                                </FieldGroup>

                                {wasSuccessful && <GeneratedTokenDisplay plainTextToken={plainTextToken ?? '283523582352-5rRNNNKKNNKN'} />}
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