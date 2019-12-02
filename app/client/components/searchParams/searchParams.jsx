import React from 'react';

class SearchParams extends React.Component {

    getSelect() {
        let options = [];
        for (let item of this.props.sortItems) {
            options.push(
                <option key={item} value={item}>{item}</option>
            )
        }
        return (
            <select onChange={this.props.onChangeSortItem}>
                {options}
            </select>
        )
    }

    render() {
        return (
            <ul>
                <li>Sort by: {this.getSelect()}</li>
                <li>Search: <input type='text' placeholder='filter' onChange={this.props.onChangeSearchField}/></li>
            </ul>
        )
    }
}

export default SearchParams;