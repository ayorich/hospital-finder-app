import React from 'react';
// import React, { useState, ChangeEvent } from 'react';

import HeaderBar from './components/HeaderBar/HeaderBar';


import './App.css';

interface IAppOwnProps {
  // username: string | undefined;
  // userType: 'admin' | 'moderator' | 'user' | 'guest';
}

const App: React.FC<IAppOwnProps> = (): JSX.Element => {

  // const [mapData, mapData] = React.useState("");

  // const [message, setMessage] = useState<string>('');

  
  // const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setMessage(event.target.value);
  // };

  return (
    <div className="App">
      <HeaderBar />
      <div>
        map
        heres
      </div>
    </div>
  );
}

export default App;
