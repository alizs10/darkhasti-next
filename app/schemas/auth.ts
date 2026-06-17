import { z } from "zod";
import { ValidationMessages } from "@/app/lib/validation-messages";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

const passwordSchema = z
    .string()
    .min(1, ValidationMessages.required)
    .min(
        8,
        ValidationMessages.minLength(
            "کلمه عبور",
            8
        )
    )
    .max(
        64,
        ValidationMessages.maxLength(
            "کلمه عبور",
            64
        )
    )
    .regex(
        passwordRegex,
        ValidationMessages.passwordComplexity
    );

const passwordConfirmationSchema = z
    .string()
    .min(1, ValidationMessages.required)
    .max(
        64,
        ValidationMessages.maxLength(
            "تکرار کلمه عبور",
            64
        )
    );

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

        password: passwordSchema,

        password_confirmation: passwordConfirmationSchema,
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
            )
            .max(
                64,
                ValidationMessages.maxLength(
                    "کلمه عبور فعلی",
                    64
                )
            ),
        new_password: passwordSchema,

        new_password_confirmation: passwordConfirmationSchema,
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