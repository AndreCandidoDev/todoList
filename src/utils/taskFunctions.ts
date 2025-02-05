import { appDataType } from "@/types/appData"

export const getTasksStorage = () =>
{
    if(typeof window !== 'undefined' && window.localStorage)
    {
        const storage = localStorage.getItem("tasks")
        
        if(storage)
        {
            const tasks = JSON.parse(storage)
            return tasks
        }
    
        return null
    }
}

export const addTask = (task: appDataType) => 
{
    try
    {
        const storage = localStorage.getItem("tasks")
        
        if(storage)
        {
            const newData = JSON.parse(storage)

            newData.push(task)

            localStorage.setItem("tasks", JSON.stringify(newData))

            return true
        }
    
        const newData = [ task ]
    
        localStorage.setItem("tasks", JSON.stringify(newData))
    
        return true
    }
    catch(e)
    {
        console.error("Error", e)
        return false
    }
}

export const editTask = (task: appDataType) =>
{
    try
    {
        const storage = localStorage.getItem("tasks")

        const data = JSON.parse(storage)

        const newData = [...data]

        newData.forEach(
            (item) => 
            {
                if(item.id === task.id)
                {
                    item.name = task.name
                    item.taskCompleted = task.taskCompleted
                }
            }
        )
        
        localStorage.setItem("tasks", JSON.stringify(newData))

        return true
    }
    catch(e)
    {
        console.error("Error", e)
        return false
    }
}

export const deleteTask = (task: appDataType) =>
{
    try 
    {
        const storage = localStorage.getItem("tasks")

        const data = JSON.parse(storage)

        const newData = [...data].filter((item) => item.id !== task.id)

        localStorage.setItem("tasks", JSON.stringify(newData))

        return true
    }
    catch(e)
    {
        console.error("Error", e)
        return false
    }
}