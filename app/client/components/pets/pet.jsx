import React from 'react';

class Pet extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name : props.name,
            age: props.age,
            gender: props.gender,
            species: props.species,
            type: props.type,
            id: props.id
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.name
                }
            </div>
        );
    }
}

export default Pet;