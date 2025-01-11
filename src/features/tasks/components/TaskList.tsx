import { Task } from "../../../shared/types/Task.type"

export const TaskList = ({ tasks } : { tasks: Task[] } ) =>{
    return (
        <div className="flex flex-col gap-2 h-full overflow-y-auto">
            {
                tasks?.length ?
                tasks.map((task,i)=>(
                    <div className="text-sm mx-2 mt-3 pb-2 flex items-center border-b" key={'task-'+i}>
                        {task.name}
                    </div>
                ))
            :
                <div className="text-center font-bold text-xl">
                    No items to attend
                </div>
            }
        </div>
    )
}