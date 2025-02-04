import styles from "./styles.module.scss"
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/context"
import { appDataType } from "@/types/appData"
import { CustomCheckbox } from "./components/customCheckbox"
import { addTask } from "@/utils/taskFunctions"

interface IncludeTaskProps {
    dataTask?: appDataType
}

export const IncludeTask: React.FC<IncludeTaskProps> = ({ dataTask }) =>
{
    const { mode, setData, data } = useContext(AppContext)

    const [activeTask, setActiveTask] = useState<boolean>(false)
    const [taskText, setTextTask] = useState<string>("")

    const ref = useRef<HTMLInputElement>(null)

    // useEffect(() => 
    // {
    //     if(dataTask)
    //     {
    //         console.log("acionou")
    //         const newData = [...data]
    //         const newObj = newData.find((item) => item.id === dataTask.id)
    //         if(newObj)
    //         {
    //             newObj.taskCompleted = activeTask
    //             newObj.name = taskText

    //             setData([...newData])
    //         }
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataTask, activeTask, taskText])

    useEffect(() => 
    { 
        console.info("@@@@@",dataTask) 
        if(dataTask && ref.current)
        {
            ref.current.value = dataTask.name
            const isActive = dataTask.taskCompleted
            setActiveTask(isActive)
            setTextTask(dataTask.name)
        }    
    }, [dataTask])


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
            return
        }

        const id = data.length + 1

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
                {activeTask && dataTask ?
                    <p className={styles.taskText}>{taskText}</p>
                    :
                    <input 
                        type="text" 
                        placeholder="Create a new todo..."
                        defaultValue={taskText}
                        onChange={(e: BaseSyntheticEvent) => setTextTask(e.target.value)}
                        ref={ref}
                    />
                }
            </div>
        </div>
    )
}