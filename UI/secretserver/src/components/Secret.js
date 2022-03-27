import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useForm } from "react-hook-form";


const Secret = () => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [errmsg,setErrMsg]=useState('')

  const getSecret =  async (event) => {
    const url=SERVER_URL+"/secret/"+ hash;
    const data=await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(data.data.success){
      setErrMsg('');
      setText(data.data.result.secretText);
    }
    else{
        setText('');
        setErrMsg(data.data.message);
    }
    
  };

  return (
    <div className="ui segment" style={{backgroundColor:'aliceblue'}}>
      <form onSubmit={handleSubmit(getSecret)} className="ui form">
        <div className="field">
          <label>Enter Hash</label>
          <input {...register("hash", { required: true })} type="text" value={hash} onChange={(e)=>setHash(e.target.value)}
          />
        <span style={{ color: 'red' }}>{errors.hash && "Hash is required"}</span>
        </div>
        <button type="submit" className="ui primary basic button">Get Secret</button>
      </form>
      <h2 className="ui dividing header">Secret</h2>
      <div className="text1"> <h3>{errmsg}{text}</h3></div>
    </div >
  );
};

export default Secret;
