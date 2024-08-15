import {v4 as uuidv4} from 'uuid'; // Import the v4 function from uuid to generate unique IDs
import {Category, DraftExpense, Expense} from "../types";

// Define the possible actions that the reducer can handle
export type BudgetActions =
    { type: 'add-budget'; payload: { budget: number }; } |
    { type: 'show-modal'; } |
    { type: 'close-modal'; } |
    { type: 'add-expense'; payload: { expense: DraftExpense }; } |
    { type: 'remove-expense'; payload: { id: Expense['id'] }; } |
    { type: 'get-expense-by-id'; payload: { id: Expense['id'] }; } |
    { type: 'update-expense'; payload: { expense: Expense }; } |
    { type: 'reset-app'; } |
    { type: 'add-filter-category'; payload: { id: Category['id'] }; };

// Define the structure of the budget state
export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense['id'];
    currentCategory: Category['id'];
};

// Get the initial budget from localStorage or set a default value
const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;
};

// Get the initial expenses from localStorage or set an empty array
const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

// Initial state of the application
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
};

// Create a new Expense object with a unique ID
const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    };
};

// Reducer to handle actions related to the budget
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    switch (action.type) {
        case "add-budget":
            // Add or update the budget
            return {
                ...state,
                budget: action.payload.budget
            };

        case "show-modal":
            // Show the modal
            return {
                ...state,
                modal: true
            };

        case "close-modal":
            // Close the modal and reset the editing ID
            return {
                ...state,
                modal: false,
                editingId: ''
            };

        case "add-expense": {
            // Add a new expense
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            };
        }

        case "remove-expense":
            // Remove an expense by ID
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            };

        case "get-expense-by-id":
            // Set the editing expense ID and show the modal
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            };

        case "update-expense":
            // Update an existing expense
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                    action.payload.expense : expense),
                modal: false,
                editingId: ''
            };

        case "reset-app":
            // Reset the application, clearing the budget and expenses
            return {
                ...state,
                budget: 0,
                expenses: []
            }

        case "add-filter-category":
            // Set the current category for filtering expenses
            return {
                ...state,
                currentCategory: action.payload.id
            }

        default:
            return state;
    }
};
