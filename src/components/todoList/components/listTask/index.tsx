import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { useContext, useEffect, useState } from "react"
import { FooterFilter } from "../footerFilter"
import { TaskRow } from "../taskRow"
import { updatePositions } from "@/utils/taskFunctions"

export const ListTask: React.FC = () =>
{
    const { data, mode } = useContext(AppContext)

    const [dataTable, setDataTable] = useState([])

    useEffect(() => 
    {
        const newData = [...data]
        setDataTable([...newData])
    }, [data])

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, indexDropped: number) => 
    {
        e.preventDefault()
        
        const indexDragged = parseInt(e.dataTransfer.getData("index"))
        
        if (indexDragged !== indexDropped) 
        {
            const updatedData = [...dataTable]
            
            const [draggedItem] = updatedData.splice(indexDragged, 1)
            
            updatedData.splice(indexDropped, 0, draggedItem)
            
            setDataTable(updatedData)

            updatePositions(indexDragged, indexDropped)
        }
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => 
    {
        e.dataTransfer.setData("index", String(index))
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => 
    {
        e.preventDefault()
    }

    const emptyListClassName = () =>
    {
        if(mode === 'dark')
        {
            return styles.emptyList + " " + styles.emptyListDark
        }

        return styles.emptyList + " " + styles.emptyListLight
    }

    return (
        <div className={styles.listTask}>
            <div className={styles.content}>
                {dataTable.map((task, key) => (
                    <div
                        className={styles.drag} 
                        key={key} 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, key)}
                        onDrop={(e) => handleDrop(e, key)}
                        onDragOver={handleDragOver}
                    >
                        <TaskRow task={task} />
                    </div>
                ))}

                {dataTable.length === 0 && (
                    <div className={emptyListClassName()}>
                        <p>Empty List, there is not a task for a while :)</p>
                    </div>
                )}
            </div>
            <FooterFilter />
        </div>
    )
}