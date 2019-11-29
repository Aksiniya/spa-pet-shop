import React from 'react';

import Pet from "./pet.jsx";
import petsStore from '../../flux_architecture/stores/petsStore';
import petsActions from "../../flux_architecture/actions/petsActions";

function getStateFromFlux() {
    return {
        isLoading: petsStore.isLoading(),
        pets: petsStore.getPets()
    };
}

class PetsGrid extends React.Component {

    constructor(props) {
        super(props);

        console.log('PetsGrid CONSTRUCTOR');

        this.state = getStateFromFlux();
        this.state.displayType = props.search;

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        petsActions.loadPets();
    }

    componentDidMount() {
        petsStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        petsStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('ONCHANGE');
        console.log(getStateFromFlux());
        this.setState(getStateFromFlux());
    }

    render() {
        return (
            <div>
                <h1>
                    {'Is ' + this.state.displayType}
                </h1>
                {
                    this.state.pets.map( pet =>
                       <Pet
                            key={pet.id}
                            name={pet.name}
                            age={pet.age}
                            gender={pet.gender}
                            species={pet.species}
                            type={pet.type}
                            id={pet.id}
                       />
                    )
                }
            </div>
        );
    }
}

export default PetsGrid;