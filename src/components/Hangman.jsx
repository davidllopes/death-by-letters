import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 *
 */
export const Hangman = () => {
    // react hooks - hangman drawing stage, transform state for animation
    const [hangState, setHangState] = useState(1);
    const [transform, setTransform] = useState("");
    // redux store state - current round data
    const round = useSelector(
        (state) => state.data.rounds[state.data.currentRound]
    );

    /**
     * Updates on incorrect guesses
     */
    useEffect(() => {
        // drawing stage
        setHangState(round.incorrect.length + 1);

        // subtle animation when drawing changes
        setTransform("-translate-y-2");
        let timeout = setTimeout(() => {
            setTransform("translate-y-0");
        }, 150);

        return () => {
            clearTimeout(timeout);
        };
    }, [round]);

    //returns image with changeable src
    return (
        <img
            className={`mix-blend-multiply w-32 mx-auto transition-all ${transform}`}
            src={`./static/assets/imgs/hangmandrawings/state${hangState}.GIF`}
            alt=""
        />
    );
};
