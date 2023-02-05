/**
 * Letter component
 * displays different styling depending on condition:
 * isCorrect/isIncorrect/disabled
 */

export const Letter = ({
    children,
    isCorrect,
    isIncorrect,
    handleClick,
    disabled,
}) => {
    return (
        <button
            className={`${
                isCorrect
                    ? ` border-teal-700 bg-teal-600`
                    : isIncorrect
                    ? ` border-rose-700 bg-rose-600`
                    : !children
                    ? ` bg-pink-400 border-pink-400`
                    : ` bg-indigo-900 border-indigo-900 hover:bg-indigo-800`
            } rounded-md text-pink-100 font-bold w-8 h-8 border-solid border-2 focus:outline-white`}
            disabled={isCorrect || isIncorrect || disabled}
            onClick={() => {
                handleClick(children);
            }}
            style={{ opacity: disabled && "0.7" }}
        >
            {children}
        </button>
    );
};
