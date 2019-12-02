import React from 'react';

class SearchParams extends React.Component {

    getSelect() {

        let options = [];
        for (let item of this.props.sortItems) {
            options.push(
                <option value={item}>{item}</option>
            )
        }
        return (
            <select onChange={this.props.onSelectSortItem}>
                {options}
            </select>
        )
    }

    render() {
        return (
            <div>
                <span>Sort by:</span>
                {this.getSelect()}
            </div>
        )
    }
}

export default SearchParams;