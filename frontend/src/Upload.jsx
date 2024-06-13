import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(`Document ID: ${response.data.id}`);
        } catch (error) {
            setMessage("Failed to upload file");
        }
    };
    return (
        <div className='w-[100%] h-[100px] flex justify-between items-center flex-row bg-slate-100 m-0 p-0'>
            <div className='mx-10 w-[30%]'><h1 className='text-xl text-teal-500 font-semibold font-mono my-2'>Upload a pdf file</h1></div>
            <div className='mx-10 flex flex-row w-[70%] justify-end items-center'>
                <p className='mx-5'>{message}</p>
                <input type="file" onChange={handleFileChange}
                    className="text-sm text-stone-500
                           file:mr-5 file:py-1 file:px-3 file:border-[1px]
                           file:text-xs file:font-medium
                           file:bg-stone-50 file:text-stone-700
                           hover:file:cursor-pointer hover:file:bg-blue-50
                           hover:file:text-blue-700 shadow-md mx-5"/>
                <button onClick={handleUpload} className='w-[100px] h-[auto] bg-teal-400 text-white px-5 py-2 rounded-md text-lg font-semibold'>Upload</button>

            </div>


        </div>
    )
}

export default Upload;