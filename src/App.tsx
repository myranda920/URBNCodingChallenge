import React from 'react';
import Header from '@cloudscape-design/components/header';
import Subreddit from './Components/Subreddit';
import SearchBar from './Components/SearchBar/SearchBar';

import '@cloudscape-design/global-styles/index.css'
import './Components/Header.scss';
import './App.scss';

function App() {
  const [data, setData] = React.useState([]);

  return (
    <div className='App'>
      <Header
        headingTagOverride='h1'
        variant='h1'
        actions={<SearchBar setData={setData} />}
        className='MainHeader'
      >
        reddit
      </Header>
      <Subreddit data={data}/>
    </div>
  );
}

export default App;