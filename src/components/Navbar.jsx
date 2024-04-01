import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer  flex justify-between items-center py-5 px-4 h-14">
            <div className="logo font-bold text-2xl">
                <span className='text-blue-500'>&lt;</span>
               <span>Pass</span>
                <span className='text-blue-500'>OP/&gt;</span>
                </div>
            <button className='text-blue-950'>
                <img className='invert w-20 p-1' src="icons/github.svg" alt="githublogo" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
