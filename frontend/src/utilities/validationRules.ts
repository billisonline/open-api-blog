import {ValidationRule} from "../hooks/useFormValue";

const required: ValidationRule<any> = (value, name): string|null => {
    return ((value == false) && 'Empty!') || null;
};

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const email: ValidationRule<string> = (email: string|null) => (email && !email.match(emailRegex) && 'Invalid email') || null;

type Countable = string | Array<any> | {length: number};

const minLength: (min: number) => ValidationRule<Countable|null> = (min) => {
    return (value, name): string|null => {
        const message = (
            (typeof value === 'string')
                ? `The ${name} must be at least ${min} characters`
                : `The ${name} must have at least ${min} items`
        )

        return (value && (value.length < min) && message) || null;
    };
};

export const validationRules = {
    required,
    email,
    minLength,
}