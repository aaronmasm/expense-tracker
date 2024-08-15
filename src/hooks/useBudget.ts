import {useContext} from "react";
import {BudgetContext} from "../context/BudgetContext";

// Custom hook to access the Budget context
export const useBudget = () => {
    const context = useContext(BudgetContext);

    // Ensure the hook is used within a BudgetProvider
    if (!context) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }

    return context;
};
