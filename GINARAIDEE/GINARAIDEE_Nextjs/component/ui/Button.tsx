//ปุ่มจม V2
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  className = '',
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            {...props}
            className={`
        cursor-pointer text-black
        border-4 border-black rounded-xl
        bg-gray-500
        pb-3
        transition-all duration-200 ease-in-out  
        select-none
        active:pb-0 active:mb-3 active:translate-y-3
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
            //ปรับ transition ให้เป็น duration-100 (0.1s) และใช้ ease-in-out เพื่อเพิ่มความ Smooth
        >
            <div className="bg-gray-300 border-4 border-white px-2 py-1 rounded-xl">
                <span className="text-lg tracking-wider">{children}</span>
            </div>
        </button>
    );
};

