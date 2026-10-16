import { Form } from "@inertiajs/react";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react";

// import { token } from "App/Http/Controllers/Settings/SecurityController";
// import settings from "@/routes/settings";

import security from "@/routes/security";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';

import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export type Props = {
    apiKey: string;
};

type ExpireDays = {
    label: string;
    value: string;
};

import { usePage, useForm } from "@inertiajs/react";
import InputError from '@/components/input-error';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export function ManageToken({ apiKey }: Props) {

    // const { data, setData, post, processing, errors, reset } = useForm({
    //     tok§en_name: '',
    // });

    // const onSubmit = (e: SubmitEvent) => {
    //     e.preventDefault();
    //     console.log('submit');
    // };

    // console.log(
    //     SecurityController.token.url()
    // );

    return (
        <div className="space-y-6">

            <Heading
                variant="small"
                title="Access Token"
                description="Create an API key to securely integrate with third-party applications and services."
            />

            <Dialog>
                <DialogTrigger><Button>Open</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate Token</DialogTitle>
                        {/* <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription> */}
                    </DialogHeader>

                    <Form id="token-form" method="POST" action={SecurityController.token.url()}>

                        {
                            ({
                                errors,
                                processing,
                                wasSuccessful
                            }) => (
                                <FieldGroup>

                                    {/* <input type="hidden" name="_token" value={csrf} /> */}

                                    <Field>
                                        <Label htmlFor="token_name">Token name</Label>
                                        <Input id="token_name" name="token_name" type="text" placeholder="my-token" />
                                        <InputError message={errors.token_name} />
                                    </Field>

                                    <Button 
                                        disabled={processing}
                                        data-test="generaste-token-button"
                                    >
                                        { processing ? 'Generating...' : 'Generate' }
                                    </Button>

                                </FieldGroup>
                            )
                        }

                    </Form>

                    
                </DialogContent>
            </Dialog>

            
            
            {/* <div className='flex gap-5'>
                <Button>
                    <RefreshCw id='refresh-icn' className='w-6 h-6'/>
                    Generate
                </Button>
            </div> */}


            <Form id="token-form" method="POST" action={SecurityController.token.url()}>

                {
                    ({
                        errors,
                        processing,
                        wasSuccessful
                    }) => (
                        <FieldGroup>

                            {/* <input type="hidden" name="_token" value={csrf} /> */}
        
                            <Field>
                                <Label htmlFor="token_name">Token name</Label>
                                <Input id="token_name" name="token_name" type="text" placeholder="my-token" />
                                <InputError message={errors.token_name} />
                            </Field>
        
                            <Button 
                                disabled={processing}
                                data-test="generaste-token-button"
                            >
                                { processing ? 'Generating...' : 'Generate' }
                            </Button>
    
                        </FieldGroup>

                        {wasSuccessful && (
                            <>

                            
                            </>
                        )}

                    )
                }

            </Form>

            {/* <Form 
                // action="/sanctum/token"
                action={settings.token.url()}
                method="POST"
                >

                <FieldGroup>

                    <Field>
                        <FieldLabel></FieldLabel>
                        <Input name="token_name" type="text" placeholder="Token name" />
                    </Field>

                    <Button type="submit">Generate</Button>

                </FieldGroup>

            </Form> */}

            {/* lets say this is modals body */}

            
        </div>
    );
}