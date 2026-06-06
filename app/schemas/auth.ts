import { z } from "zod";
import { ValidationMessages } from "@/app/lib/validation-messages";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(1, ValidationMessages.required)
            .min(
                3,
                ValidationMessages.minLength(
                    "نام کاربری",
                    3
                )
            ),

        password: z
            .string()
            .min(1, ValidationMessages.required)
            .min(
                8,
                ValidationMessages.minLength(
                    "کلمه عبور",
                    8
                )
            ),

        password_confirmation: z
            .string()
            .min(1, ValidationMessages.required),
    })
    .refine(
        (data) =>
            data.password === data.password_confirmation,
        {
            path: ["password_confirmation"],
            message:
                ValidationMessages.passwordMismatch,
        }
    );


export const loginSchema = z.object({
    username: z
        .string()
        .min(1, ValidationMessages.required),

    password: z
        .string()
        .min(1, ValidationMessages.required),
});

export const changePasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, ValidationMessages.required)
            .min(
                8,
                ValidationMessages.minLength(
                    "کلمه عبور فعلی",
                    8
                )
            ),
        new_password: z
            .string()
            .min(1, ValidationMessages.required)
            .min(
                8,
                ValidationMessages.minLength(
                    "کلمه عبور جدید",
                    8
                )
            ),

        new_password_confirmation: z
            .string()
            .min(1, ValidationMessages.required),
    })
    .refine(
        (data) =>
            data.new_password === data.new_password_confirmation,
        {
            path: ["new_password_confirmation"],
            message:
                ValidationMessages.passwordMismatch,
        }
    );

export const changeUsernameSchema = z.object({
    username: z
        .string()
        .min(1, ValidationMessages.required),
});