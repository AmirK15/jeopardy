import {createSlice} from "@reduxjs/toolkit";

const statisticsSlice = createSlice({
    name: "statistics",
    initialState: {
        allPlayers: [],
        // countValue: 0,
        // allSelectedQuestion: 0,
        // allRightAnswers: 0,
        // allIncorrectAnswers: 0
    },
    reducers: {
        addNewPlay: (state, action) => {
            state.allPlayers = [...state.allPlayers, action.payload]
        },
        // plusValue: (state, action) => {
        //     state.countValue += action.payload
        // },
        // minusValue: (state, action) => {
        //     state.countValue -= action.payload
        // },
        // addQuestion: (state) => {
        //     state.allSelectedQuestion += 1
        // },
        // addRight: (state) => {
        //     state.allRightAnswers += 1
        // },
        // addIncorrect: (state) => {
        //     state.allIncorrectAnswers += 1
        // },
        clearStatistics: (state) => {
            state.allPlayers = []
            // state.countValue = 0
            // state.allSelectedQuestion = 0
            // state.allRightAnswers = 0
            // state.allIncorrectAnswers = 0
        }
    }
})

export const {
    // plusValue,
    // minusValue,
    // addQuestion,
    // addRight,
    // addIncorrect,
    clearStatistics,
    addNewPlay
} = statisticsSlice.actions
export default statisticsSlice.reducer