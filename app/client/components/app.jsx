import React from 'react';
import './App.less';
import TextLogo from "./app_styles/textLogo.jsx";
import NavDropdownExample from "./navigation/navigation.jsx";

class App extends React.Component {
   render() {
       return (
           <div className='application'>
               <div className='site-header'>
                   <TextLogo />
               </div>
               <NavDropdownExample itemsNames={['Home', 'Find my pet', 'Admin tools']} />
           </div>
       );
   }
}

export default App;