import { useContext, useState } from "react"
import styles from "./styles.module.scss"
import { AppContext } from "@/context"
import { selectedFilterType } from "@/types/selectedFilter"
import { FilterButton } from "../filterButton"

export const FilterMobile: React.FC = () =>
{
    const [selectedFilter, setSelectedFilter] = useState<selectedFilterType>("all")

    const { getTasks, getActiveTasks, getCompletedTasks, mode } = useContext(AppContext)

    return (
        <div 
            className={styles.filterMobile}
            style={{ background: mode === 'dark' ? '#241e32' : 'white' }}
        >
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