import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { useContext, useEffect, useState } from "react"
import { FooterFilter } from "../footerFilter"
import { TaskRow } from "../taskRow"

export const ListTask = () =>
{
    const { data } = useContext(AppContext)

    const [dataTable, setDataTable] = useState([])

    useEffect(() => 
    {
        const newData = [...data]
        setDataTable([...newData])
    }, [data])

    return (
        <div className={styles.listTask}>
            <div className={styles.content}>
                {dataTable.map((task, key) => (
                    <TaskRow key={key} task={task}/>
                ))}
            </div>
            <FooterFilter/>
        </div>
    )
}