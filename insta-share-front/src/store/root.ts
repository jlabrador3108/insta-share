import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit';
import sessionSlice from './slice/sessionSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session'],
};

const rootReducer = combineReducers({
    session: sessionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    middleware: (getDefaultMiddelware) =>
        getDefaultMiddelware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;