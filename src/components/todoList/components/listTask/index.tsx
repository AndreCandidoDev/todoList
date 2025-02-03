import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { appDataType } from "@/types/appData"
import { useContext } from "react"
import { IncludeTask } from "../includeTask"
import { FooterFilter } from "../footerFilter"

export const ListTask = () =>
{
    const { data } = useContext(AppContext)

    console.log("data", data)

    return (
        <div className={styles.listTask}>
            <div className={styles.content}>
                {data.length > 0 && (
                    data.map((item: appDataType, key: number) => (
                        <IncludeTask key={key} dataTask={item}/>
                    ))
                )}
            </div>
            <FooterFilter/>
        </div>
    )
}