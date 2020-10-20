import React from "react";
import {Link} from "react-router-dom";
import Button from "./Button";

function TwoColumnPosts ({title, children}: {title: string, children: any}) {
    return (
        <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="relative max-w-lg mx-auto lg:max-w-7xl">
                <div className="container">
                    <div className="flex">
                        <div className="w-1/2">
                            <span className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                                {title}
                            </span>
                        </div>
                        <div className="w-1/2 text-right">
                            <Button font="medium" text="Write post" linkTo="/blog/create" />
                        </div>
                    </div>
                </div>
                <div
                    className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TwoColumnPosts;