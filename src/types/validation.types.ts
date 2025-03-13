interface ValidationRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    custom?: (value: any) => string | null;
}

export type ValidationSchema = Record<string, ValidationRules>;
export type ValidationErrors = Record<string, string[]>;
export type TouchedFields = Record<string, boolean>;

export type ValidationComposable<T> = {
    values: T;
    errors: ValidationErrors;
    isValid: Readonly<boolean>;
    touched: TouchedFields;
    validateForm: () => void;
    resetForm: () => void;
    markTouched: (field: keyof T) => void;
};