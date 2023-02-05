export const Button = ({ children, className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={` bg-indigo-900 text-pink-100 font-bold px-5 py-2 rounded-full hover:bg-indigo-800 focus:outline-white ${
                className && className
            }`}
        >
            {children}
        </button>
    );
};
