"use client"
import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { useContext } from "react"
import { TodoList } from "../todoList"

export const MainApp: React.FC = () =>
{
    const { mode } = useContext(AppContext)

    return (
        <div className={styles.mainApp}>
            <TodoList/>
            <div className={styles.content}>
                <div className={mode === 'dark' ? styles.bannerDark : styles.bannerLight}/>
                <div className={mode === 'dark' ? styles.footerDark : styles.footerLight}>
                    <div></div>
                    <div className={styles.lineInfo}>
                        <p>Drag and drop to reorder list</p>
                    </div>
                </div>
            </div>
        </div>
    )
}