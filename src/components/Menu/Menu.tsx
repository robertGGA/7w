import {MenuTypes} from "./Menu.types";
import {MenuItem} from "../UI/MenuItem/MenuItem";
import styles from './Menu.style.module.sass';
import Icon from "../UI/Icon/Icon";


export function Menu({data}: MenuTypes) {
    return (
        <div className={styles.menu__wrapper}>
            <div className={styles.menu}>
                {data.map((item) =>
                    <MenuItem key={item.id} name={item.name} url={item.id.toString()}/>
                )}
            </div>
        </div>

    )
}