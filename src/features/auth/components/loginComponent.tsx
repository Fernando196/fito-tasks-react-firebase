import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/authService";

const LoginComponent = () =>{
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [isSubmiting,setIsSubmiting] = useState<boolean>(false);

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();

        try{
            setIsSubmiting(true);
            
            await login(email,password);

        }catch(err){
            if( err instanceof FirebaseError ){
                console.log(err.message);
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
                        type="text" 
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

                <button disabled={isSubmiting} type="submit" className="bg-blue-400 text-white rounded-lg p-2 mt-6">Login</button>

                <div className="mt-5 flex justify-center">
                    <Link to="/register" className="text-blue-400">Registrarse</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;