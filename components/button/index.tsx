import { ReactNode } from "react";

type prop = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export const ButtonSuccess = ({ children, type, onClick, className }: prop) => {
  return (
    <button
      className={`text-sm bg-green-600 text-white rounded-md
            py-2 px-4 hover:bg-green-700 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonWarning = ({ children, type, onClick, className }: prop) => {
  return (
    <button
      className={`text-sm bg-yellow-500 text-white
            rounded-md py-2 px-4 hover:bg-yellow-600 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonDanger = ({ children, type, onClick, className }: prop) => {
  return (
    <button
      className={`text-sm bg-red-600 text-white rounded-md
            py-2 px-4 hover:bg-red-700 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonHome = ({ children, type, onClick, className }: prop) => {
  return (
    <button
      className={`text-sm bg-slate-300 hover:bg-slate-100 text-black rounded-md
            py-2 px-4 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ShareButton = ({ children, type, onClick, className }: prop) => {
  return (
    <button
      className={`text-sm bg-white border-2 border-purple-300 ease-in-out duration-300 hover:border-white hover:bg-purple-400 text-black rounded-md
            py-2 px-4 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const DownloadButton = ({
  children,
  type,
  onClick,
  className,
}: prop) => {
  return (
    <button
      className={`text-sm bg-white border-2 border-blue-400 ease-in-out duration-300 hover:border-white hover:bg-blue-500 text-black rounded-md
            py-2 px-4 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const PromptButton = ({
  children,
  type,
  onClick,
  className,
}: prop) => {
  return (
    <button
      className={`text-sm bg-white border-2 border-amber-400 hover:border-white ease-in-out duration-300 hover:bg-amber-500  text-black rounded-md
            py-2 px-4 font-bold ${className}`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};