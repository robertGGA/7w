import styles from './TableRow.style.module.sass';
import Icon from "../Icon/Icon";
import React, {CSSProperties, useState} from "react";
import {Formik, FormikValues} from 'formik';
import {OutlayRowRequest, OutlayRowUpdateRequest, TreeResponse} from "../../../models";
import {createRow, deleteRow, updateRow} from "../../../api";
import {removeItemFromTree, updateTree} from "./TableRow.service";

interface rowProps {
    style?: CSSProperties,
    columnsData: TreeResponse,
    updateState: Function,
    isEmpty?: boolean,
}

export function TableRow({style, columnsData, updateState, isEmpty = false}: rowProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditable, setIsEditable] = useState(isEmpty);

    const dragStartHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovered(true);
        e.preventDefault();
    }

    const changeRow = () => {
        if (!isEmpty) {
            setIsEditable(!isEditable);
        }
    }

    const dragEndHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovered(false);
        e.preventDefault();
    }

    const removeItem = (e: any) => {
        e.preventDefault();
        deleteRow(columnsData.id).then(() => {
            updateState((v: Array<TreeResponse>) => removeItemFromTree(v, columnsData.id));
        }).catch(() => {
            alert('Что-то пошло не так');
        })
    }

    const createItem = (item: OutlayRowRequest) => {
        createRow(item).then((r) => {
            if (columnsData.child) {

            } else {
                updateState((v: any) => [...v, r.data.current]);
            }
            setIsEditable(false);
        }).catch(() => {
            alert('Неверный id');
        })
    }

    const onSubmitRow = (values: FormikValues) => {
        if (isEmpty) {
            const item: OutlayRowRequest = {
                equipmentCosts: Number(values.equipment),
                estimatedProfit: Number(values.profit),
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: Number(values.expenses),
                parentId: null,
                rowName: values.work,
                salary: Number(values.salary),
                supportCosts: 0
            }
            createItem(item);
        } else {
            const item: OutlayRowUpdateRequest = {
                equipmentCosts: Number(values.equipment),
                estimatedProfit: Number(values.profit),
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: Number(values.expenses),
                rowName: values.work,
                salary: Number(values.salary),
                supportCosts: 0
            }
            updateRow(columnsData.id, item).then(() => {
                updateState((v: any) => {
                    return updateTree(v, columnsData.id, item)
                });
                setIsEditable(false);
            }).catch(() => {
                alert('Неверный id');
            })
        }
    };

    return (
        <Formik
            initialValues={{
                work: columnsData.rowName ?? '',
                salary: columnsData.salary ?? 0,
                equipment: columnsData.equipmentCosts ?? 0,
                expenses: columnsData.overheads ?? 0,
                profit: columnsData.estimatedProfit ?? 0
            }}
            enableReinitialize
            onSubmit={(values) => {
                onSubmitRow(values);
            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <form onDoubleClick={changeRow}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                              handleSubmit();
                          }
                      }}
                      className={styles.row}
                >
                    {!isHovered || isEditable ?
                        <div style={style} className={styles.container} onMouseEnter={(e) => dragStartHandler(e)}>
                            <Icon name='level' width={16} height={16}/>
                        </div> :
                        <div style={style} className={styles.delete__container} onMouseLeave={(e) => dragEndHandler(e)}>
                            <Icon name='level' width={16} height={16}/>
                            <button onClick={(e) => removeItem(e)}>
                                <Icon name='trash' width={16} height={16}/>
                            </button>
                        </div>
                    }
                    {isEditable ?
                        <>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="work"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.work}
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="salary"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.salary}
                                    pattern="[0-9]*"
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="equipment"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.equipment}
                                    pattern="[0-9]*"
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="expenses"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expenses}
                                    pattern="[0-9]*"
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="profit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profit}
                                    pattern="[0-9]*"
                                />
                            </div>
                        </>
                        :
                        <>
                            <div>{columnsData.rowName}</div>
                            <div>{columnsData.salary}</div>
                            <div>{columnsData.equipmentCosts}</div>
                            <div>{columnsData.overheads}</div>
                            <div>{columnsData.estimatedProfit}</div>
                        </>
                    }
                </form>
            )}
        </Formik>
    )
}