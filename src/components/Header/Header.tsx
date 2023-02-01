import {memo} from "react";
import styles from './Header.style.module.sass';
import {HeaderData} from "./Header.types";


function Header({children, className}: HeaderData) {
    return (
        <header className={className ? className : styles.header}>
            {children}
        </header>
    )
}

export default memo(Header);