import React, { Component } from "react";
import PropTypes from "prop-types";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./PlaylistGenerator.scss";

export class PlaylistGenerator extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            filteredSuggestions: [],
            activeSuggestionIndex: 0,
            showSuggestions: false,
            selectedArtists: []
        };

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.renderSuggestionList = this.renderSuggestionList.bind(this);
        this.renderSelectedArtists = this.renderSelectedArtists.bind(this);
    }

    onChange(e) {
        const userInput = e.target.value;
        const filteredSuggestions = this.props.suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestionIndex: 0,
            userInput,
            filteredSuggestions,
            showSuggestions: filteredSuggestions.length > 0 && userInput
        });
    }

    onKeyDown(e) {
        const { activeSuggestionIndex, filteredSuggestions } = this.state;
        const selectedArtist = filteredSuggestions[activeSuggestionIndex];
        if (!this.state.showSuggestions) return;

        if (e.key === "Enter") {
            this.setState({
                userInput: filteredSuggestions[activeSuggestionIndex],
                showSuggestions: false,
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
        const suggestions = this.state.filteredSuggestions.map(
            (suggestion, index) => (
                <li
                    key={suggestion}
                    className={
                        index === this.state.activeSuggestionIndex
                            ? "active"
                            : ""
                    }
                >
                    {suggestion}
                </li>
            )
        );
        return <ul className="suggestionList">{suggestions}</ul>;
    }

    renderSelectedArtists() {
        if (this.state.selectedArtists < 1) return;
        const selectedArtists = this.state.selectedArtists.map(
            (artist, index) => (
                <span key={index} className="selectedArtist">
                    {artist}
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
