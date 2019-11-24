import React from 'react';
import './navigation.less'

class NavigationItem extends React.Component{
    render() {
        return (
            <li
                className={this.props.active == true ? 'navigation-item_selected' : ''}
                onClick={this.props.onClick}
            >
                {this.props.name}
            </li>
        )
    }
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: Array(props.itemsNames.length).fill(false)
        }
    }

    clickHandle(index) {
        const newStates = this.state.states.slice().fill(false);
        newStates[index] = true;
        this.setState({states: newStates});
    }

    renderNavigationItem(index) {
        return (
            <NavigationItem
                name={this.props.itemsNames[index]}
                active={this.state.states[index]}
                onClick={ () => this.clickHandle(index)}
                key={index}
            />
        );
    }

    createItems() {
        let navigationItems = [];
        for (let navigationItemIndex = 0; navigationItemIndex < this.props.itemsNames.length; navigationItemIndex++) {
            navigationItems.push(this.renderNavigationItem(navigationItemIndex));
        }
        return <ul>{navigationItems}</ul>;
    }

    render() {
        return (
            <div className='navigation-container'>
                {this.createItems()}
            </div>
        );
    }
}


export default Navigation;