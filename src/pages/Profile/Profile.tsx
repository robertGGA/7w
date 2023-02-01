import styles from './Profile.style.module.sass';
import {Menu} from "../../components/Menu/Menu";
import {Project} from "../../components/Menu/Menu.types";
import Icon from "../../components/UI/Icon/Icon";
import {Table} from "../../components/Table/Table";

export function Profile() {
    const menuData: Array<Project> = [
        {id: 0, name: 'По проекту'},
        {id: 1, name: 'Объекты'},
        {id: 2, name: 'РД'},
        {id: 3, name: 'МТО'},
        {id: 4, name: 'СМР'},
        {id: 5, name: 'График'},
        {id: 6, name: 'МиМ'},
    ]
    const data = [
        {
            child: [
                {
                    name: 'child1',
                    child: [
                        {
                            child: [
                                {
                                    name: 'child2',
                                    child: [
                                        {
                                            name: 'child3'
                                        }
                                    ]
                                }
                            ],
                            name: 'kek'
                        }
                    ]
                }
            ],
            name: 'parent1'
        },
        {
            name: 'parent2',
            child: [
                {
                    name: 'child3'
                },
                {
                    name: 'child3'
                }
            ]
        }
    ];

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

                <Table data={data} />
            </div>
        </main>
    )
}