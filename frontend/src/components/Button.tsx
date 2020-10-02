import React from "react";
import Spinner from "./Spinner";

type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function Button(
    {text, full = false, loading = false, ...props}: {
        text: string,
        full?: boolean,
        loading?: boolean,
    } & HTMLButtonProps
) {
    const disabled = loading || props.disabled;

    return (
        <span className={`${full && 'w-full'} inline-flex rounded-md shadow-sm`}>
            <button type="button"
                    className={`${full && 'w-full justify-center mt-1'} ${disabled ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-600'} inline-flex items-center px-4 py-3 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150`}
                    {...props}
            >
                {text}
                &nbsp;
                {loading && <Spinner/>}
            </button>
        </span>
    );
}

export default Button;
