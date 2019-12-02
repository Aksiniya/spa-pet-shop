import React from 'react';
import './pet.less';
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
                // let image = this.props.pet.imageURL;
                // if (image === undefined) {
                //     image = 'http://localhost:8080/images/petsImages/defaultPetImg.png';
                // }
                return (
                    <ul className={'pet_'+this.state.displayType}>
                        <li>{this.state.type}</li>
                        <li>
                            <img src={ this.props.pet.imageURL} alt={'Pet image'}/>
                        </li>
                        <li>{this.state.species}</li>
                        <li>Gender: {this.state.gender}</li>
                        <li>Age: {this.state.age} months</li>
                        <li>Name: {this.state.name}</li>
                    </ul>
                );
            }
            case 'groups': {
                // let imageURL = this.props.pet.imageURL;
                // if (this.props.pet.imageURL === undefined) {
                //     iconURL = 'http://localhost:8080/images/petsImages/defaultPetImg.png'
                // }
                return (
                    <div className={'pet_'+this.state.displayType}>
                        <ul >
                            <li>Species: {this.state.species}</li>
                            <li>Age: {this.state.age} month</li>
                            <li>Gender: {this.state.gender}</li>
                        </ul>
                        <img src={this.props.pet.imageURL} alt={'Pet image'}/>
                    </div>
                )
            }
            default: {
                return null;
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