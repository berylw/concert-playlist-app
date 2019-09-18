import React, { Component } from "react";
import "./Autocomplete.scss";

export class Autocomplete extends Component {
    render() {
        return (
            <div className="autocomplete">
                <input
                    type="text"
                    placeholder="Add an artist"
                    value={this.props.userInput}
                    onChange={this.props.onChange}
                    onKeyDown={this.props.onKeyDown}
                />
                {this.props.renderSuggestionList()}
            </div>
        );
    }
}
export default Autocomplete;
