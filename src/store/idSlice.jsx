import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeId: []
}

const idSlice = createSlice({
    name: "activeId",
    initialState,
    reducers: {
        changeId: (state, action) => {
            if (action.payload.checked) {
                state.activeId.push(+action.payload.id);
            } else {
                return {
                    ...state,
                    activeId: state.activeId.filter((id) => id !== +action.payload.id)
                }
            }
        },
        changeAllId: (state, action) => {
            state.activeId = action.payload.activeId;
        }
    }
})

export const { changeId, changeAllId } = idSlice.actions;

export default idSlice.reducer;


