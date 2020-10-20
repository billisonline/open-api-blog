import React from "react";

function Container ({children, className = ''}: {children: any, className?: string}) {
    return (
        <div className={`${className} container mx-auto px-4 sm:px-6 lg:px-8`}>
            {children}
        </div>
    );
}

export default Container;