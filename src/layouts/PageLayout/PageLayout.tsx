import Header from "../../components/Header/Header";
import {NavLink, Outlet} from "react-router-dom";
import Icon from "../../components/UI/Icon/Icon";
import styles from './PageLayout.style.module.sass';


export function PageLayout() {
    return (
        <div className={styles.layout}>
            <Header>
                <button>
                    <Icon name={'menu'} width={24} height={24}/>
                </button>

                <button>
                    <Icon name={'share'} width={24} height={24}/>
                </button>

                <nav className={styles.nav}>
                    <NavLink to="/" className={({isActive}) =>
                        isActive ? styles.nav__link_active : styles.nav__link
                    }>
                        Просмотр
                    </NavLink>

                    <NavLink to="/control" className={({isActive}) =>
                        isActive ? styles.nav__link_active : styles.nav__link
                    }>
                        Управление
                    </NavLink>
                </nav>
            </Header>
            <Outlet/>
        </div>
    )
}