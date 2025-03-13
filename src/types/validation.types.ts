export interface ValidationRules {
    [key: string]: {
        [ruleName: string]: {
            messageError: string;
            validator: (value: any) => boolean;
        };
    };
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
