import { useContext } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "@/context"

export const FooterFilter = () =>
{
    const { data, mode } = useContext(AppContext)

    return (
        <div
            style={{ background: mode === 'dark' ? '#241e32' : 'white' }} 
            className={styles.footerFilter}
        >
            <div className={styles.content}>
                <p className={styles.info}>{data.length} Items left</p>
                <div className={styles.controls}>
                    <p className={styles.filter}>All</p>
                    <p className={styles.filter}>Active</p>
                    <p className={styles.filter}>Completed</p>
                </div>
                <p className={styles.filter}>Clear Completed</p>
            </div>
        </div>
    )
}