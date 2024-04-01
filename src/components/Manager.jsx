import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

function Manager() {
    const [passwordArray, setpasswordArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const ref = useRef()
    const passwordRef = useRef()
    const getpassword = async () => {
        let req = await fetch("http://127.0.0.1:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setpasswordArray(passwords)
      

    }


    useEffect(() => {

        getpassword()
    }, [])

    const copyText = (text) => {
        toast('🦄 Copied ' + text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"

        }
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.username.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://127.0.0.1:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
            await fetch("http://127.0.0.1:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('🦄 Saved ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast('🦄 Not Saved ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
    }
    const deletePassword = async(id) => {

        let c = confirm("do you want to delete?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
             await fetch("http://127.0.0.1:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
        }
        toast('🦄 Password Deleted ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        //     console.log([...passwordArray, form])
    }
    const editPassword = (id) => {
        console.log("editing pass with id " + id)
        setform({...passwordArray.filter(i => i.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            {/* Same as */}
            <ToastContainer />

            <div className='p-3  md:mycontainer min-h-[88vh]'>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-blue-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-blue-500 w-full'>OP/&gt;</span>
                </h1>
                <p className='text-blue-900 text-center text-lg'>Your Own password manager</p>
                <div className=" flex flex-col gap-8 p-4 items-center text-black">
                    <input name='site' onChange={handleChange} value={form.site} className=' w-full rounded-full border p-4 py-1 border-blue-500' type="text" placeholder='Enter Website URL' />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input name='username' onChange={handleChange} value={form.username} className='rounded-full border p-4 py-1 border-blue-500 w-full' type="text" placeholder='Username' />
                        <div className="relative">  <input ref={passwordRef} name='password' onChange={handleChange} value={form.password} className='rounded-full border p-4 py-1 border-blue-500 w-full' type="password" placeholder='Password' />
                            <span className='absolute top-[3px] right-[3px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1' width={30} src="\icons\eye.png" alt="" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 w-fit hover:bg-blue-300 bg-blue-400 rounded-full px-4 border border-blue-900  py-2'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-4 text-2xl'>Your Password</h2>
                    {passwordArray.length === 0 && <div>No Passwwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-blue-500 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='   py-2 border border-white text-center '><div className='flex items-center justify-center'><a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='w-7 cursor-pointer copybutton' onClick={() => { copyText(item.site) }}><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover">
                                        </lord-icon></div></div></td>
                                    <td className='py-2 border border-white text-center '><div className='flex items-center justify-center'>{item.username}<div className='w-7 cursor-pointer copybutton' onClick={() => { copyText(item.username) }}><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover">
                                    </lord-icon></div></div></td>
                                    <td className='py-2 border border-white text-center '><div className='flex items-center justify-center'>{"*".repeat(item.password.length)}<div className='w-7 cursor-pointer copybutton' onClick={() => { copyText(item.password) }}><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover">
                                    </lord-icon></div>
                                    </div></td>
                                    <td className=' py-2 border border-white text-center '><div className='flex items-center justify-center'><span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} ><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                        trigger="hover">
                                    </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }} ><lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover">
                                        </lord-icon></span></div></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
