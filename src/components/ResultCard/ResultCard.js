import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

class ResultCard extends React.Component {
    render() {
        return (
            <div style={{marginBottom: "15px"}}>
                <Grid container>
                    <Grid item xs/>
                    <Grid item xs={10}>
                        <Card fullWidth>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Typography gutterBottom variant="h6" component="h3">
                                            {this.props.document._source.FirstName} {this.props.document._source.LastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs style={{textAlign: "right"}}>
                                        <Chip
                                            size="small"
                                            label="Clickable"
                                            variant="outlined"
                                            onClick={this.handleClick}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" color="textSecondary" component="p"
                                            style={{marginBottom: "15px"}}>
                                    {this.props.document._source.Interests}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs/>
                </Grid>
            </div>
        );
    }
}

export default ResultCard;
