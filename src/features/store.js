import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import usersSlice from "./users/usersSlice";
import categoriesSlice from "./categories/categoriesSlice";
import statisticsSlice from "./statistics/statisticsSlice";


const rootReducer = combineReducers({
    users: usersSlice,
    categories: categoriesSlice,
    statistics: statisticsSlice
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
    devTools: true
})

export const persistor = persistStore(store)
export default store