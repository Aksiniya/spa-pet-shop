import React from 'react';
import './pet.less'

class Pet extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            type: props.pet.type,
            species: props.pet.species,
            gender: props.pet.gender,
            name : props.pet.name,
            age: props.pet.age,
            id: props.pet.id,

            displayType: props.displayType
        }
    }

    petElement() {
        switch (this.state.displayType) {
            case 'list': {
                let listKeyIndex = 1;
                let iconURL = this.props.petTypeIconURL;
                if (this.props.petTypeIconURL === undefined) {
                    iconURL = 'http://localhost:8080/images/petsTypesIcons/defaultPetTypeIcon.png'
                }

                return [
                    <span key={'column_' + listKeyIndex++}>
                        <img src={ iconURL } alt={'Pet type icon'}/>
                    </span>,
                    <span key={'column_' + listKeyIndex++}>{this.state.species}</span>,
                    <span key={'column_' + listKeyIndex++}>{this.state.gender}</span>,
                    <span key={'column_' + listKeyIndex++}>{this.state.age}</span>,
                    <span key={'column_' + listKeyIndex++}>{this.state.name}</span>
                ];
            }
            case 'cards': {
                return (
                    <ul className={'pet_'+this.state.displayType}>
                        <li>{this.state.type}</li>
                        <li>{this.state.species}</li>
                        <li>{this.state.gender}</li>
                        <li>Age: {this.state.age} months</li>
                        <li>{this.state.name}</li>
                    </ul>
                );
            }
        }
    }

    render() {
        return (
            this.petElement()
        );
    }
}

export default Pet;