"use server"

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    // we need to know the author
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({ error: "You must be signed in to create a pitch", status: "ERROR" });
    }
    
    // extract all the values from the form
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"), 
    );
    // slug is a unique identifier for the startup
    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        // create the startup
        const startup = {
            title,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
            description,
            category,
            image: link,
            pitch,
        };

        // write to sanity
        const result = await writeClient.create({
            _type: "startup",
            ...startup
        });

        // return back the created startup
        return parseServerActionResponse({ 
            ...result,
            error: '',
            status: "SUCCESS"
         });
    } catch (error) {
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
}
