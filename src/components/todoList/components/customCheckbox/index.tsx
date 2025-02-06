import Image from "next/image"
import styles from "./styles.module.scss"

interface customCheckboxProps {
    activeTask: boolean
    setActiveTask: React.Dispatch<React.SetStateAction<boolean>>
    handler?: () => void
}

export const CustomCheckbox: React.FC<customCheckboxProps> = ({ 
    activeTask, 
    setActiveTask,
    handler 
}) =>
{
    const handleCheckbox = () =>
    {
        setActiveTask(!activeTask)

        if(handler)
        {
            handler()
        }
    }
 
    return (
        <div 
            className={styles.customCheckbox} 
            onClick={() => handleCheckbox()}
            style={{background: activeTask ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))" : "transparent"}}
        >
            <div className={styles.content}>
                {activeTask && (
                    <Image
                        priority    
                        src={"/svg/icon-check.svg"}
                        height={10}
                        width={10}
                        alt=""
                    />
                )}
            </div>
        </div>
    )
}