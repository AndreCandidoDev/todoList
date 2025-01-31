import { useContext } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import Image from "next/image"

export const HeaderList: React.FC = () =>
{
    const { mode, setMode } = useContext(AppContext)

    const handleMode = () =>
    {
        if(mode === 'dark')
        {
            setMode("light")
            return
        }

        setMode("dark")
    }

    const getIcon = () =>
    {
        return mode === 'dark' ? "/svg/icon-sun.svg" : "/svg/icon-moon.svg"
    }

    return (
        <div className={styles.headerList}>
            <h1>TODO</h1>
            <button onClick={() => handleMode()}>
                <Image
                    priority    
                    src={getIcon()}
                    height={20}
                    width={20}
                    alt=""
                />
            </button>
        </div>
    )
}