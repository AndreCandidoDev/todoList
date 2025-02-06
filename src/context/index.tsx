"use client"
import { appDataType } from '@/types/appData'
import { deleteTask, getTasksStorage } from '@/utils/taskFunctions';
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

type modeOptions = "light" | "dark"

interface appContextType {
  mode: modeOptions
  data: appDataType[]
  activeTasksCounter: number
  setData: React.Dispatch<React.SetStateAction<appDataType[]>>
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>
  setActiveTasksCounter: React.Dispatch<React.SetStateAction<number>>
  getTasks: () => void
  getActiveTasks: () => void
  getCompletedTasks: () => void
  clearCompletedTasks: () => void
  countActiveTasks: () => number
}

const defaultProvider: appContextType = {
  mode: "dark",
  data: [],
  activeTasksCounter: 0,
  setData: () => {},
  setMode: () => {},
  setActiveTasksCounter: () => {},
  getTasks: () => {},
  getActiveTasks: () => {},
  getCompletedTasks: () => {},
  clearCompletedTasks: () => {},
  countActiveTasks: () => 0
}

const AppContext = createContext<appContextType>(defaultProvider)

const AppProvider = ({ children }: Props) =>
{
  const [data, setData] = useState<appDataType[]>(defaultProvider.data)
  const [mode, setMode] = useState<modeOptions>(defaultProvider.mode)
  const [activeTasksCounter, setActiveTasksCounter] = useState<number>(defaultProvider.activeTasksCounter)

  const getTasks = () =>
  {
    const storage = getTasksStorage()

    if(storage)
    {
      setData([...storage])
    }
  }

  const getActiveTasks = () => 
  {
    const storage = getTasksStorage()

    if(storage)
    {      
      const storageFiltered = storage.filter((item: appDataType) => !item.taskCompleted)
      
      setData([...storageFiltered])
    }
  }

  const getCompletedTasks = () => 
  {
    const storage = getTasksStorage()
    
    if(storage)
    {
      const storageFiltered = storage.filter((item: appDataType) => item.taskCompleted)
      
      setData([...storageFiltered])
    }
  }

  const clearCompletedTasks = () =>
  {
    const storage = getTasksStorage()

    if(storage)
    {
      const completedTasks = storage.filter((item: appDataType) => item.taskCompleted)
      
      for(let i = 0; i < completedTasks.length; i++)
      {
        const result = deleteTask(completedTasks[i])

        if(!result)
        {
          console.error("Error in clear Completed")
          break
        }
      }

      getTasks()
    }
  }

  const countActiveTasks = () =>
  {
    const storage = getTasksStorage()
    
    if(storage)
    {
      const actives = storage.filter((item: appDataType) => !item.taskCompleted)

      return actives.length
    }

    return 0
  }

  const values = {
    data,
    mode,
    activeTasksCounter,
    setData,
    setMode,
    setActiveTasksCounter,
    getTasks,
    getActiveTasks,
    getCompletedTasks,
    clearCompletedTasks,
    countActiveTasks,
  }

  return (<AppContext.Provider value={values}>{children}</AppContext.Provider>)
}

export { AppContext, AppProvider };