import app from "../../../config/firebase-config";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { auth } from "../../auth/services/authService";
import { Task } from "../../../shared/types/Task.type";

const db = getFirestore(app);

export const addTask = async (value:string): Promise< Task | null > => {
    try{
        if(  !auth.currentUser ) return null;

        const task: Task = {
            name: value,
            createAt: new Date().toISOString(),
            userId: auth.currentUser.uid
        }

        const docRef: DocumentData = await addDoc(collection(db,"tasks"), task);
        task.id = docRef.id;

        return task;
    }catch(err){
        console.log(err)
        return null;
    }
}

export const getTasks = async () =>{
    try{
        if(  !auth.currentUser ) return;

        const q = query(collection(db,"tasks"), where("userId","==",auth.currentUser.uid),orderBy("createAt","asc"));
        const querySnapshot = await getDocs(q);
        const tasks: Task[] = [];

        querySnapshot.forEach((doc)=>{
            const task: Task = {
                id: doc.id,
                name: doc.data().name,
                createAt: doc.data().createAt,
                userId: doc.data().userId
            }
            tasks.push(task)
        });

        return tasks;
    }catch(err){
        console.log(err)
    }
}

export const deleteTask = async (id: string): Promise<boolean> =>{
    if(  !auth.currentUser ) return false;

    try{
        await deleteDoc(doc(db,`tasks/${id}`));
        return true
    }catch(err){
        console.log(err);
        return false;
    }
}