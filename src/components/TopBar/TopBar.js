import React from 'react';
import './TopBar.css';
import PersonRounded from '@material-ui/icons/PersonRounded';

class TopBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {health: null}

        this.getHealth = this.getHealth.bind(this)
    }

    componentDidMount() {
        this.getHealth()

        setInterval(this.getHealth, 30000)
    }

    getColor(health) {
        var base = 'gray';

        var colors = new Map()
        colors.set('red', '#ea4335')
        colors.set('yellow', '#fbbc05')
        colors.set('green', '#34a853')

        if (health) {
            return colors.get(health)
        } else {
            return base
        }
    }

    getHealth() {
        fetch('http://localhost:9200/_cat/health?format=json')
            .then(res => res.json())
            .then((data) => {
                this.setState({health: data[0].status})
            })
            .catch(console.log)
    }

    render() {
        var color = this.getColor(this.state.health)

        return (
            <div className="topBar">
                <a href="https://www.linkedin.com/in/gorskimariusz/" target="_blank" rel="noreferrer">Mariusz Górski</a>
                <PersonRounded
                    style={{color: color, verticalAlign: "middle", marginLeft: "7px", marginBottom: "3px"}}/>
            </div>
        );
    }
}

export default TopBar;