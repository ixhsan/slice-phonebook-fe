import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./contactAPI";

//. Initial State

const initialState = {
    contacts: [],
    params: {
        page: 1
    }
}

//. Thunks

export const loadContact = createAsyncThunk('contact/fetchData',
async (thunkAPI, query) => {
    const {getState, rejectWithValue} = thunkAPI
    try {
        const state = getState().contact
        console.log(getState);
        const fetching = await fetchData(state.params, query)
        return fetching.data
    } catch (error) {
        rejectWithValue(error)
    }
})

//. Reducers

export const contact = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadContact.fulfilled, (state, action) => {
            state.contacts = [
                ...(state.params.page === 1 ? [] : state.contacts),
                ...action.data.data.contacts.map((item) => {
                  item.sent = true;
                  return item;
                })
              ]
        }

        )
    },
})