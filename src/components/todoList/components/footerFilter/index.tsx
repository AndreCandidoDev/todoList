import styles from "./styles.module.scss"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context"

type selectedFilterType = 'all' | 'active' | 'completed'

interface filterButtonProps {
    type: selectedFilterType
    selectedFilter: selectedFilterType
    setSelectedFilter: React.Dispatch<React.SetStateAction<selectedFilterType>>
    handler: () => void
}

const FilterButton: React.FC<filterButtonProps> = ({ 
    selectedFilter, 
    setSelectedFilter,
    type,
    handler 
}) => 
{
    const handleButton = () =>
    {
        setSelectedFilter(type)
        handler()
    }

    return (
        <p 
            className={selectedFilter === type ? styles.selected : styles.filter}
            onClick={() => handleButton()}
        >
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
    )
}

export const FooterFilter: React.FC = () =>
{
    const { 
        mode, 
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
    }, [])

    return (
        <div 
            style={{ background: mode === 'dark' ? '#241e32' : 'white' }} 
            className={styles.footerFilter}
        >
            <div className={styles.content}>
                <p className={styles.info}>{countActiveTasks()} Items Left</p>
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