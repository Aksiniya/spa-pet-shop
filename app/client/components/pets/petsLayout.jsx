import React from 'react'
import {Route, Switch} from "react-router";
import SearchParams from "../searchParams/searchParams.jsx";

import Navigation from "../navigation/navigation.jsx";
import PetsGrid from "./petsGrid.jsx";
import petsStore from "../../flux_architecture/stores/petsStore";
import petTypesStore from "../../flux_architecture/stores/petTypesStore";
import petsActions from "../../flux_architecture/actions/petsActions";
import petTypesActions from "../../flux_architecture/actions/petsTypesActions";


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

class PetsLayout extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            sortBy: null,
            searchValue: ''
        };

        petsActions.loadPets();
        petTypesActions.loadPetTypes();

        const petsStates = getStateFromFluxPets();
        for (let petState in petsStates) {
            this.state[`${petState}`] = petsStates[petState];
        }
        const petTypesStates = getStateFromFluxPetTypes();
        for (let petTypeState in petTypesStates) {
            this.state[`${petTypeState}`] = petTypesStates[petTypeState];
        }

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
        this.setState(getStateFromFluxPets());
    }

    onChangePetTypes() {
        this.setState(getStateFromFluxPetTypes());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        function petsIsEqual(pets1, pets2) {
            if (pets1.length !== pets2.length) return false;
            for (let p in pets1) {
                if (pets1.hasOwnProperty(p) !== pets2.hasOwnProperty(p)) return false;

                if (typeof (pets1[p]) === 'object' && !petsIsEqual(pets1[p], pets2[p])) return false;

                if (pets1[p] != pets2[p]) return false;
            }
            return true;
        }

        if ( !petsIsEqual(prevState.pets, this.state.pets) || prevState.sortBy !== this.state.sortBy) {

            this.setState({pets: [].concat(this.state.pets).sort( (a, b) => {
                    let sortParam = this.state.sortBy;
                    if (sortParam === ' ') sortParam = null;
                    return (a[sortParam] > b[sortParam]) ? 1 : ( (a[sortParam] === b[sortParam]) ? 0 : -1 );
                })
            });
        }
    }

    render() {

        let searchInputTimer = function tmp() {
            let timeout = null;
            let value = null;
            return function (e) {
                clearTimeout(timeout);
                value =  e.target.value;
                timeout = setTimeout(
                    () => this.setState({searchValue: value}),
                    700);
            }.bind(this);
        }.bind(this)();

        return (
            <div className={'pets-layout'}>
                <Navigation
                    items = {[
                        {
                            name: 'List',
                            path: `${this.props.match.url}?displayType=list`
                        },
                        {
                            name: 'Cards',
                            path: `${this.props.match.url}?displayType=cards`
                        },
                        {
                            name: 'Groups',
                            path: `${this.props.match.url}?displayType=groups`
                        }
                    ]}
                />

                <SearchParams
                    sortItems={[
                        '' ,'type', 'species', 'gender', 'age', 'name'
                    ]}
                    onChangeSortItem={(event) =>
                        this.setState({sortBy: event.target.value})
                    }

                    onChangeSearchField={(event) => searchInputTimer(event)}
                />

                <Switch>
                    <Route
                        path={`${this.props.match.path}`}
                        render={ props =>
                            <PetsGrid
                                // sortBy={this.state.sortBy}
                                searchValue={this.state.searchValue}
                                displayType={this.props.location.search.match(/(\w)+$/)[0]}
                                pets={this.state.pets}
                                petTypesIconsDictionary={this.state.petTypesIconsDictionary}
                                {...props.location}
                            />
                        }
                        // TODO: default case for switch
                    />
                </Switch>
            </div>
        )
    }
}

export default PetsLayout;