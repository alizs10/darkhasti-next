// validation-messages.ts

export const ValidationMessages = {
    required: "این فیلد الزامی است",

    minLength: (field: string, min: number) =>
        `${field} باید حداقل ${min} کاراکتر باشد`,

    maxLength: (field: string, max: number) =>
        `${field} نباید بیشتر از ${max} کاراکتر باشد`,

    maxItems: (field: string, max: number) =>
        `${field} نباید بیشتر از ${max} مورد باشد`,

    passwordMismatch: "تکرار کلمه عبور با کلمه عبور مطابقت ندارد",

    // New message for username availability
    usernameTaken: "این نام کاربری قبلاً ثبت شده است",
};  