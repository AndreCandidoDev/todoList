import { appDataType } from "@/types/appData"

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
