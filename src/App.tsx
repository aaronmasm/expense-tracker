import {useEffect, useMemo} from "react";
import BudgetForm from "./components/BudgetForm";
import {useBudget} from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
    const {state} = useBudget();

    // Memoize the check if the budget is valid to avoid unnecessary recalculations
    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    // Save budget and expenses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('budget', state.budget.toString());
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }, [state]);

    return (
        <>
            {/* Header section with title */}
            <header className="bg-blue-600 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-4xl text-white">
                    Expense Planner
                </h1>
            </header>

            {/* Main container for BudgetForm or BudgetTracker based on budget validity */}
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
            </div>

            {/* Main section containing expense-related components, visible only if the budget is valid */}
            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-10">
                    <FilterByCategory/>
                    <ExpenseList/>
                    <ExpenseModal/>
                </main>
            )}
        </>
    );
}

export default App;
