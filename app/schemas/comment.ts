// schemas/request.ts

import { z } from "zod";
import { ValidationMessages } from "@/app/lib/validation-messages";

export const createCommentSchema = z.object({
    body: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            3,
            ValidationMessages.minLength("پاسخ", 3)
        )
        .max(
            1000,
            ValidationMessages.maxLength("پاسخ", 1000)
        ),
    temp_files: z
        .array(z.string())
        .max(
            10,
            ValidationMessages.maxItems("فایل‌های موقت", 10)
        )
        .optional(),

    request_id: z
        .string()
        .min(1, ValidationMessages.required),

    parent_id: z
        .string().optional()
});

export const updateCommentSchema = z.object({


    body: z
        .string()
        .min(1, ValidationMessages.required)
        .min(
            3,
            ValidationMessages.minLength("پاسخ", 3)
        )
        .max(
            1000,
            ValidationMessages.maxLength("پاسخ", 1000)
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
});