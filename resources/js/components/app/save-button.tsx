import { Button } from '@/components/ui/button';

type SaveButtonProps = {
    processing: boolean;
    label?: string;
    loadingText?: string;
};

export function SaveButton({
    processing,
    label = 'Save',
    loadingText = 'Saving…',
}: SaveButtonProps) {
    return (
        <div className="flex justify-end gap-2">
            <Button type="submit" disabled={processing}>
                {processing ? loadingText : label}
            </Button>
        </div>
    );
}
