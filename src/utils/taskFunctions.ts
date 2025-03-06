import { appDataType } from "@/types/appData"

export const getTasksStorage = (): appDataType[] | never =>
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

export const addTask = (task: appDataType): boolean => 
{
    try
    {
        const storage = localStorage.getItem("tasks")
        
        let newData = JSON.parse(storage)
        
        if(newData && newData?.length > 0)
        {
            task.position = newData[newData.length - 1].position + 1

            newData.push(task)

            localStorage.setItem("tasks", JSON.stringify(newData))

            return true
        }
    
        task.position = 0

        newData = [ task ]
    
        localStorage.setItem("tasks", JSON.stringify(newData))
    
        return true
    }
    catch(e)
    {
        console.error("Error", e)
        return false
    }
}

export const editTask = (task: appDataType): boolean =>
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

export const updatePositions = (indexDragged: number, indexDropped: number): void =>
{
    try
    {
        const storage = localStorage.getItem("tasks")
        
        const data = JSON.parse(storage)

        const dragItem = data.find((item: appDataType) => item.position === indexDragged)

        const dropItem = data.find((item: appDataType) => item.position === indexDropped)

        dragItem.position = indexDropped

        dropItem.position = indexDragged

        data.sort((a: appDataType, b: appDataType) => a.position - b.position)

        localStorage.setItem("tasks", JSON.stringify(data))
    }
    catch(e)
    {
        console.error("Error", e)
    }
}

export const deleteTask = (task: appDataType): boolean =>
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