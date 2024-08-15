import {useMemo} from "react";
import {useBudget} from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

// Component to display the list of expenses with optional filtering
export default function ExpenseList() {
    const {state} = useBudget(); // Get the state from the budget context

    // Filter expenses based on the current category, or show all expenses if no category is selected
    const filteredExpenses = state.currentCategory ?
        state.expenses.filter(expense => expense.category === state.currentCategory) :
        state.expenses;

    // Check if the filtered expenses list is empty
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? (
                // Display a message if there are no expenses
                <p className="text-gray-600 text-2xl font-bold">No Expenses</p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Expense List</p>
                    {/* Render a list of filtered expenses */}
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}  // Unique key for each expense item
                            expense={expense} // Pass the expense object to the ExpenseDetail component
                        />
                    ))}
                </>
            )}
        </div>
    );
}
