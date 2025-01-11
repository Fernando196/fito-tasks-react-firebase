import { useEffect, useState } from "react";
import { Task } from "../../../shared/types/Task.type";
import { addTask, deleteTask, getTasks } from "../services/taskFirebase";
import { TaskList } from "../components/TaskList";
import { useAuth } from "../../auth/context/useAuth";
import { useNavigate } from "react-router";
import { getStorageTasks } from "../services/taskStorage";


export const TasksLayout = () => {
    const [tasks,setTasks]= useState<Task[]>([]);
    const [taskName,setTaskName] = useState<string>('');
    const navigate   = useNavigate();
    const { logout, isGuest } = useAuth();

    useEffect(()=>{

        const getTasksResponse = async ()=>{
            const responseTasks = isGuest ? getStorageTasks() : await getTasks();
            setTasks(responseTasks || []);
        }
        getTasksResponse();
    },[])

    const handleAddItem = async () =>{
        if(!taskName) return;
        
        const task: Task | null = await addTask(taskName);
        if(!task) return;

        setTasks([...tasks,task ]);
        setTaskName('');
    }

    const handleAddItemKeyEvent = async (e: React.KeyboardEvent<HTMLInputElement>) =>{
        e.preventDefault();
        e.stopPropagation();

        if(e.key === 'Enter'){
            handleAddItem();
        }
    }

    const handleAttendTask = async () =>{
        if( !tasks || !tasks?.length ) return;

        const attendTask: Task = tasks[0];
        if(!attendTask?.id) return;

        const taskDelete = await deleteTask(attendTask.id);
        if(!taskDelete) return;

        setTasks(tasks.filter(task => task.id !== attendTask?.id));
    }

    const handleLogout = async () =>{
        await logout();
        navigate('/login');
    }

    return (
        <div className="flex h-screen gap-4 items-center justify-center">
            <div className="grid grid-cols-12 w-[50vw] gap-4">
                <div className="col-span-4 flex flex-col gap-2 border p-4 rounded-lg bg-white h-max">
                    <input type="text" className="border p-2" placeholder="Item Name" value={taskName} onKeyUp={handleAddItemKeyEvent} onChange={(e)=> setTaskName(e.target.value)} />
                    <button type="button" className="text-white bg-blue-300 px-3 py-1 rounded-sm" onClick={handleAddItem}>Add item</button>
                </div>
                <div className="col-span-4 border px-1 h-96 bg-white rounded-lg overflow-hidden">
                    <TaskList tasks={tasks} />
                </div>
                <div className="col-span-4 flex flex-col gap-2 border p-4 rounded-lg bg-white h-max">
                    <button type="button" className="text-white bg-blue-300 px-3 py-1 rounded-sm" onClick={handleAttendTask}>Attend item</button>
                    <button type="button" className="text-white bg-blue-300 px-3 py-1 rounded-sm" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    );
}