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

    const contentClassName = () =>
    {
        if(mode === 'dark')
        {
            return styles.taskRow + " " + styles.taskRowDark
        }
        
        return styles.taskRow + " " + styles.taskRowLight
    }

    const inputClassName = () =>
    {
        const activeClass = active ? styles.inputRisk : ""

        if(mode === 'dark')
        {
            return styles.input + " " + styles.inputDark + " " + activeClass
        }

        return styles.input + " " + styles.inputLight + " " + activeClass
    }

    return (
        <div className={contentClassName()}>
            {task && (
                <div className={styles.content}>
                    <div className={styles.taskInput}>    
                        <CustomCheckbox 
                            activeTask={active} 
                            setActiveTask={setActive}
                            handler={handleTaskCompletion}
                        />
                        <input
                            className={inputClassName()}
                            ref={ref} 
                            defaultValue={taskName}
                            onChange={(e) => handleTaskName(e)}
                            disabled={active ? true : false}
                        />
                    </div>
                    <Image
                        priority    
                        src={"/svg/icon-cross.svg"}
                        height={10}
                        width={10}
                        alt=""
                        onClick={() => handleDeleteTask()}
                    />    
                </div>
            )}
        </div>
    )
}