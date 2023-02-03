import styles from './Table.style.module.sass';
import {TableRow} from "../UI/TableRow/TableRow";
import {CSSProperties, useCallback} from "react";
import {TreeResponse} from "../../models";

interface TableData {
    data: Array<TreeResponse> | undefined,
    nesting?: number,
    style?: CSSProperties,
    updateState: Function
}

export function Table({data, nesting = 0, style, updateState}: TableData) {
    const cachedFunc = useCallback(updateState, [data?.length])

    return (
        <div className={(nesting === 0) ? styles.table : styles.table__nested}>
            {(nesting === 0) && <div className={styles.table__row}>
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
            </div>}
            <>
                {data?.length ? data.map((item: TreeResponse) => (
                        <div key={item.id}>
                            <TableRow  style={style} updateState={cachedFunc}
                                      columnsData={item}/>
                            {(item.child && item.child.length) ?
                                <Table key={item.id} updateState={updateState} style={{marginLeft: 12 * (nesting + 1)}}
                                       nesting={nesting + 1}
                                       data={item.child}/> : null}
                        </div>
                    )) :
                    <TableRow  isEmpty={true} style={style} updateState={cachedFunc} columnsData={{} as TreeResponse}/>
                }
            </>
        </div>
    )
}