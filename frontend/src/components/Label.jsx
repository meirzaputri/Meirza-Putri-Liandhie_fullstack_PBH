import { ReactNode } from "react";

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
    {children}
  </label>
);

export default Label;