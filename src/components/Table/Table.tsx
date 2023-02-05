import styles from './Table.style.module.sass';
import {TableRow} from "../UI/TableRow/TableRow";
import {CSSProperties, useCallback} from "react";
import {TreeResponse} from "../../models";

interface TableData {
    tree: Array<TreeResponse> | undefined,
    nesting?: number,
    style?: CSSProperties,
    updateState: Function,
    mainTree: Array<TreeResponse> | undefined
}

export function Table({tree, nesting = 0, style, updateState, mainTree}: TableData) {
    const cachedFunc = useCallback(updateState, [tree?.length]);

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
                {tree?.length ? tree.map((item: TreeResponse, index) => (
                        <div key={item.id ? item.id : index}>
                            {item.id ? <TableRow mainTree={mainTree} style={style} updateState={cachedFunc}
                                                 columnsData={item}/> :
                                <TableRow isEmpty={true} mainTree={mainTree} style={style} updateState={cachedFunc}
                                          columnsData={item}/>}
                            {(item.child && item.child.length) ?
                                <Table updateState={updateState} style={{marginLeft: 12 * (nesting + 1)}}
                                       nesting={nesting + 1}
                                       tree={item.child} mainTree={mainTree}/> : null}
                        </div>
                    )) :
                    <TableRow isEmpty={true} style={style} updateState={cachedFunc} columnsData={{} as TreeResponse}/>
                }
            </>
        </div>
    )
}