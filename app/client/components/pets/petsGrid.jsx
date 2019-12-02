import React from 'react';
import Pet from "./pet.jsx";
import './petsGrid.less';

class PetsGrid extends React.Component {

    constructor(props) {
        super(props);
        console.log('PetsGrid CONSTRUCTOR');
    }

    petsRender(pet) {
        let petClass = 'pet_display-none';

        if (this.props.searchValue !== '') {
            let re = new RegExp(`${this.props.searchValue}`, 'i');
            for (let petParam in pet) {
                if (pet[petParam].toString().match(re) !== null && petParam !== 'imageURL') {
                    petClass = '';
                    break
                }
            }
        } else {
            petClass = '';
        }

        if (this.props.displayType !== 'group') {
            return (
                <Pet
                    className={petClass}
                    key={pet.id}
                    pet={pet}
                    petTypeIconURL={ this.props.petTypesIconsDictionary[pet.type] }
                    displayType={ this.props.displayType }
                />
            )
        } else {
            return (
                <Pet
                    className={petClass}
                    key={pet.id}
                    pet={pet}
                    displayType={ this.props.displayType }
                />
            )
        }
    }

    gridBody() {
        if (this.props.displayType !== 'groups') {

            return (
                this.props.pets.map( pet =>
                    this.petsRender(pet)
                )
            );
        }
        else {
            let petTypesBlocks = Object.assign({}, this.props.petTypesIconsDictionary);
            for (let petType in petTypesBlocks) {
                petTypesBlocks[petType] = [];
            }

            this.props.pets.forEach( pet => {
                petTypesBlocks[pet.type].push(
                    this.petsRender(pet)
                );
            });

            return (
                Object.keys(petTypesBlocks).map(type =>
                    <div key={type} className={'petsGrid_groups_group'}>
                        <span className={'petsGrid_groups_header'}>{type}</span>
                        {petTypesBlocks[type]}
                    </div>
                )
            );
        }
    }

    listHeader() {
        if (this.props.displayType === 'list') {
            let listKeyIndex = 0;
            return ([
                    <span key={'column_' + listKeyIndex++}>Pet type</span>,
                    <span key={'column_' + listKeyIndex++}>Species</span>,
                    <span key={'column_' + listKeyIndex++}>Gender</span>,
                    <span key={'column_' + listKeyIndex++}>Age in month</span>,
                    <span key={'column_' + listKeyIndex++}>Name</span>
                ]
            )
        }
    }

    render() {
        console.log('RENDER');


        return (
            <div className={'petsGrid_' + this.props.displayType}>
                {this.listHeader()}
                {this.gridBody()}
            </div>
        );
    }
}

export default PetsGrid;