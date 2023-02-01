import {NavLink} from "react-router-dom";
import {MenuItemTypes} from "./MenuItem.types";
import Icon from "../Icon/Icon";
import styles from './MenuItem.style.module.sass';

export function MenuItem({name, url}: MenuItemTypes) {
    return (
        <NavLink className={styles.item} to={url}>
            <Icon height={22} width={22} name={'project-icon'} />
            <span>
                {name}
            </span>
        </NavLink>
    )
}