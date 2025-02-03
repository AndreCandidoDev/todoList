import Image from "next/image"
import styles from "./styles.module.scss"

interface customCheckboxProps {
    activeTask: boolean
    setActiveTask: React.Dispatch<React.SetStateAction<boolean>>
}

export const CustomCheckbox: React.FC<customCheckboxProps> = ({ 
    activeTask, 
    setActiveTask 
}) =>
{
    return (
        <div 
            className={styles.customCheckbox} 
            onClick={() => setActiveTask(!activeTask)}
            style={{background: activeTask ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))" : "transparent"}}
        >
            <div className={styles.content}>
                {activeTask && (
                    <Image
                        priority    
                        src={"/svg/icon-check.svg"}
                        height={20}
                        width={20}
                        alt=""
                    />
                )}
            </div>
        </div>
    )
}