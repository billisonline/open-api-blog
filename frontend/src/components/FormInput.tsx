import React, {useRef} from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from 'uuid';

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function FormInput({label = '', errors = [], ...props}: { label: string, errors?: Array<string> } & HTMLInputProps) {
    const {current: id} = useRef(uuidv4());

    const hasErrors = errors.length > 0;

    return (
        <>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
            )}
            <div className="mt-1 relative rounded-md shadow-sm">
                <input id={id}
                       className={classNames('form-input block w-full sm:text-sm sm:leading-5', {
                           'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': hasErrors,
                       })}
                       {...props}
                />
                {hasErrors && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"/>
                  </svg>
                </div>}
            </div>
            {errors.map((error, i) => (
                <p key={i} className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            ))}
        </>
    );
}

export default FormInput;
