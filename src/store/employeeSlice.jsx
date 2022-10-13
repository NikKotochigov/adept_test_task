import { createSlice } from "@reduxjs/toolkit";
import employee from "../data/employee";

const initialState = {
    employeeData: employee
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employeeData.unshift(
                {
                    id: action.payload.id,
                    selected: false,
                    name: "",
                    surname: "",
                    position: "",
                    company_id: action.payload.company_id
                }
            )
        },
        removeEmployee: (state, _) => {
            return {
                ...state,
                employeeData: state.employeeData.filter(item => {
                    return !item.selected;
                })
            }
        },
        removeEmployeeByCompany: (state, action) => {
            const { delId } = action.payload;
            return {
                ...state,
                employeeData: state.employeeData.filter(item => {
                    return !delId.includes(item.company_id);
                })
            }
        },
        dropEmployeeCheckBox: (state, action) => {
            const {company_id} = action.payload;
            return {
                ...state,
                employeeData: state.employeeData.map(item => {
                    if (item.company_id === +company_id) {
                        return { ...item, selected: false };
                    }
                    return item;
                })
            }
        },
        changeEmployee: (state, action) => {
            const { id, value, column } = action.payload;
            return {
                ...state,
                employeeData: state.employeeData.map(item => {
                    if (item.id === +id) {
                        return {
                            ...item,
                            [column]: value
                        }
                    }
                    return item;
                })
            }
        },
        selectAllEmployee: (state, action) => {
            return {
                ...state,
                employeeData: state.employeeData.map(item => {
                    return { ...item, selected: action.payload.checked };
                })
            }
        }
    }
})

export const { addEmployee, removeEmployee, changeEmployee, selectAllEmployee, removeEmployeeByCompany, dropEmployeeCheckBox } = employeeSlice.actions;

export default employeeSlice.reducer;


