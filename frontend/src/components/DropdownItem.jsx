import React from "react";
// Asumsi 'Link' yang diimpor berasal dari 'react-router-dom'
import { Link } from "react-router-dom"; 

// Semua type imports dan interface dihapus

export const DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  // Tipe event (React.MouseEvent) dihapus di JSX
  const handleClick = (event) => {
    // Mencegah navigasi default jika tag adalah 'button' (meskipun jarang terjadi)
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  // Jika tag adalah 'a' (Link) dan properti 'to' ada, render sebagai Link
  if (tag === "a" && to) {
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  // Default: Render sebagai Button
  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};