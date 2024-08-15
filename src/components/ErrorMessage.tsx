import {PropsWithChildren} from "react";

// Component to display an error message with a styled background
export default function ErrorMessage({children}: PropsWithChildren) {
    return (
        <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
            {children}
        </p>
    );
}
