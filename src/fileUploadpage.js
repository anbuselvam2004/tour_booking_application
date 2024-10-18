import React from 'react';
import Nav from './nav';
import './input.css'
import './output.css'

function Upload() {
  return (
    <div>
    <Nav/>
  <body className='bg-gray-800'>
      <div className=' flex justify-center items-center h-screen'>
      <div className=' lg:mx-0 mx-40'>
        <div>
          <input type="file" class=" file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-600/50
          bg-gradient-to-br from-gray-600 to-gray-700 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-700"></input>
        </div>
        <div className='px-14 py-10'>
          <button class="text-[10px] border-2 px-4 py-2 rounded-md hover:bg-pink-300 text-[#03e9f4] uppercase tracking-[4px] text-[16px] border-2 border-[#03e9f4] px-[22px] py-[7px] rounded hover:text-white hover:bg-[#03e9f4]" >EDIT DETAILS</button><br></br>
        </div>
      </div>
      </div>
    </body>
    </div>
  );
}

export default Upload;