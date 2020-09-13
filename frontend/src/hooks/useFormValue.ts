import {useState, ChangeEvent, ChangeEventHandler, FocusEventHandler} from "react";

interface FormValue<T> {
    value: T,
    onChange: ChangeEventHandler,
    onBlur: FocusEventHandler,
    isValid: boolean,
    isInvalid: boolean,
    checkBeforeSubmit: () => boolean,
    validationErrors: Array<string>,
}

export interface ValidationRule<T> {
    (value: T|null, name: string): string|null|false,
}

interface FormValueParams<T> {
    initial?: T,
    name?: string,
    rules: ValidationRule<T>[],
}


const useFormValue = <Value>(settings: FormValueParams<Value>): FormValue<Value> => {
    const [initial, name, rules] = [
        settings.initial ?? null,
        settings.name ?? 'value',
        settings.rules ?? [],
    ];

    const [value, setValue] = useState(initial);

    const [isReadyForValidation, setReadyForValidation] = useState(false);

    const [setIsReadyForValidation, setIsNotReadyForValidation] = [
        () => setReadyForValidation(true),
        () => setReadyForValidation(false),
    ];

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        // @ts-ignore
        setValue(event.target.value);

        setIsNotReadyForValidation();
    };

    const validationErrors: Array<string> = (
        rules
            .map((rule): string|null => {
                if (!isReadyForValidation) {return null;}

                const result = rule(value, name);

                return (typeof result === 'string') ? result : null;
            })
            .filter((result): result is string => (typeof result === 'string'))
    );

    const checkBeforeSubmit = (): boolean => {
        setIsReadyForValidation();

        return (
            rules
                .filter((rule): boolean => {
                    const result = rule(value, name);

                    return typeof result === 'string';
                })
                .length === 0
        );
    };

    const onBlur = setIsReadyForValidation;

    const isValid = isReadyForValidation && (validationErrors.length === 0);
    const isInvalid = isReadyForValidation && (validationErrors.length > 0);

    return {
        value: value as Value,
        onChange,
        onBlur,
        isValid,
        isInvalid,
        checkBeforeSubmit,
        validationErrors,
    };
}

const useFormValueSet = (...values: FormValue<any>[]): [boolean, () => boolean] => {
    const anyInvalid = (
        values
            .filter((value): boolean => (value.isInvalid))
            .length > 0
    );

    const checkAllBeforeSubmit = (): boolean => {
        let allValid = true;

        for (const value of values) {
            const result = value.checkBeforeSubmit();

            allValid = result && allValid;
        }

        return allValid;
    };

    return [anyInvalid, checkAllBeforeSubmit];
};

export {useFormValue, useFormValueSet}