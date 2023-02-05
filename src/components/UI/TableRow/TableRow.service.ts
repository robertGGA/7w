import {OutlayRowRequest, OutlayRowUpdateRequest, RowResponse, TreeResponse} from "../../../models";
import {isArray} from "util";

export const updateTree = (tree: Array<TreeResponse>,
                           id: number | null,
                           newValue: OutlayRowUpdateRequest | OutlayRowRequest | RowResponse) => {
    let result = [...tree];
    result = result.map((item) => {
        if (item.id === null) {
            const data = newValue as RowResponse;
            item = {
                ...item,
                rowName: newValue.rowName,
                salary: newValue.salary,
                equipmentCosts: newValue.equipmentCosts,
                estimatedProfit: newValue.estimatedProfit,
                overheads: newValue.overheads,
                id: data.id,
                child: null
            }
        }
        if (item.id === id) {
            item = {
                ...item,
                rowName: newValue.rowName,
                salary: newValue.salary,
                equipmentCosts: newValue.equipmentCosts,
                estimatedProfit: newValue.estimatedProfit,
                overheads: newValue.overheads,
            };
        }
        if (item.child?.length) {
            item.child = updateTree(item.child!, id, newValue);
        }
        return item;
    })
    return result;
}


export const removeItemFromTree = (tree: Array<TreeResponse>,
                                   id: number) => {
    const result: Array<TreeResponse> = [];
    if (isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id !== id) {
                result.push({...tree[i]});
            }
        }
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].child !== null && tree[i].id !== id) tree[i].child = removeItemFromTree(tree[i].child!, id);
        }
        return result;
    }
    return null;
}


// @ts-ignore
export const findParent = (tree: Array<TreeResponse> | null, childId: number | null, prevRow: TreeResponse | null = null) => {
    let childParent: TreeResponse | null = null;
    if (isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id === childId) {
                return prevRow;
            }
        }
        for (let i = 0; i < tree.length; i++) {
            childParent = findParent(tree[i].child, childId, tree[i]);
            if (childParent !== null) return childParent;
        }
        return childParent;
    }

    return prevRow ? prevRow : null;
}

