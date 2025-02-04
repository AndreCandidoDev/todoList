import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { useContext, useEffect, useState } from "react"
import { IncludeTask } from "../includeTask"
import { FooterFilter } from "../footerFilter"
import { appDataType } from "@/types/appData"

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
            {/* <div style={{ color: 'white', height:"300px" }}>
                {dataTable.map((task) => (
                    <div key={task.id}>
                        <p>{task.name} - {task.taskCompleted ? 'Completed' : 'Active'}</p>
                    </div>
                ))}
            </div> */}
            <div className={styles.content}>
                {dataTable.length > 0 && (
                    dataTable.map((item: appDataType, key: number) => (
                        <IncludeTask key={key} dataTask={item}/>
                    ))
                )}
            </div>
            <FooterFilter/>
        </div>
    )
}