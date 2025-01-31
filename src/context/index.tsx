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
}

const defaultProvider: appContextType = {
    mode: "dark",
    data: [],
    setData: () => {},
    setMode: () => {},
}

const AppContext = createContext<appContextType>(defaultProvider)

const AppProvider = ({ children }: Props) =>
{
  const [data, setData] = useState<appDataType[]>(defaultProvider.data)
  const [mode, setMode] = useState<modeOptions>(defaultProvider.mode)

  const values = {
    data,
    mode,
    setData,
    setMode,
  }

  return (<AppContext.Provider value={values}>{children}</AppContext.Provider>)
}

export { AppContext, AppProvider };