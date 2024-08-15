// Define the structure for an Expense object
export type Expense = {
    id: string; // Unique identifier for the expense
    expenseName: string; // Name or description of the expense
    amount: number; // Amount spent
    category: string; // Category under which the expense falls
    date: Value; // The Date of the expense
};

// Define a DraftExpense type, which is an Expense without the id property
export type DraftExpense = Omit<Expense, 'id'>;

// ValuePiece can be either a Date object or null
type ValuePiece = Date | null;

// Value can be a single date (or null) or a range of dates (or null)
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Define the structure for a Category object
export type Category = {
    id: string; // Unique identifier for the category
    name: string; // Name of the category
    icon: string; // Icon representing the category
};
