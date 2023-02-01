import styles from './TableRow.style.module.sass';
import Icon from "../Icon/Icon";
import React, {CSSProperties, MouseEventHandler, useEffect, useState} from "react";
import {Formik} from 'formik';

interface kek {
    name: string,
    style?: CSSProperties,
    columnsData: Array<string>
}

export function TableRow({name, style, columnsData}: kek) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const dragStartHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovered(true);
        e.preventDefault();
    }

    const changeRow = () => {
        setIsEditable(!isEditable);
    }

    const dragEndHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsHovered(false);
        e.preventDefault();
    }

    const removeItem = () => {
        // TODO
    }
    return (
        <Formik
            initialValues={{work: '', salary: '', equipment: '', expenses: '', profit: 0}}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                setIsEditable(false);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}
                      onDoubleClick={changeRow}
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
                            <button onClick={removeItem}>
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
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="equipment"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.equipment}
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="expenses"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expenses}
                                />
                            </div>
                            <div className={styles.input__wrapper}>
                                <input
                                    type="text"
                                    name="profit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profit}
                                />
                            </div>
                        </>
                        :
                        <>
                            {columnsData.map((item) => <div>{item}</div>)}
                        </>
                    }
                </form>
            )}
        </Formik>
    )
}