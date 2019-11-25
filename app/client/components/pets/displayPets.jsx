import React from 'react';

class DisplayPets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayType: props.search
        };
        console.log(props)
    }

    render() {
        return (
            <div>
                <h1>
                    {'Is ' + this.state.displayType}
                </h1>
            </div>
        );
    }
}

export default DisplayPets;