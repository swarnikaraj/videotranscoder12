"use client"
import Image from "next/image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import VideoUploader from "./components/VideoUploader"
import VideoList from "./components/VideoList";
import Loader from "./components/Loader";
import { VideoObject } from "./utils/type";
import { getPresignedUrl } from "./utils/api";
import md5 from 'md5';
import axios from "axios";

export default function Home() {
  const [loading,setLoading]=useState<boolean>(false)
  const [videos,setVideos]=useState<VideoObject[]>([])
  function generateVideoSlug(filename: string): string {  
    const hash = md5(filename);

    const shortSlug = hash.slice(0, 8);

    return shortSlug;
}
  const [selectedFiles,setSelectedFiles]=useState<File[]>([])

  const uploadFile = async (file: File) => {
        try {
             const presignedUrl = await getPresignedUrl(file)
            //  let res=await axios.put(presignedUrl, file)
           

const myHeaders = new Headers({ 'Content-Type': 'video/*' });
    const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: myHeaders,
        body: file
     });
     console.log(presignedUrl,"\npresignedUrl \n",response)

            const videoObj: VideoObject = {
                id: generateVideoSlug(file.name),
                title: file.name,
                type: file.type,
                status: "processing",
                size: (file.size / 1024 / 1024).toFixed(2),
                createdAt: Date.now().toString()
            };
https://videotranscoder24.s3.amazonaws.com/3209828-uhd_3840_2160_25fps.mp4?AWSAccessKeyId=AKIAWIKZCOQHDHXJJBEI&Content-Type=video%2Fmp4&Expires=1713086401&Signature=fErxFlr7321BAK%2BrLloOXaRsh3M%3D 
            setVideos(prevVideos => [...prevVideos, videoObj]);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again.');
        }
    };

   
  const handleUploadVideos = async () => {
        setLoading(true);
        try {
            for (let file of selectedFiles) {
                await uploadFile(file);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files. Please try again.');
        } finally {
            setLoading(false);
        }
    };


  return (
    <main className=" min-h-screen  items-center justify-between p-2 xl:p-24 lg:p-24">
    
       
       <VideoUploader setSelectedFiles={setSelectedFiles} selectedFiles={[]}/>


        <div className="  my-4 flex flex-row-reverse">
          <button disabled={loading} onClick={handleUploadVideos} className={`bg-fuchsia-900 px-4 py-2 rounded hover:shadow-sm shadow ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
           {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        
              
           
     
             <ul>
                {selectedFiles.map((file, index) => (
                    <li className="text text-white" key={index}>{file.name}</li>
                ))}
            </ul>

           <VideoList videos={videos}/>

 
          {loading && (
                <Loader/>
            )}
      
    </main>
  );
}
