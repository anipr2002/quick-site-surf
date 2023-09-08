import React,{useState} from 'react'
import { IoSearch } from 'react-icons/io5'
import {MdOutlineKeyboardTab} from 'react-icons/md'
const NewUI = () => {
  
const [enterPressed, setEnterPressed] = useState(false)

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    setEnterPressed(true)
  }
  else if(e.key === 'Escape'){
    setEnterPressed(false)
  }
}


  return (
    <div className='flex justify-center  items-center h-screen'>
        <div className={`w-[50rem] h-16 flex  bg-[#F9FAFA] ${enterPressed ? `shadow-[0_0_5px_#f72617,0_0_15px_#f72617]` : ``} rounded-[10px] text-center border border-black/50`}>
            <div className={' h-full ml-4 w-full flex items-center'}>
                <div className=' pr-4'><IoSearch /></div>
                
                <div className={`flex items-center h-full w-full ${enterPressed ? 'justify-start' : 'justify-between'}`}>
                  <div className={enterPressed ? 'hidden w-0' : ''}>
                    <input type="text" 
                           placeholder='Search site'
                           className='bg-[#F9FAFA]'
                           onKeyDown={handleKeyDown}
                           />
                  </div>

                  <div className={enterPressed ? '' : 'hidden'}>
                    <div className='h-fit w-fit px-2 rounded-xl bg-[#f72617] shadow-[0_0_5px_#f72617,0_0_15px_#f72617] text-white'>
                      Reddit
                    </div>
                  </div>

                  <div className={enterPressed ?' hidden w-0 ' : 'flex items-center mr-4'  }>
                      <span className={'mr-2'}>Switch to Tab</span>
                      <div><MdOutlineKeyboardTab /></div>
                  </div>

                  <div className={enterPressed ?' w-full flex justify-start ml-4' : 'hidden'}>
                    <input type="text"
                            placeholder='Search in Reddit'
                            className='bg-[#F9FAFA] w-full'
                            onKeyDown={handleKeyDown}                            
                            />
                  </div>
                </div>

            </div>
        
        </div>
    </div>
  )
}

export default NewUI