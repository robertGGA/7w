import styles from './Profile.style.module.sass';
import {Menu} from "../../components/Menu/Menu";
import {Project} from "../../components/Menu/Menu.types";
import Icon from "../../components/UI/Icon/Icon";
import {Table} from "../../components/Table/Table";
import {useEffect, useState} from "react";
import {getTreeData} from "../../api";
import {TreeResponse} from "../../models";

export function Profile() {
    const menuData: Array<Project> = [
        {id: 0, name: 'По проекту'},
        {id: 1, name: 'Объекты'},
        {id: 2, name: 'РД'},
        {id: 3, name: 'МТО'},
        {id: 4, name: 'СМР'},
        {id: 5, name: 'График'},
        {id: 6, name: 'МиМ'},
    ];
    const [tree, setTree] = useState<Array<TreeResponse>>();

    useEffect(() => {
        const getResult = async () => {
            getTreeData().then(r => {
                setTree(r.data);
            })
        };
        getResult();
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.menu}>
                <div className={styles.menu__description}>
                    <div className={styles.column}>
                        <h3>
                            Название проекта
                        </h3>
                        <span>
                        Аббревиатура
                    </span>
                    </div>

                    <Icon name={"down-arrow"} width={24} height={24}/>
                </div>
                <Menu data={menuData}/>
            </div>
            <div className={styles.table__wrapper}>
                <div className={styles.project__container}>
                    <span>
                        Строительно-монтажные работы
                    </span>
                </div>

                <Table updateState={setTree} data={tree} />
            </div>
        </main>
    )
}