import { useState } from "react"


function Navbar(){
    return(
        <header className="flex flex-row justify-between items-center w-full px-10 bg-white h-[10vh] border-b-2 border-gray-100">
            <nav>
                <ul className="flex flex-row gap-7 justify-center w-fit">
                    <li className="font-montserrat font-semibold">
                        Spend
                    </li >
                    <li className="font-montserrat font-semibold">
                        Save
                    </li>
                    <li className="font-montserrat font-semibold">
                        Invest
                    </li>
                    <li className="font-montserrat font-semibold">
                        Advance
                    </li>
                </ul>
            </nav>
            <div className="h-full flex justify-center items-center">
                <p className="font-delius font-bold text-3xl">AgentX</p>
            </div>
            <div className="flex flex-row justify-center items-center">
                <ul className="flex flex-row gap-7 justify-center w-fit">
                    <li className="font-montserrat font-semibold">
                        About
                    </li >
                    <li className="font-montserrat font-semibold">
                        Help
                    </li>
                    
                </ul>
                <button className="rounded-4xl bg-black text-white px-5 py-3 mx-5 font-montserrat font-semibold">Get Started</button>
            </div>
        </header>

    )
}

export default Navbar