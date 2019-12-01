import React from 'react';

import Pet from "./pet.jsx";
import petsStore from '../../flux_architecture/stores/petsStore';
import petTypesStore from '../../flux_architecture/stores/petTypesStore';
import petsActions from "../../flux_architecture/actions/petsActions";
import petTypesActions from "../../flux_architecture/actions/petsTypesActions";

import './petsGrid.less';

function getStateFromFluxPets() {
    return {
        petsIsLoading: petsStore.isLoading(),
        pets: petsStore.getPets(),
    };
}

function getStateFromFluxPetTypes() {
    function getPetTypesIconsDictionary(petTypesArray) {
        let dictionary = {};
        petTypesArray.map(petType => {
            dictionary[petType.typename] = petType.iconURL;
        });
        return dictionary;
    }

    return {
        petTypesIsLoading: petTypesStore.isLoading(),
        petTypesIconsDictionary: getPetTypesIconsDictionary(petTypesStore.getPetsTypes())
    };
}

class PetsGrid extends React.Component {

    constructor(props) {
        super(props);

        console.log('PetsGrid CONSTRUCTOR');

        petsActions.loadPets();
        petTypesActions.loadPetTypes();

        this.state = {};

        const petsStates = getStateFromFluxPets();
        for (let petState in petsStates) {
            this.state[`${petState}`] = petsStates[petState];
        }
        const petTypesStates = getStateFromFluxPetTypes();
        for (let petTypeState in petTypesStates) {
            this.state[`${petTypeState}`] = petTypesStates[petTypeState];
        }

        this.state.displayType = props.search.match(/(\w)+$/)[0];
        this.onChangePets = this.onChangePets.bind(this);
        this.onChangePetTypes = this.onChangePetTypes.bind(this);
    }

    componentDidMount() {
        petsStore.addChangeListener(this.onChangePets);
        petTypesStore.addChangeListener((this.onChangePetTypes));
    }

    componentWillUnmount() {
        petsStore.removeChangeListener(this.onChangePets);
        petTypesStore.removeChangeListener(this.onChangePetTypes);
    }

    onChangePets() {
        console.log('ONCHANGE PETS');
        this.setState(getStateFromFluxPets());
    }

    onChangePetTypes() {
        console.log('ONCHANGE PET TYPES');
        this.setState(getStateFromFluxPetTypes());
    }

    petsRender() {
        console.log(this.state.petTypesIsLoading);
        console.log(this.state.petTypesIconsDictionary);

        return (
            this.state.pets.map( pet =>
                <Pet
                    key={pet.id}
                    pet={pet}
                    petTypeIconURL={ this.state.petTypesIconsDictionary[pet.type] }
                    tmp={this.state.petTypesIsLoading}
                    displayType={this.state.displayType}
                />
            )
        )
    }

    render() {
        return (
            <div className={'petsGrid_' + this.state.displayType}>
                {
                    this.petsRender()
                }
            </div>
        );
    }
}

export default PetsGrid;