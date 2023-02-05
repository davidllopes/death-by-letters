import { useEffect, useState } from "react";

export const Hangman = ({ state }) => {
    const [transform, setTransform] = useState("");

    useEffect(() => {
        setTransform("-translate-y-2");
        let timeout = setTimeout(() => {
            setTransform("translate-y-0");
        }, 150);

        return () => {
            clearTimeout(timeout);
        };
    }, [state]);

    return (
        <img
            className={`mix-blend-multiply w-32 mx-auto transition-all ${transform}`}
            src={`assets/imgs/hangmandrawings/state${state}.GIF`}
            alt=""
        />
    );
};
