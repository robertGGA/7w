import * as Yup from 'yup';

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