import {createContext, Dispatch, ReactNode, useMemo, useReducer} from "react";
import {BudgetActions, budgetReducer, BudgetState, initialState} from "../reducers/budget-reducer";

// Define the context properties for the Budget context
type BudgetContextProps = {
    state: BudgetState;                 // Current state of the budget
    dispatch: Dispatch<BudgetActions>;  // Dispatch function to handle actions
    totalExpenses: number;              // Total amount of expense
    remainingBudget: number;            // Amount of budget remaining after expenses
};

// Define the props for the BudgetProvider component
type BudgetProviderProps = {
    children: ReactNode; // Children components to be rendered inside the provider
};

// Create the Budget context with default value as null (to be replaced by the provider)
export const BudgetContext = createContext<BudgetContextProps>(null!);

// BudgetProvider component to provide the Budget context to its children
export const BudgetProvider = ({children}: BudgetProviderProps) => {
    // Set up state and dispatch using the budgetReducer and initialState
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    // Calculate the total expenses from the expenses array
    const totalExpenses = useMemo(() =>
            state.expenses.reduce((total, expense) => expense.amount + total, 0),
        [state.expenses]);

    // Calculate the remaining budget by subtracting total expenses from the budget
    const remainingBudget = state.budget - totalExpenses;

    return (
        <BudgetContext.Provider
            value={{
                state,              // Provide the current state
                dispatch,           // Provide the dispatch function
                totalExpenses,      // Provide the total expenses
                remainingBudget     // Provide the remaining budget
            }}
        >
            {children} {/* Render children components inside the provider */}
        </BudgetContext.Provider>
    );
};
