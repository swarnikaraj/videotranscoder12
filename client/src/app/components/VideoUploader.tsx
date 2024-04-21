import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import {VidepUploaderProps} from "../utils/type";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoUploader:React.FC<VidepUploaderProps>=({setSelectedFiles, selectedFiles})=>{


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
   
   if(files){
       console.log(Array.from(files), typeof(files),"files receielve")
           const videoFiles = Array.from(files).filter((file) => file.type.startsWith('video/'));
            if (videoFiles.length === 0) {
                alert('Please select a valid video file.');
            } else {
              
                setSelectedFiles(videoFiles);
                
            }
    }
      
    

  }

  return <div>
    <div  className="flex items-center  w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200  pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
         
         <div className="flex gap-2">
                  
          <label htmlFor="fileInput" className="relative cursor-pointer">
           <span className="bg-transaprent border-gray-300 rounded-md py-2 px-4 flex gap-2">
            <IoCloudUploadOutline className="text-4xl text-gray-500"/>
           <span className="mt-1">Select Videos</span> </span>
          <input onChange={handleChange} id="fileInput" type="file" className="hidden" multiple  />
          </label>        
          
          </div>
           
        </div>
           <ul>
                {selectedFiles.map((file, index) => (
                    <li className="text text-white" key={index}>{file.name}</li>
                ))}
            </ul>

<ToastContainer />
  </div>
}

export default VideoUploader