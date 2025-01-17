import React from "react";
import {default as cn} from "classnames";

function Alert({text, spaceAfter='none'}: {
    text: string,
    spaceAfter?: 'none' | 'medium'
}) {
    return (
        <div className={cn((spaceAfter === 'medium') && 'mb-6', "rounded-md bg-red-50 p-4")}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {/*<!-- Heroicon name: x-circle -->*/}
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm leading-5 font-medium text-red-800">
                        {text}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Alert;