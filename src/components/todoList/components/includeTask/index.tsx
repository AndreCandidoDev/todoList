import styles from "./styles.module.scss"
import { BaseSyntheticEvent, useContext, useRef, useState } from "react"
import { AppContext } from "@/context"
import { appDataType } from "@/types/appData"
import { CustomCheckbox } from "./components/customCheckbox"

interface IncludeTaskProps {
    dataTask?: appDataType
}

export const IncludeTask: React.FC<IncludeTaskProps> = ({ dataTask }) =>
{
    const { mode, setData, data } = useContext(AppContext)

    const [activeTask, setActiveTask] = useState(dataTask?.active || false)
    const [taskText, setTextTask] = useState(dataTask?.name || "")

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
        if(dataTask)
        {
            // pass
            return
        }

        const id = data.length + 1

        const newData = data

        newData.push({ id: id,  active: activeTask, name: taskText })
        
        setData([...newData])

        resetInputs()
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    {
        if(e.key === 'Enter' && taskText !== "")
        {
            console.log("uhul")
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