import React from 'react';
import './navigation.less'
import {NavLink} from "react-router-dom";

class NavigationItem extends React.Component{
    render() {
        return (
            <NavLink to={this.props.link}>
                <li
                    className={this.props.active == true ? 'navigation-item_selected' : ''}
                    onClick={this.props.onClick}
                >
                    {this.props.name}
                </li>
            </NavLink>
        )
    }
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: Array(props.items.length).fill(false)
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
                name={this.props.items[index].name}
                link={this.props.items[index].path}
                active={this.state.states[index]}
                onClick={ () => this.clickHandle(index)}
                key={index}
            />
        );
    }

    createItems() {
        let navigationItems = [];
        for (let navigationItemIndex = 0; navigationItemIndex < this.props.items.length; navigationItemIndex++) {
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