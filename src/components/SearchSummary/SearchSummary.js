import React from 'react';

import Typography from '@material-ui/core/Typography';

class SearchSummary extends React.Component {
    render() {
        return (
            <Typography variant="body2" color="textSecondary"
                        className="searchSummary" style={{textAlign: "left", marginLeft: "22px", height: "10px"}}>
                {(this.props.count > 0) ? 'Około' : ''} {this.props.count.toLocaleString()} wyników ({Math.max(this.props.time, 1) / 1000} s)
            </Typography>
        );
    }
}

export default SearchSummary;
