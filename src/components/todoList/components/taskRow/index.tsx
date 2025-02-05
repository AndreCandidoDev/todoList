import { useContext, useEffect, useRef, useState } from "react"
import { CustomCheckbox } from "../customCheckbox"
import styles from "./styles.module.scss"
import { appDataType } from "@/types/appData"
import Image from "next/image"
import { AppContext } from "@/context"
import { deleteTask, editTask } from "@/utils/taskFunctions"

interface TaskRowProps {
    task: appDataType
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) =>
{
    const { mode, getTasks } = useContext(AppContext)

    const [active, setActive] = useState(false)
    const [taskName, setTaskName] = useState("")

    const ref = useRef(null)

    useEffect(() => 
    {
        if(task.taskCompleted)
        {
            setActive(true)
        }
        else
        {
            setActive(false)
        }

        setTaskName(task.name)

        if(ref.current)
        {
            ref.current.value = task.name
        }
    }, [task])

    const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const name = e.target.value

        const editedData = {
            ...task,
            name:name
        }

        const result = editTask(editedData)

        if(result)
        {
            return
        }
    }

    const handleTaskCompletion = () =>
    {
        const editedData = {
            ...task,
            taskCompleted: !active
        }

        const result = editTask(editedData)

        if(result)
        {
            return
        }
    }

    const handleDeleteTask = () => 
    {
        const result = deleteTask(task)

        if(result)
        {
            getTasks()
        }
    }

    return (
        <div 
            className={styles.taskRow}
            style={{ background: mode === 'dark' ? "#241e32" : "white" }}
        >
            {task && (
                <div className={styles.content}>
                    <div className={styles.taskInput}>    
                        <CustomCheckbox 
                            activeTask={active} 
                            setActiveTask={setActive}
                            handler={handleTaskCompletion}
                        />
                        <input
                            style={{ color: mode === 'dark' ? 'white' : 'black' }} 
                            ref={ref} 
                            defaultValue={taskName}
                            onChange={(e) => handleTaskName(e)}
                        />
                    </div>
                    <Image
                        style={{ cursor: 'pointer' }}
                        priority    
                        src={"/svg/icon-cross.svg"}
                        height={20}
                        width={20}
                        alt=""
                        onClick={() => handleDeleteTask()}
                    />    
                </div>
            )}
        </div>
    )
}