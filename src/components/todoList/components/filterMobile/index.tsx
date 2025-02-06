import { useContext, useState } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { selectedFilterType } from "@/types/selectedFilter"
import { FilterButton } from "../filterButton"

export const FilterMobile: React.FC = () =>
{
    const [selectedFilter, setSelectedFilter] = useState<selectedFilterType>("all")

    const { getTasks, getActiveTasks, getCompletedTasks, mode } = useContext(AppContext)

    const filterMobileClassName = () =>
    {
        if(mode === 'dark')
        {
            return styles.filterMobile + " " + styles.filterMobileDark
        }

        return styles.filterMobile + " " + styles.filterMobileLight
    }

    return (
        <div className={filterMobileClassName()}>
            <div className={styles.content}>
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
        </div>
    )
}