import { createContext, useEffect, useReducer } from "react";
import { Reducer } from "./Reducer";

const INITIAL_STATE = {
  isFetching: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: false,
};
export const Context = createContext(INITIAL_STATE);

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        isFetching: state.isFetching,
        user: state.user,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
