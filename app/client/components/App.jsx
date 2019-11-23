import React from 'react';
import './App.less';
import PetTypeGrid from "./main_page/PetTypeGrid.jsx";

class App extends React.Component {
   render() {
       return (
           <div className='application'>
               <div className='site-header'>
                   <h1 className='logo-name'>Blue Paw</h1>
                   <h2 className='pet-shop'>pet-shop</h2>
               </div>
               <PetTypeGrid />
           </div>
       );
   }
}

export default App;