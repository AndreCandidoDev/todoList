import { FilterMobile } from "./components/filterMobile"
import { HeaderList } from "./components/headerList"
import { IncludeTask } from "./components/includeTask"
import { ListTask } from "./components/listTask"
import styles from "./styles.module.scss"

export const TodoList: React.FC = () =>
{
    return (
        <div className={styles.todoList}>
            <HeaderList/>
            <div className={styles.spacerHeader}/>
            <IncludeTask/>
            <div className={styles.spacerList}/>
            <ListTask/>
            <div className={styles.filterMobile}>
                <div className={styles.spacerFilter}/>
                <FilterMobile/>
            </div>
        </div>
    )
}