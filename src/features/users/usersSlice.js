import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        name: "",
        points: 0,
        selectedQuestionId: [],
        rightAnswers: [],
        incorrectAnswers: []
    },
    reducers: {
        saveName: (state, {payload}) => {
            state.name = payload
        },
        plusCountValue: (state, action) => {
            state.points += action.payload
        },
        minusCountValue: (state, action) => {
            state.points -= action.payload
        },
        addQuestionId: (state, action) => {
            state.selectedQuestionId = [...state.selectedQuestionId, action.payload]
        },
        addRightAnswers: (state, action) => {
            state.rightAnswers = [...state.rightAnswers, action.payload]
        },
        addIncorrectAnswers: (state, action) => {
            state.incorrectAnswers = [...state.incorrectAnswers, action.payload]
        },
        clearAllAnswers: (state) => {
            state.points = 0
            state.selectedQuestionId = []
            state.rightAnswers = []
            state.incorrectAnswers = []
        },
        logOut: (state) => {
            state.name = ''
        }
    }
})

export const {
    saveName,
    plusCountValue,
    minusCountValue,
    addQuestionId,
    addRightAnswers,
    addIncorrectAnswers,
    clearAllAnswers,
    logOut
} = usersSlice.actions
export default usersSlice.reducer