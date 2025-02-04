"use client"
import { appDataType } from '@/types/appData'
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

type modeOptions = "light" | "dark"

interface appContextType {
  mode: modeOptions
  data: appDataType[]
  setData: React.Dispatch<React.SetStateAction<appDataType[]>>
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>
  getTasks: () => void
  getActiveTasks: () => void
  getCompletedTasks: () => void
}

const defaultProvider: appContextType = {
  mode: "dark",
  data: [],
  setData: () => {},
  setMode: () => {},
  getTasks: () => {},
  getActiveTasks: () => {},
  getCompletedTasks: () => {},
}

const AppContext = createContext<appContextType>(defaultProvider)

const AppProvider = ({ children }: Props) =>
{
  const [data, setData] = useState<appDataType[]>(defaultProvider.data)
  const [mode, setMode] = useState<modeOptions>(defaultProvider.mode)

  const getTasks = () =>
  {
    const storage = localStorage.getItem("tasks")
    if(storage)
    {
      const dataStorage = JSON.parse(storage)
      console.log("DataStorage", dataStorage)
      setData([...dataStorage])
    }
  }

  const getActiveTasks = () => 
  {
    const storage = localStorage.getItem("tasks")
    if(storage)
    {
      let dataStorage = JSON.parse(storage)
      dataStorage = dataStorage.filter((item: appDataType) => item.taskCompleted === false)
      console.log("DataStorage active", dataStorage)
      setData([...dataStorage])
    }
  }

  const getCompletedTasks = () => 
  {
    const storage = localStorage.getItem("tasks")
    
    if(storage)
    {
      let dataStorage = JSON.parse(storage)
      dataStorage = dataStorage.filter((item: appDataType) => item.taskCompleted === true)
      console.log("DataStorage completed", dataStorage)
      setData([...dataStorage])
    }
  }

  const values = {
    data,
    mode,
    setData,
    setMode,
    getTasks,
    getActiveTasks,
    getCompletedTasks,
  }

  return (<AppContext.Provider value={values}>{children}</AppContext.Provider>)
}

export { AppContext, AppProvider };