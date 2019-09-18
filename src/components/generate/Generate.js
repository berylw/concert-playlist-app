import React from "react";
import "./Generate.scss";
import PlaylistGenerator from "../PlaylistGenerator/PlaylistGenerator";

function Generate() {
    return (
        <section className="generate">
            <PlaylistGenerator
                suggestions={["FKA Twigs", "Blood Orange", "Glass Animals"]}
            />
        </section>
    );
}

export default Generate;
