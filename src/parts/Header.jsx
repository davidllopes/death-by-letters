import { Button } from "../components/Button";
/**
 * Returns title, current score, remaining incorrect guess attempts,
 * New round/Instructions buttons
 */
export const Header = ({
    atttemptsRemain,
    openInstr,
    startNewRound,
    score,
}) => {
    return (
        <div className="w-full">
            <h1 className="my-6 text-6xl font-bold text-indigo-900 text-center md:text-left">
                Death by letters
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full ">
                <p className=" text-lg font-semibold text-indigo-900 text-center sm:text-left">
                    <span>My score: {score}</span> <br />
                    <span>Remaining attempts: {atttemptsRemain}</span>
                </p>
                <div className="flex gap-4">
                    <Button onClick={startNewRound}>New word</Button>
                    <Button onClick={openInstr}>Instructions</Button>
                </div>
            </div>
        </div>
    );
};
