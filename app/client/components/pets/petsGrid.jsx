import React from 'react';
import Pet from "./pet.jsx";
import './petsGrid.less';

class PetsGrid extends React.Component {

    constructor(props) {
        super(props);
        console.log('PetsGrid CONSTRUCTOR');
    }

    render() {
        console.log('RENDER');

        function listHeader() {
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

        function gridBody() {
            if (this.props.displayType !== 'groups') {

                return (
                    this.props.pets.map( pet =>
                        <Pet
                            key={pet.id}
                            pet={pet}
                            petTypeIconURL={ this.props.petTypesIconsDictionary[pet.type] }
                            displayType={ this.props.displayType }
                        />
                    )
                );
            } else {
                let petTypesBlocks = Object.assign({}, this.props.petTypesIconsDictionary);
                for (let petType in petTypesBlocks) {
                    petTypesBlocks[petType] = [];
                }

                this.props.pets.forEach( pet => {
                    petTypesBlocks[pet.type].push(
                        <Pet
                            key={pet.id}
                            pet={pet}
                            displayType={ this.props.displayType }
                        />
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

        return (
            <div className={'petsGrid_' + this.props.displayType}>
                {listHeader.bind(this)()}
                {gridBody.bind(this)()}
            </div>
        );
    }
}

export default PetsGrid;