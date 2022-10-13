import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import employeeReucer from "./employeeSlice";
import idReducer from "./idSlice";

export default configureStore({
    reducer: {
        company: companyReducer,
        employee: employeeReucer,
        activeId: idReducer
    }
})