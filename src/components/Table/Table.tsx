import styles from './Table.style.module.sass';
import {TableRow} from "../UI/TableRow/TableRow";
import {CSSProperties} from "react";

interface TableData {
    data: Array<any>,
    nesting?: number,
    style?: CSSProperties
}

export function Table({data, nesting = 0, style}: TableData) {

    const toTree = (elem: any) => {
        elem.forEach((item: any) => {
            if (item.child) {
                toTree(item.child);
            }
        })
    }

    const addIndent = () => {
        console.log(style);
    }

    return (
        <div className={nesting === 0 ? styles.table : styles.table__nested}>
            {nesting === 0 ? <div className={styles.table__row}>
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
                        <TableRow style={style} key={item.name} name={item.name} columnsData={['test', '333', '4444', '5555', '6666']}/>
                        {(item.child && item.child.length) ? <Table style={{marginLeft: 12 * (nesting + 1)}} nesting={nesting + 1} data={item.child}/> : null}
                    </>
                ))}
            </div>
        </div>
    )
}