import React from "react";

export const CardTitle = ({ children, className }) => {
  return (
    <h3 className={`card-title ${className}`}>
      {children}
    </h3>
  );
};
