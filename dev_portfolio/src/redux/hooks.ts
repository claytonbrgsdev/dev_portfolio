import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState } from './store';
import { store } from './store';

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
