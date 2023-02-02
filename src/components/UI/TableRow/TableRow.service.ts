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
                console.log(result.map(res => res.id === item.id ? item : res));
                result = result.map(res => res.id === item.id ? item : res);
            } else {
                if (tree.every(item => item.id === id) && isArray(tree)) updateTree(item.child, id, newValue);
            }
        })
        return result;
    }
}

