import styles from "./styles.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/context"
// import { getTasks } from "@/utils/taskFunctions"
import { appDataType } from "@/types/appData"

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
    const { data, mode, setData } = useContext(AppContext)

    const [selectedFilter, setSelectedFilter] = useState<selectedFilterType>("all")
    const ref = useRef<appDataType[]>([])

    // FILTRO NAO FUNCIONA!
    const fetchFilteredTasks = (filter: selectedFilterType) => 
    {
        const allTasks = ref.current;
        console.log("allTasks", allTasks)

        switch (filter) {
            case "all":
                return allTasks;
            case "active":
                const activeTasks = allTasks.filter((task: appDataType) => task.taskCompleted === false);
                console.log("Active tasks", activeTasks, ref);
                return activeTasks;
            case "completed":
                return allTasks.filter((task: appDataType) => task.taskCompleted);
            default:
                return allTasks;
        }
    
    };

    useEffect(() => 
    {
        console.log('acionou')
        const initialFilteredTasks = fetchFilteredTasks('all')
        ref.current = initialFilteredTasks
        setData(initialFilteredTasks)
    }, [setData])

    const handleFilterChange = (filter: selectedFilterType) => 
    {
        setSelectedFilter(filter)
        const filteredTasks = fetchFilteredTasks(filter)
        setData([...filteredTasks])
    }

    return (
        <div style={{ background: mode === 'dark' ? '#241e32' : 'white' }} className={styles.footerFilter}>
            <div className={styles.content}>
                <p className={styles.info}>{data.length} Items left</p>
                <div className={styles.controls}>
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="all" 
                        handler={() => handleFilterChange('all')}
                    />
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="active" 
                        handler={() => handleFilterChange('active')}
                    />
                    <FilterButton 
                        selectedFilter={selectedFilter} 
                        setSelectedFilter={setSelectedFilter} 
                        type="completed" 
                        handler={() => handleFilterChange('completed')}
                    />
                </div>
                <p className={styles.filter}>Clear Completed</p>
            </div>
        </div>
    );
}