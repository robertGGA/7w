import styles from './Table.style.module.sass';
import {TableRow} from "../UI/TableRow/TableRow";
import {CSSProperties} from "react";

interface TableData {
    data: Array<any>,
    isFirst?: boolean,
    style?: CSSProperties
}

export function Table({data, isFirst = true, style}: TableData) {

    const toTree = (elem: any) => {
        elem.forEach((item: any) => {
            if (item.child) {
                toTree(item.child);
            }
        })
    }
    return (
        <div style={style} className={isFirst ? styles.table : styles.table__nested}>
            {isFirst ? <div className={styles.table__row}>
                <div>
                    Уровень
                </div>
                <div>
                    Наименование работ
                </div>
                <div>
                    Основная з/п
                </div>
                <div>
                    Оборудование
                </div>
                <div>
                    Накладные расходы
                </div>
                <div>
                    Сметная прибыль
                </div>
            </div> : null}
            <div>
                {data.map((item: any) => (
                    <>
                        <TableRow key={item.name} name={item.name} columnsData={['test', '333', '4444', '5555', '6666']}/>
                        {(item.child && item.child.length) ? <Table isFirst={false} data={item.child}/> : null}
                    </>
                ))}
            </div>
        </div>
    )
}