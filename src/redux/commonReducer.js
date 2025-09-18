// @ts-nocheck

import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
    name: 'commonReducer',
    initialState: {
        value: true,
    },
    reducers: {
        updateRedux: (state, data) => {
            state[data.payload.key] = data.payload.value
        },
    },
})

export const { updateRedux } = commonSlice.actions;

export const value = (state) => state.commonReducer.value;
// export const value = (state ) => state.commonReducer.value;
// export const value = (state ) => state.commonReducer.value;
// export const value = (state ) => state.commonReducer.value;
// export const value = (state ) => state.commonReducer.value;


export default commonSlice.reducer;