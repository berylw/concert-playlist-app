import React, { Component } from "react";
import PropTypes from "prop-types";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./PlaylistGenerator.scss";

export class PlaylistGenerator extends Component {
    static propTypes = {
        /**
         * Object representing all possible artists. mapping Spotify artist id to an object containing remaining artist properties
         *
         * Eg. {id1: { name: 'artist1' }, id2: { name: 'artist2' }, id3: { 'artist2' }}
         */
        suggestions: PropTypes.instanceOf(Object).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            // Array of artist objects matching user input, e.g. [{ id: 'id1', name: 'artist1' }, { id: 'id2', name: 'artist2' }]
            filteredSuggestions: [],
            // Active index in filteredSuggestions
            activeSuggestionIndex: 0,
            showSuggestions: false,
            selectedArtists: [],
            suggestions: this.props.suggestions
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.renderSuggestionList = this.renderSuggestionList.bind(this);
        this.renderSelectedArtists = this.renderSelectedArtists.bind(this);
    }

    onChange(e) {
        const userInput = e.target.value;
        const filteredSuggestions = [];
        Object.entries(this.state.suggestions).forEach(([artistId, artist]) => {
            if (
                artist.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            ) {
                filteredSuggestions.push({
                    id: artistId,
                    ...artist
                });
            }
        });

        this.setState({
            activeSuggestionIndex: 0,
            userInput,
            filteredSuggestions,
            showSuggestions: filteredSuggestions.length > 0 && userInput
        });
    }

    onKeyDown(e) {
        const {
            activeSuggestionIndex,
            filteredSuggestions,
            suggestions
        } = this.state;
        const selectedArtist = filteredSuggestions[activeSuggestionIndex];
        if (!this.state.showSuggestions) return;

        if (e.key === "Enter") {
            if (suggestions[selectedArtist.id].disabled) return;
            const updatedFilteredSuggestions = filteredSuggestions;
            const updatedSuggestions = suggestions;
            updatedSuggestions[selectedArtist.id].disabled = true;
            updatedFilteredSuggestions[activeSuggestionIndex].disabled = true;

            this.setState({
                userInput: selectedArtist.name,
                showSuggestions: false,
                suggestions: updatedSuggestions,
                filteredSuggestions: updatedFilteredSuggestions,
                selectedArtists: this.state.selectedArtists.concat(
                    selectedArtist
                )
            });
        }

        if (e.key === "ArrowUp") {
            this.setState({
                activeSuggestionIndex:
                    activeSuggestionIndex > 0
                        ? activeSuggestionIndex - 1
                        : filteredSuggestions.length - 1
            });
        }

        if (e.key === "ArrowDown") {
            this.setState({
                activeSuggestionIndex:
                    activeSuggestionIndex < filteredSuggestions.length - 1
                        ? activeSuggestionIndex + 1
                        : 0
            });
        }

        if (e.key === "Escape") {
            this.setState({
                showSuggestions: false
            });
        }
    }

    renderSuggestionList() {
        if (!this.state.showSuggestions) return null;
        const suggestions = [];
        this.state.filteredSuggestions.forEach((artist, index) => {
            const classNames = [];
            if (index === this.state.activeSuggestionIndex)
                classNames.push("active");
            if (artist.disabled) classNames.push("disabled");
            suggestions.push(
                <li key={artist.id} className={classNames.join(" ")}>
                    {artist.name}
                </li>
            );
        });
        return <ul className="suggestionList">{suggestions}</ul>;
    }

    renderSelectedArtists() {
        if (this.state.selectedArtists < 1) return;
        const selectedArtists = this.state.selectedArtists.map(
            (artist, index) => (
                <span key={index} className="selectedArtist">
                    {artist.name}
                </span>
            )
        );
        return <div className="selectedArtists">{selectedArtists}</div>;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSelectedArtists()}
                <Autocomplete
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderSuggestionList={this.renderSuggestionList}
                    userInput={this.state.userInput}
                />
                <button>Generate playlist</button>
            </React.Fragment>
        );
    }
}

export default PlaylistGenerator;
