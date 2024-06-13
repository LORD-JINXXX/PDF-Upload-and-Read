import React, { useState } from 'react';
import axios from 'axios';

const Ask = () => {

    const [docId, setDocId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAsk = async () => {
        try {
            const response = await axios.post("http://localhost:8000/ask", { doc_id: docId, question });
            setAnswer(response.data.answer);
        } catch (error) {
            setAnswer("Failed to get answer");
        }
    };

    return (
        <div className='w-[100vw] h-[600px] flex justify-start items-center flex-col'>
            <div className='mx-10 flex flex-row justify-between items-center w-[100%] h-[100px]'>
                <input
                    type="text"
                    placeholder="Enter the document id"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    className="text-sm text-stone-500
                           file:mr-5 file:py-1 file:px-3 file:border-[1px]
                           file:text-xs file:font-medium
                           file:bg-stone-50 file:text-stone-700
                           hover:file:cursor-pointer hover:file:bg-blue-50
                           hover:file:text-blue-700 shadow-md mx-10"
                />
                <textarea
                    placeholder="Ask your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className='w-[50%] h-[50px] shadow-lg rounded-md px-2 py-3 mx-10'
                />
                <button onClick={handleAsk} className='w-[100px] h-[auto] bg-teal-400 text-white px-5 py-2 rounded-md text-lg font-semibold mx-10'>Ask</button>
            </div>


            <p className='w-[95%] h-[400px] overflow-auto py-10 px-8 my-5 shadow-md rounded-md'>{answer}</p>
        </div>
    )
}

export default Ask;