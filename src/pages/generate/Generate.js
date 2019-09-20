import React from "react";
import "./Generate.scss";
import PlaylistGenerator from "../../components/PlaylistGenerator/PlaylistGenerator";

function Generate() {
    return (
        <section className="generate">
            <PlaylistGenerator
                suggestions={{
                    id1: { name: "FKA Twigs" },
                    id2: { name: "Blood Orange" },
                    id3: { name: "Glass Animals" }
                }}
            />
        </section>
    );
}

export default Generate;
