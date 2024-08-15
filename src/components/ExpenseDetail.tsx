import {Expense} from "../types";
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";
import {formatDate} from "../helpers";
import AmountDisplay from "./AmountDisplay";
import {useMemo} from "react";
import {categories} from "../data/categories";
import {useBudget} from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css"

// Props type for the ExpenseDetail component
type ExpenseDetailProps = {
    expense: Expense;
};

// Component for displaying details of an expense with swipeable actions
export default function ExpenseDetail({expense}: ExpenseDetailProps) {
    const {dispatch} = useBudget(); // Get dispatch function from context
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense]);

    // Function for leading actions (e.g., update action)
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    );

    // Function for trailing actions (e.g., delete action)
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList threshold={0.49}>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
                maxSwipe={0.5}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/${categoryInfo?.icon}_icon.svg`}
                            alt={categoryInfo?.name || 'Category icon'}
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
