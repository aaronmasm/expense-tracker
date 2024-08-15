import {ChangeEvent, FormEvent, useMemo, useState} from "react";
import {useBudget} from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState(0);
    const {dispatch} = useBudget();

    // Update the local budget state when input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    };

    // Validate if the budget is a positive number
    const isValid: boolean = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    // Dispatch the action to add the budget when the form is submitted
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}});
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Define Budget
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Set your budget"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Save Budget"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2
                text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
}
