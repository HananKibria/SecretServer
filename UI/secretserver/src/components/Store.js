import React, { useState} from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useForm } from "react-hook-form";


const Store = () => {
   const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const [text, setText] = useState('');
  const [expiresAfter,setExpiresAfter] = useState('');
  const [hash, setHash] = useState('');

  const storeHash =  async (event) => {
   let payload={
      secret: text,
      expireAfter: expiresAfter
  }
  payload.expireAfter=parseInt(payload.expireAfter,10)
  const data=await axios.post(SERVER_URL+"/secret", payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      setHash(data.data.result.hash);
    
  };

  return (
    <div className="ui segment" style={{backgroundColor:'aliceblue'}}>
        <form onSubmit={handleSubmit(storeHash)}  className="ui form">
      <div className="field">
        <label>Secret Text</label>
        <input  {...register("SecretText", { required: true })} type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <span style={{ color: 'red' }}>{errors.SecretText && "Secret Text is required"}</span>
      </div>
      <div className="field">
        <label>Expires After</label>
        <input  value={expiresAfter}  {...register("expireAfter", { required: true })} onChange={(e)=>setExpiresAfter(e.target.value.replace(/\D/,''))} />
        <span style={{ color: 'red' }}>{errors.expireAfter && "expire After is required"}</span>
      </div>
      <button  type="submit" className="ui primary basic button">Store Secret</button>
    </form>
    <h2 className="ui dividing header">Hash</h2>
      <div className="text1"> <h2>{hash}</h2></div>
    </div>
  );
};

export default Store;
