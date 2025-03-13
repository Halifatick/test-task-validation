import { ref, reactive, computed, watch } from 'vue';
import type { ValidationSchema, ValidationComposable, ValidationErrors, TouchedFields } from '@/types/validation.types.js'

export function useValidation<T extends Record<string, any>>(
    initialValues: T,
    rules: ValidationSchema,
    debounceTime = 300
): ValidationComposable<T> {
    const values = reactive<T>({ ...initialValues });
    const errors = reactive<ValidationErrors>({});
    const touched = reactive<TouchedFields>({});
    const isValid = computed(() => Object.values(errors).every((e) => e.length === 0));

    const defaultMessages = {
        required: 'Это поле обязательно',
        minLength: (val: number) => `Минимальная длина ${val} символов`,
        maxLength: (val: number) => `Максимальная длина ${val} символов`,
        email: 'Введите корректный email'
    };

    const validators = {
        required: (value: any, rule: { message?: string }) => !value ? (rule.message || defaultMessages.required) : null,
        minLength: (value: string, rule: { value: number; message?: string }) =>
            value.length < rule.value ? (rule.message || defaultMessages.minLength(rule.value)) : null,
        maxLength: (value: string, rule: { value: number; message?: string }) =>
            value.length > rule.value ? (rule.message || defaultMessages.maxLength(rule.value)) : null,
        email: (value: string, rule: { message?: string }) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? (rule.message || defaultMessages.email) : null,
        customRule: (value: any, rule: { validator: (val: any) => string | null }) => rule.validator(value)
    };

    const validateField = (field: keyof T, value: any) => {
        errors[field] = [];
        const fieldRules = rules[field] || {};

        Object.keys(fieldRules).forEach((ruleKey) => {
            const rule = fieldRules[ruleKey];
            if (validators[ruleKey]) {
                const errorMessage = validators[ruleKey](value, rule);
                if (errorMessage) errors[field].push(errorMessage);
            }
        });
    };

    const validateForm = () => {
        Object.keys(values).forEach((field) => validateField(field, values[field]));
    };

    const markTouched = (field: keyof T) => {
        touched[field] = true;
        validateField(field, values[field]);
    };

    const resetForm = () => {
        Object.assign(values, initialValues);
        Object.keys(errors).forEach((key) => (errors[key] = []));
        Object.keys(touched).forEach((key) => (touched[key] = false));
    };


    watch(
        values,
        () => {
            setTimeout(validateForm, debounceTime);
        },
        { deep: true }
    );

    return { values, errors, isValid, touched, validateForm, resetForm, markTouched };
}