import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    switchCurr : false 
}

const switchCurrReducer = createSlice({
    name : 'Switch Currency',
    initialState,
    reducers : {
        updateSwitchCurr (state, action) {
            state.switchCurr = action.payload
        }
    }
})

export const switchCurrActions = switchCurrReducer.actions

export default switchCurrReducer