import React from 'react';
import './pet.less'

class Pet extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name : props.name,
            age: props.age,
            gender: props.gender,
            species: props.species,
            type: props.type,
            id: props.id,

            displayType: props.displayType
        }
    }

    render() {
        return (
            <ul className={'pet_'+this.state.displayType}>
                <li>{this.state.type}</li>
                <li>{this.state.species}</li>
                <li>Age: {this.state.age} months</li>
                <li>{this.state.gender}</li>
                <li>{this.state.name}</li>
            </ul>
        );
    }
}

export default Pet;