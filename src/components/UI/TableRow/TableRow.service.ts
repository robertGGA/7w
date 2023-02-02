import * as Yup from 'yup';
import {OutlayRowRequest, OutlayRowUpdateRequest, TreeResponse} from "../../../models";
import {isArray} from "util";

export const RowSchema = Yup.object().shape({
    salary: Yup.number()
        .required('Required'),
    equipment: Yup.number()
        .required('Required'),
    expanses: Yup.number()
        .required('Required'),
    profit: Yup.number()
        .required('Required'),
    work: Yup.string().min(2).max(25).required(),
});

export const updateTree = (tree: Array<TreeResponse>,
                           id: number,
                           newValue: OutlayRowUpdateRequest | OutlayRowRequest) => {
    if (isArray(tree)) {
        let result = [...tree];

        result.forEach((item) => {
            if (item.id === id) {
                item = {
                    ...item,
                    rowName: newValue.rowName,
                    salary: newValue.salary,
                    equipmentCosts: newValue.equipmentCosts,
                    estimatedProfit: newValue.estimatedProfit,
                    overheads: newValue.overheads
                };
                result = result.map(res => res.id === item.id ? item : res);
            } else {
                if (tree.every(item => item.id === id) && isArray(tree)) item.child = updateTree(item.child, id, newValue);
                result = result.map(res => res.id === item.id ? item : res);
            }
        })
        return result;
    }
}

export const removeItemFromTree = (tree: Array<TreeResponse>,
                           id: number) => {
    if (isArray(tree)) {
        let result = [...tree];

        result.forEach((item) => {
            if (item.id === id) {
                result = result.filter((item => item.id !== id));
            } else {
                if (tree.every(item => item.id === id) && isArray(tree)) { // @ts-ignore
                    result = removeItemFromTree(item.child, id);
                }
            }
        })
        return result;
    }
}

