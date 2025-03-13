import {reactive, computed, watch, nextTick} from 'vue';
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

    let debounceTimer: ReturnType<typeof setTimeout>;

    const validateField = async (field: keyof T, value: any) => {
        errors[field] = [];
        const fieldRules = rules[field] || {};

        Object.keys(fieldRules).forEach((ruleKey) => {
            const rule = fieldRules[ruleKey]

            if (typeof rule.validator === 'function' && !rule.validator(value)) {
                if (rule.messageError) {
                    if (!errors[field]) errors[field] = [];
                    errors[field].push(rule.messageError);
                }
            }
        });

        await nextTick();
    };

    const validateForm = () => {
        Object.keys(values).forEach((field) => markTouched(field as keyof typeof values));
    };

    const markTouched = async (field: keyof T) => {
        touched[field] = true;
        await validateField(field, values[field]);
    };

    const resetForm = () => {
        clearTimeout(debounceTimer);
        Object.keys(values).forEach((key) => {
            values[key] = initialValues[key];
        });
        Object.keys(errors).forEach((key) => (errors[key] = []));
        Object.keys(touched).forEach((key) => (touched[key] = false));
    };


    watch(
        values,
        () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(markTouched, debounceTime);
        },
        { deep: true }
    );

    return { values, errors, isValid, touched, validateForm, resetForm, markTouched };
}