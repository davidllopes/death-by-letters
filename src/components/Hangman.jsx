export const Hangman = ({ state }) => {
    return (
        <img
            className="mix-blend-multiply w-32 mx-auto"
            src={`assets/imgs/hangmandrawings/state${state}.GIF`}
            alt=""
        />
    );
};
