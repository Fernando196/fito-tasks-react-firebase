import app from "../../../config/firebase-config";
import { createUserWithEmailAndPassword, getAuth, NextOrObserver, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";


const auth = getAuth(app);

export const createUser = async ( email: string, password: string ) =>{
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const loginFirebase = async ( email: string, password: string ) =>{
    return await signInWithEmailAndPassword(auth, email, password);
}

export const logoutFirebase = () => signOut(auth);

export const authStateChange = ( callback: NextOrObserver<User> ) => {
   return onAuthStateChanged(auth, callback);
}


export const errorsFirebase = ( errorMessage:string) => {

    const errors: Record<string,string> = {
        "auth/email-already-in-use": "Email already in use",
        "auth/weak-password": "Weak password",
        "auth/invalid-email": "Invalid email",
        "auth/user-not-found": "User not found",
        "auth/wrong-password": "Wrong password",
    }

    const regex = /\(([^)]+)\)/;
    const match = errorMessage.match(regex) || [""];

    return errors[match[1]] || "Error desconocido";
}