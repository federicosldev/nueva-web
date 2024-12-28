import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    schema: z.object({
        name: z.string(),
        type: z.string(),
        img: z.string(),
        tag1: z.string(),
        tag2: z.string(),
    })
})

const reviews = defineCollection({
    schema: z.object({
        name: z.string(),
        cargo: z.string(),
        img: z.string(),
        message: z.string(),
    })
})

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        img: z.string(),
        extracto: z.string(),
    })
})

export const collections = { projects, reviews, blog }
