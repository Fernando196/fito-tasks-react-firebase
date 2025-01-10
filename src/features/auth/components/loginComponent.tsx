import { FirebaseError } from "firebase/app";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  loginFirebase } from "../services/authService";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../context/useAuth";

const LoginComponent = () =>{
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [isSubmiting,setIsSubmiting] = useState<boolean>(false);
    const [error,setError] = useState<string>('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) =>{
        setError('');
        event.preventDefault();

        try{
            setIsSubmiting(true);
            
            const userCredential: UserCredential =  await loginFirebase(email,password);
            login(userCredential.user);
            navigate('/');
        }catch(err){
            if( err instanceof FirebaseError ){
                console.log(err.message);
                setError(err.message);
            }
        }finally{
            setIsSubmiting(false);
        }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <form className="max-w-sm w-full p-4 bg-white shadow-lg rounded-lg flex flex-col" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold text-center">Login</h1>
                <div className="mt-4 flex flex-col">
                    <label>Usuario</label>
                    <input 
                        type="email" 
                        className="border rounded-lg p-2 mt-3"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-4 flex flex-col">
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        className="border rounded-lg p-2 mt-3"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>

                { error && <div className="text-red-500 mt-3">{error}</div> }

                <button disabled={isSubmiting} type="submit" className="bg-blue-400 text-white rounded-lg p-2 mt-6">Login</button>

                <div className="mt-5 flex justify-center">
                    <Link to="/register" className="text-blue-400">Registrarse</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;