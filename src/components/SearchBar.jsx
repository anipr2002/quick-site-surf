import React, { useEffect, useState, useRef} from 'react'
import { IoSearch } from 'react-icons/io5'
import {MdOutlineKeyboardTab} from 'react-icons/md'

const SearchBar = () => {
    const [tabPressed, setTabPressed] = useState(false)

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            setTabPressed(true)
        }
        else if(e.key === 'Escape'){
            setTabPressed(false)
        }
    }
   
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        // console.log(inputRef.current)
    }, [tabPressed])

  return (
    <div className='w-screen h-screen flex justify-center items-center' name='main-screen-container'> 


        <div className={`w-[50rem] h-16 flex items-center bg-[#F9FAFA] rounded-[10px] shadow-[0_0_5px_#8D9093,0_0_15px_#8D9093]`}
             name='main-container'> 

            {
                !tabPressed && (
                    <>
                        <div className='h-full flex items-center ml-4' name ='div.1'>
                            <IoSearch />
                        </div>  

                        <div className='flex-1 ml-4' name='div.2'>
                            <input type="text"
                                    placeholder='Search site'
                                    className='bg-[#F9FAFA] w-full'
                                    onKeyDown={handleKeyDown}
                                    name='input.1'
                                    ref={inputRef}
                                    />
                        </div>

                        <div className='h-full flex items-center mr-4' name='div.3'>
                            <span className={'mr-2'}>Switch to Tab</span>
                            <div><MdOutlineKeyboardTab /></div>
                        </div>

                    </>
                )
            }

            {
                tabPressed && (
                    <>
                        <div className='h-full flex items-center ml-4' name='div.1'>
                            <IoSearch />
                        </div>

                        <div className='flex justify-center items-center w-fit h-full ml-4' name='div.2'>
                            <div className='h-fit w-fit px-2 rounded-xl bg-[#f72617] shadow-[0_0_5px_#f72617,0_0_15px_#f72617] text-white'>
                                <span>Reddit</span>
                            </div>
                        </div>

                        <div className='ml-4 w-full'>
                            <input type="text"
                                    placeholder='Search in Reddit'
                                    className='bg-[#F9FAFA] w-full'
                                    onKeyDown={handleKeyDown}
                                    name='input.2'
                                    />
                        </div>
                    </>
                )
            }
            

        </div>

    </div>
  )
}

export default SearchBar