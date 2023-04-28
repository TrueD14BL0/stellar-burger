import { TypedUseSelectorHook, useSelector as useSelectorReact, useDispatch as useDispatchReactor } from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../types/types";

type DispatchFunc = () => AppDispatch|AppThunk;
export const useAppDispatch: DispatchFunc = useDispatchReactor;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorReact;
