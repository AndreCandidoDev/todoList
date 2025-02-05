import styles from "./styles.module.scss"
import { selectedFilterType } from "@/types/selectedFilter"

interface filterButtonProps {
    type: selectedFilterType
    selectedFilter: selectedFilterType
    setSelectedFilter: React.Dispatch<React.SetStateAction<selectedFilterType>>
    handler: () => void
}

export const FilterButton: React.FC<filterButtonProps> = ({ 
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