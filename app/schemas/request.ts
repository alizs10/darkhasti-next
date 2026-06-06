// schemas/request.ts

import { z } from "zod";
import { ValidationMessages } from "@/app/lib/validation-messages";

export const createRequestSchema = z.object({
    title: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            3,
            ValidationMessages.minLength("عنوان", 3)
        )
        .max(
            99,
            ValidationMessages.maxLength("عنوان", 99)
        ),

    description: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            10,
            ValidationMessages.minLength("توضیحات", 10)
        )
        .max(
            1000,
            ValidationMessages.maxLength("توضیحات", 1000)
        ),
    temp_files: z
        .array(z.string())
        .max(
            10,
            ValidationMessages.maxItems("فایل‌های موقت", 10)
        )
        .optional(),

    save_as_draft: z
        .boolean()
        .optional(),
});

export const updateRequestSchema = z.object({
    title: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            3,
            ValidationMessages.minLength("عنوان", 3)
        )
        .max(
            99,
            ValidationMessages.maxLength("عنوان", 99)
        ),

    description: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            10,
            ValidationMessages.minLength("توضیحات", 10)
        )
        .max(
            1000,
            ValidationMessages.maxLength("توضیحات", 1000)
        ),
    deleted_main_files: z
        .array(z.string())
        .optional(),
    temp_files: z
        .array(z.string())
        .max(
            10,
            ValidationMessages.maxItems("فایل‌های موقت", 10)
        )
        .optional(),

    save_as_draft: z
        .boolean()
        .optional(),
});