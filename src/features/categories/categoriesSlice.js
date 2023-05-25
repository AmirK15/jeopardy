import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/constants";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const categoryId = [68, 76, 94, 23, 24]
            // const categories = (await axios(`${BASE_URL}/categories?count=5`)).data
            const tableData = categoryId.map((item) => {
                return axios(`${BASE_URL}/category?id=${item}`).then(res => {
                    return res.data
                })
            })
            const res = await Promise.all(tableData)

            return res.map((item) => {
                return {
                    ...item,
                    clues: item.clues.filter(i => i.value !== null)
                        .sort((a, b) => a.value - b.value)
                        .filter((clue, index, array) => {
                            if (index === 0) {
                                return true
                            }
                            return clue.value !== array[index - 1].value
                        })
                        .slice(0, 5)
                }
            })

            // const clues = await Promise.all(
            //     categoryId.map(async (item) => {
            //         const response = await axios(`${BASE_URL}/category?id=${item}`);
            //         return response.data;
            //     })
            // );
            // return clues;
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, { payload }) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.data = payload
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default categoriesSlice.reducer