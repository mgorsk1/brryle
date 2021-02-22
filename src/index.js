import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header/Header'
import Search from './components/Search/Search';
import TopBar from './components/TopBar/TopBar';


ReactDOM.render(
    <React.StrictMode>
        <TopBar/>
        <Header/>
        <Search/>
    </React.StrictMode>,
    document.getElementById('root')
);

