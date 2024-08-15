import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import type {DraftExpense, Value} from "../types";
import {categories} from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import {useBudget} from "../hooks/useBudget";

// Component for creating or updating an expense
export default function ExpenseForm() {
    // State for managing form input
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    // State for managing error messages
    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const {dispatch, state, remainingBudget} = useBudget(); // Get context values

    // Set form fields when editing an expense
    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.find(currentExpense =>
                currentExpense.id === state.editingId);
            if (editingExpense) {
                setExpense(editingExpense);
                setPreviousAmount(editingExpense.amount);
            }
        }
    }, [state.expenses, state.editingId]);

    // Handle changes in input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        const isAmountField: boolean = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        });
    };

    // Handle date changes
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        });
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form fields
        if (Object.values(expense).includes('')) {
            setError("All fields are required");
            return;
        }

        // Check if the expense is within the remaining budget
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError("This expense is outside the budget");
            return;
        }

        // Dispatch action to add or update the expense
        if (state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}});
        } else {
            dispatch({type: "add-expense", payload: {expense}});
        }

        // Reset form fields
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        });
        setPreviousAmount(0);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black
                border-b-4 border-blue-500 py-2"
            >
                {state.editingId ? "Update Expense" : "New Expense"}
            </legend>

            {/* Display error message if there's an error */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Name Expense:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Add the expense name"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Amount:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Add the expense amount: e.g. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Category:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Please select --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"
                >
                    Date Expense:
                </label>
                <DatePicker
                    id="date"
                    className="bg-slate-100 p-2 border-0"
                    name="date"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
                font-bold rounded-lg"
                value={state.editingId ? "Save Changes" : "Record Expense"}
            />
        </form>
    );
}
