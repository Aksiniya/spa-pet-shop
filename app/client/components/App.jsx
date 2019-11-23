import React from 'react';
import './App.less';
import TextLogo from "./app_styles/textLogo.jsx";
import PetTypeGrid from "./main_page/PetTypeGrid.jsx";

class App extends React.Component {
   render() {
       return (
           <div className='application'>
               <div className='site-header'>
                   <TextLogo />
               </div>
               <PetTypeGrid />
           </div>
       );
   }
}

export default App;