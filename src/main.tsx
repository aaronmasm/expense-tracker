import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BudgetProvider} from "./context/BudgetContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*
          Wrap the App component with <BudgetProvider> to provide
          budget-related context to all child components.
          This allows components to access and modify the budget state
          and dispatch actions through context.
        */}
        <BudgetProvider>
            <App/>
        </BudgetProvider>
    </React.StrictMode>,
);
