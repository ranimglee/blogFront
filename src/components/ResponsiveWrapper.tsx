import React from 'react';
import './../styles/responsive.css';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  return (
    <div className="responsive-container">
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
