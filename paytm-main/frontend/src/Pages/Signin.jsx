import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function Signin(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
       <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
        <Heading label={'Sign In'}></Heading>
        <SubHeading label={'Enter your credentials to acess your account'}></SubHeading>

        <InputBox onChange={e=>{
            setUsername(e.target.value);
        }} label={'Email'} placeholder={'jhondoe@emaple.com'}></InputBox>

        <InputBox onChange={e=>{
            setPassword(e.target.value);
        }} label={'Password'} placeholder={'123456'}></InputBox>

        <Button onClick={async ()=>{
           const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
            username,
            password
           })

           localStorage.setItem("token",response.data._id);
           navigate('/dashboard')
        }} label={'Sigin'} ></Button>
        <BottomWarning label={`Don't have a account?`} buttonText={'signup'} to={'/signup'}></BottomWarning>
       </div>
    </div>
    </div>
}