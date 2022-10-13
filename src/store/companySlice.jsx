import { createSlice } from "@reduxjs/toolkit";
import company from "../data/company";

const initialState = {
    companyData: company
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        addCompany: (state, action) => {
            state.companyData.unshift(
                {
                    id: action.payload.id,
                    selected: false,
                    company_name: "",
                    count: 0,
                    address: ""
                }
            )
        },
        removeCompany: (state, _) => {
            return {
                ...state,
                companyData: state.companyData.filter(item => {
                    return !item.selected
                })
            }
        },
        changeCompany: (state, action) => {
            const { id, value, column } = action.payload;
            return {
                ...state,
                companyData: state.companyData.map(item => {
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
        selectAllCompany: (state, action) => {
            return {
                ...state,
                companyData: state.companyData.map(item => {
                    return { ...item, selected: action.payload.checked };
                })
            }
        },
        addEmployeesCount: (state, action) => {
            const { id, count } = action.payload;
            return {
                ...state,
                companyData: state.companyData.map(item => {
                    if (item.id === +id) {
                        return { ...item, count: item.count + count };
                    } else {
                        return item;
                    }
                })
            }
        },
        decreaseEmployeesCount: (state, action) => {
            const { countId } = action.payload;
            return {
                ...state,
                companyData: state.companyData.map(item => {
                    let count = 0;
                    countId.forEach(element => {
                        if (element.company_id === item.id) {
                            count = element.count;
                        }
                    });
                    if (count) {
                        return { ...item, count: item.count - count };
                    } else {
                        return item;
                    }
                })
            }
        }
    }
})

export const { addCompany, removeCompany, changeCompany, selectAllCompany, addEmployeesCount, decreaseEmployeesCount } = companySlice.actions;

export default companySlice.reducer;


