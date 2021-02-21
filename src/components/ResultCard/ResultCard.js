import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ReactTextMoreLess from 'react-text-more-less';


class ResultCard extends React.Component {
    state = {
        collapsed: true,
    };

    labels() {
        return this.props.document._source.labelsSplit || [];
    }

    categories() {
        let arr = [];

        if (this.props.document._source.category) {
            arr.push(this.props.document._source.category);

            if (this.props.document._source.subcategory) {
                arr.push(this.props.document._source.subcategory);
            }
        }

        return arr;
    }

    url() {
        return this.props.document._source.url || '';
    }

    title() {
        return this.props.document._source.title;
    }

    description() {
        return this.props.document._source.description;
    }

    render() {
        return (
            <div style={{marginBottom: "15px"}}>
                <Grid container>
                    <Grid item xs/>
                    <Grid item xs={8}>
                        <Card fullWidth>
                            <CardContent>
                                <Grid container direction="row" justify="space-between" alignItems="center"
                                      style={{marginBottom: "5px"}}>
                                    <Grid item>
                                        <Typography gutterBottom variant="h6">
                                            {this.title()}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {
                                            this.categories().map(function (category, index) {
                                                return <Typography variant="caption"
                                                                   color="textSecondary">{index > 0 ? '  /  ' : ''}{category}
                                                </Typography>
                                            })
                                        }
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        {/*<Typography gutterBottom variant="body1">*/}
                                        {/*    {this.description()}*/}
                                        {/*</Typography>*/}
                                        <Typography gutterBottom variant="body1">
                                            <ReactTextMoreLess
                                                collapsed={this.state.collapsed}
                                                text={this.description()}
                                                lessHeight={30}
                                                showMoreText="..."
                                                showMoreElement={
                                                    <span>
                                                        ... <Typography variant="overline" display="block" gutterBottom
                                                                        component="a"
                                                                        style={{
                                                                            marginTop: "5px",
                                                                            cursor: "pointer",
                                                                            fontWeight: "600",
                                                                            color: "rgba(0,0,0,0.35)"
                                                                        }}>
                                                                Show more
                                                            </Typography>
                                                    </span>
                                                }
                                                showLessElement={
                                                    <Typography variant="overline" display="block" gutterBottom
                                                                component="a"
                                                                style={{
                                                                    marginTop: "5px",
                                                                    cursor: "pointer",
                                                                    fontWeight: "600",
                                                                    color: "rgba(0,0,0,0.35)"
                                                                }}>
                                                        Show less
                                                    </Typography>
                                                }
                                                onClick={() => {
                                                    this.setState({collapsed: !this.state.collapsed});
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider light style={{marginBottom: "20px", marginTop: "15px"}}/>
                                <Grid container style={{marginTop: "15px"}} direction="row" justify="space-between"
                                      alignItems="center">
                                    <Grid item>
                                        <Box style={{display: this.labels().length > 0 ? 'block' : 'none'}}>
                                            {
                                                this.labels().map(function (category, index) {
                                                    if (category.length > 0) {
                                                        return <Chip
                                                            size="small"
                                                            label={category}
                                                            color="primary"
                                                            variant="outlined"
                                                            style={{marginRight: "10px"}}
                                                        />
                                                    }
                                                })
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Chip
                                            clickable
                                            label="Otwórz"
                                            size="small"
                                            component="a"
                                            target="_blank"
                                            href={this.url()}
                                        />
                                    </Grid>
                                </Grid>
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
