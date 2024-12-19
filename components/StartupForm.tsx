"use client"

import React, { useState, useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Result } from 'postcss';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const { toast } = useToast();
    const router = useRouter();
    
    const handleFormSubmit = async (prevState: any, formData: FormData ) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch, // we don't get it from the form
            };
            await formSchema.parseAsync(formValues);

            // const result = await createIdea(prevState, formData, pitch);
            // if (result.status === "SUCCESS") {
            //     toast({
            //         description: "Your startup idea has been submitted successfully",
            //         title: "Success",
            //     });

            //     router.push(`/startup/${result.id}`);
            // }
            // return result;
        } catch(error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = (error as z.ZodError).flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    description: "Please check your input and try again",
                    title: "Error",
                    variant: "destructive"
                });

                return {...prevState, error: "Validation failed", status: "ERROR"}
            }

            toast({
                description: "An unexpected error occurred",
                title: "Error",
                variant: "destructive"
            });
            
            return {...prevState, error: "An unexpected error occurred", status: "ERROR"}
                
        } 
    };
    
    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        { error: "", status: "INITIAL"});

    

    return (
        <form
            action={formAction}
            className="startup-form"
        >
            {/* Title */}
            <div>
                <label
                    htmlFor='title'
                    className='startup-form_label'
                >
                    Title
                </label>

                <Input 
                    name="title"
                    id="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && (
                    <p className="startup-form_error">
                        {errors.title}
                    </p>
                )}

            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor='description'
                    className='startup-form_label'
                >
                    Description
                </label>

                <Textarea
                    name="description"
                    id="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />

                {errors.description && (
                    <p className="startup-form_error">
                        {errors.description}
                    </p>
                )}

            </div>

            {/* Category */}
            <div>
                <label
                    htmlFor='category'
                    className='startup-form_label'
                >
                    Category
                </label>

                <Input
                    name="category"
                    id="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education, etc.)"
                />

                {errors.category && (
                    <p className="startup-form_error">
                        {errors.category}
                    </p>
                )}

            </div>

            
            {/* Image Link */}
            <div>
                <label
                    htmlFor='link'
                    className='startup-form_label'
                >
                    Image URL
                </label>

                <Input
                    name="link"
                    id="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && (
                    <p className="startup-form_error">
                        {errors.link}
                    </p>
                )}

            </div>

            {/* Pitch */}
            <div data-color-mode="light">
                <label
                    htmlFor='pitch'
                    className='startup-form_label'
                >
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: 'Briefly describe your idea and what problem it solves.',
                    }}
                    previewOptions={{
                        disallowedElements: ['style'],
                    }}

                />

                {errors.pitch && (
                    <p className="startup-form_error">
                        {errors.pitch}
                    </p>
                )}

            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit your pitch"}
                <Send className="size-6 ml-2" />
            </Button>

        </form>
      
    );
}

export default StartupForm;