import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    axios.get('https://libretranslate.de/languages')
      .then(res => {
        setOptions(res.data);
      })
      
  }, []);

  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      setOutput(res.data.translatedText);
    })
  
    
  };

  return (
    <>
    <div className="h-screen max-w-full m-2 justify-center">
      <div className="">
        <div className="inline-block mr-2">
          <div className="ml-20 inline-block">From({from}):</div>
          <select className="border-2 mr-20 p-3" onChange={e => setFrom(e.target.value)}>
            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
          </select>
        </div>

        <div className="inline-block">To({to}):</div>
        <select className="border-2 mr-20 p-3" onChange={e => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
      </div>

      <div className="mt-10 flex  ">
        <textarea className='border-2' cols="90" rows="5" value={input} onChange={e => setInput(e.target.value)}></textarea>
      </div>
      <div className="mt-10 flex  ">
        <textarea className='border-2' cols="90" rows="5" value={output}></textarea>
      </div>
       <div className="flex">
      <button className="mt-10 object-none p-2 bg-blue-700 font-extrabold" type="button" onClick={translate} >Translate</button>
      </div>
      </div>
    </>
  );
};

export default Page;
