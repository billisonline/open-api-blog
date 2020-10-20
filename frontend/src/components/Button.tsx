import React from "react";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";

type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function Button(
    {text, full = false, loading = false, linkTo = '', font = 'small', ...props}: {
        text: string,
        full?: boolean,
        loading?: boolean,
        linkTo?: string,
        font?: 'small' | 'medium',
    } & HTMLButtonProps
) {
    const disabled = loading || props.disabled;

    const button = (
        <span className={`${full && 'w-full'} inline-flex rounded-md shadow-sm`}>
            <button type="button"
                    className={`${full && 'w-full justify-center mt-1'} ${disabled ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-600'} inline-flex items-center px-4 py-3 border border-transparent ${(font == 'medium')? 'text-md' : 'text-sm'} leading-4 font-medium rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150`}
                    {...props}
            >
                {text}
                &nbsp;
                {loading && <Spinner/>}
            </button>
        </span>
    );

    return (
        (linkTo.length > 0)
            ? <Link to={linkTo}>{button}</Link>
            : button
    )
}

export default Button;
