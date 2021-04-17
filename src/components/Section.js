import React from "react"

function Section({children,...rest}) {
    return <div className={"relative p-4 w-screen h-screen bg-gray-100 box-border flex justify-center items-center flex-col"} {...rest}>
        {children}
    </div>
}

export default Section