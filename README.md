# Expense Tracker

A React application for managing and tracking expenses. This project demonstrates the use of React components, Context
API, `useReducer` for state management, and TypeScript for type safety.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [License](#license)

## Project Overview

The Expense Tracker application allows users to manage their expenses, set a budget, and track their spending. Users can
add, update, and delete expenses, view a summary of their budget, and filter expenses by category. The application is
built with React, TypeScript, and uses the Context API along with `useReducer` for state management.

## Features

- **Add Budget:** Set a budget for tracking expenses.
- **Add Expense:** Create new expenses with details such as name, amount, category, and date.
- **Update Expense:** Modify existing expense details.
- **Delete Expense:** Remove expenses from the list.
- **Budget Tracking:** Track your budget, including total expenses, remaining budget, and percentage used.
- **Filter Expenses:** Filter expenses by category.
- **Responsive Design:** Adaptable to various screen sizes.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tool for fast builds and optimized development experience.
- **TypeScript:** Superset of JavaScript with static types.
- **React Context API:** For managing global state.
- **React `useReducer`:** For state management with complex state logic.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **react-date-picker:** For date selection in expense forms.

## Installation

To run this project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aaronmasm/expense-tracker.git

2. **Navigate to the project directory:**

   ```bash
   cd expense-tracker

3. **Install the dependencies:**

   ```bash
   npm install

4. **Start the development server:**

   ```bash
   npm run dev

## Usage

1. **Set Budget:**
    - Start by defining your budget. Use the "Define Budget" form to set the initial amount. This will set your overall
      budget and allow you to track expenses against it.

2. **Add Expense:**
    - After setting your budget, click the "+" button to open the expense form. Fill out the details including the name,
      amount, category, and date of the expense, then submit to add a new expense.

3. **Update Expense:**
    - To update an existing expense, swipe on the expense item in the list to reveal the "Update" action. Make the
      necessary changes and submit to update the expense details.

4. **Delete Expense:**
    - To remove an expense, swipe on the expense item in the list to reveal the "Delete" action. Confirm the deletion to
      remove the expense from the list.

5. **Budget Tracker:**
    - View your current budget, total expenses, and remaining budget in the tracker section. The circular progress bar
      provides a visual representation of your budget utilization.

6. **Filter Expenses:**
    - Use the dropdown menu to filter expenses by category. This will allow you to view expenses specific to a selected
      category and better manage your spending.

By following these steps, you can effectively manage your budget and track expenses using the application.

## Project Structure

The project structure is organized as follows:

- `src/`
    - `components/` - Contains React components used in the application.
        - `AmountDisplay.tsx` - Component for displaying amounts with currency formatting.
        - `BudgetForm.tsx` - Component for adding and updating the budget.
        - `BudgetTracker.tsx` - Component for tracking budget and expenses.
        - `ErrorMessage.tsx` - Component for displaying error messages.
        - `ExpenseDetail.tsx` - Component for rendering individual expense details.
        - `ExpenseForm.tsx` - Component for adding and updating expenses.
        - `ExpenseList.tsx` - Component for displaying the list of expenses.
        - `ExpenseModal.tsx` - Component for handling expense addition and updates in a modal.
        - `FilterByCategory.tsx` - Component for filtering expenses by category.
    - `data/` - Contains sample category data.
        - `categories.ts` - Category data used in the application.
    - `hooks/` - Contains custom hooks.
        - `useBudget.ts` - Custom hook for using the Budget context.
    - `context/` - Contains context providers.
        - `BudgetContext.tsx` - Provides the Budget context and state management.
    - `reducer/` - Contains state management logic.
        - `budget-reducer.ts` - Reducer function for managing budget-related state.
    - `types/` - TypeScript type definitions.
        - `index.ts` - Defines types for the application.
    - `helpers/` - Contains utility functions.
        - `index.ts` - Helper functions for formatting currency and dates.
    - `App.tsx` - Main application component.
    - `main.tsx` - Entry point for the React application.
    - `index.css` - Global styles.

## Components

- **AmountDisplay:** Displays formatted amounts for budget and expenses.
- **BudgetForm:** Manages form inputs for adding and updating the budget.
- **BudgetTracker:** Provides an overview of the budget and spending.
- **ErrorMessage:** Displays error messages to the user.
- **ExpenseDetail:** Shows detailed information for each expense.
- **ExpenseForm:** Manages form inputs for adding and updating expenses.
- **ExpenseList:** Displays a list of expenses with filtering options.
- **ExpenseModal:** Handles the state and visibility of the modal for adding or updating expenses.
- **FilterByCategory:** Allows users to filter expenses by category.

## Styling

The application uses Tailwind CSS for styling. The utility-first approach ensures a clean and responsive design,
allowing for rapid development and consistent look and feel across different devices.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

© 2024 Aarón Más Murro
