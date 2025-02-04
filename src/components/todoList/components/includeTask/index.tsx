import styles from "./styles.module.scss"
import { BaseSyntheticEvent, useContext, useRef, useState } from "react"
import { AppContext } from "@/context"
import { CustomCheckbox } from "../customCheckbox"
import { addTask } from "@/utils/taskFunctions"

export const IncludeTask: React.FC = () =>
{
    const { mode, setData, data } = useContext(AppContext)

    const [activeTask, setActiveTask] = useState<boolean>(false)
    const [taskText, setTextTask] = useState<string>("")

    const ref = useRef<HTMLInputElement>(null)

    const resetInputs = () =>
    {
        setActiveTask(false)
        setTextTask("")

        if(ref.current)
        {
            ref.current.value = ""
        }
    }

    const handleTask = () =>
    {
        const id = data.length > 0 ? data[data.length - 1].id + 1 : 1

        const newData = data

        const dataObj = { id: id,  taskCompleted: activeTask, name: taskText }

        const result = addTask(dataObj)

        if(result)
        {
            newData.push(dataObj)

            setData([...newData])

            resetInputs()
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    {
        if(e.key === 'Enter' && taskText !== "")
        {
            handleTask()
        }
    }

    return (
        <div 
            style={{ background: mode === 'dark' ? "#241e32" : "white" }}
            className={styles.includeTask} 
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKey(e)}
        >
            <div className={styles.content}>
                <CustomCheckbox activeTask={activeTask} setActiveTask={setActiveTask}/>
                <input 
                    type="text" 
                    placeholder="Create a new todo..."
                    defaultValue={taskText}
                    onChange={(e: BaseSyntheticEvent) => setTextTask(e.target.value)}
                    ref={ref}
                />
            </div>
        </div>
    )
}