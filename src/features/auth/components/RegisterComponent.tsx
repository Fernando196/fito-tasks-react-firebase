import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { createUser, errorsFirebase } from "../services/authService";
import { FirebaseError } from "firebase/app";


export const RegisterComponent = () =>{
    const navigate = useNavigate();
    const [email,setEmail]                     = useState<string>('');
    const [password,setPassword]               = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const [isSubmiting,setIsSubmiting]         = useState<boolean>(false);
    const [error,setError]                     = useState<string>('');

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        if(password.length < 6){
            alert('Password must be at least 6 characters');
            return;
        }
        
        try{
            setIsSubmiting(true);
            await createUser(email,password);
            navigate('/login');
        }catch(err){
            if( err instanceof FirebaseError ){
                setError( errorsFirebase(err.message) );
            }
        }finally{
            setIsSubmiting(false);
        }

    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <form className="max-w-sm w-full p-4 bg-white shadow-lg rounded-lg flex flex-col" onSubmit={handleRegister}>
                <h1 className="text-xl font-bold text-center">Registrarse</h1>

                <div className="mt-4 flex flex-col">
                    <label>Email</label>
                    <input type="text" className="border rounded-lg p-2 mt-3" value={email} onChange={(e)=> setEmail(e.target.value) } />
                </div>

                <div className="mt-4 flex flex-col">
                    <label>Password</label>
                    <input type="password" className="border rounded-lg p-2 mt-3" value={password} onChange={(e)=> setPassword(e.target.value) } />
                </div>

                <div className="mt-4 flex flex-col">
                    <label>Confirm password</label>
                    <input type="password" className="border rounded-lg p-2 mt-3" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value) } />
                </div>

                { error && <div className="mt-4 text-red-400 flex justify-center">{error}</div> }

                <button disabled={isSubmiting} type="submit" className="bg-blue-400 text-white rounded-lg p-2 mt-6">Registrarse</button>

                <div className="mt-5 flex justify-center">
                    <Link to="/login" className="text-blue-400">Login</Link>
                </div>
            </form>
        </div>
    )
}