import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = () => {
    return (
        <Typewriter
            options={{
                strings: [
                    "Popular Products!",
                    "New Arriavals!",
                    "Best Sellers!",
                ],
                autoStart: true,
                loop: true,
            }}
        />
    );
};

export default Jumbotron;
