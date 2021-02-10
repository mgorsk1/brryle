import React from 'react';
import './Header.css';

import * as C from "../../utils/const";

class Header extends React.Component {
    render() {
        const text = 'Brryle';

        return (
            <div className="header">
                <span style={{fontFamily: "ProductSans-Bold", fontSize: "69pt"}}>
                    {text.split("").map(function (letter, index) {
                        return <span style={{color: C.GoogleColors[(index % C.GoogleColors.length)]}}>{letter}</span>
                    })}
                </span>
            </div>
        );
    }
}

export default Header;