import { HeaderList } from "./components/headerList"
import styles from "./styles.module.scss"

export const TodoList: React.FC = () =>
{
    return (
        <div className={styles.todoList}>
            <HeaderList/>
        </div>
    )
}