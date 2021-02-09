import React from 'react';
import './Header.css';

import GoogleColors from '../../utils/const.js'

class Header extends React.Component {
    render() {
        const text = 'Brryle';

        return (
            <div className="header">
                <span style={{fontFamily: "ProductSans-Bold", fontSize: "69pt"}}>
                    {text.split("").map(function (letter, index) {
                        return <span style={{color: GoogleColors[(index % GoogleColors.length)]}}>{letter}</span>
                    })}
                </span>
            </div>
        );
    }
}

export default Header;