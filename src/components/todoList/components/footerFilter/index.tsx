import styles from "./styles.module.scss"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context"
import { selectedFilterType } from "@/types/selectedFilter"
import { FilterButton } from "../filterButton"

export const FooterFilter: React.FC = () =>
{
    const { 
        mode,
        activeTasksCounter,
        setActiveTasksCounter, 
        getTasks, 
        getActiveTasks, 
        getCompletedTasks, 
        clearCompletedTasks,
        countActiveTasks,
    } = useContext(AppContext)

    const [selectedFilter, setSelectedFilter] = useState<selectedFilterType>("all")

    useEffect(() => 
    {
        getTasks()

        const counter = countActiveTasks()
        setActiveTasksCounter(counter)
    }, [])

    const footerFilterClassName = () =>
    {
        if(mode === 'dark')
        {
            return styles.footerFilter + " " + styles.footerFilterDark
        }

        return styles.footerFilter + " " + styles.footerFilterLight
    }

    return (
        <div className={footerFilterClassName()}>
            <div className={styles.content}>
                <p className={styles.info}>{activeTasksCounter} Items Left</p>
                <div className={styles.controls}>
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="all" 
                        handler={() => getTasks()}
                    />
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="active" 
                        handler={() => {getActiveTasks()}}
                    />
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="completed" 
                        handler={() => getCompletedTasks()}
                    />
                </div>
                <p 
                    className={styles.filter} 
                    onClick={() => clearCompletedTasks()}
                >
                    Clear Completed
                </p>
            </div>
        </div>
    );
}