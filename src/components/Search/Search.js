import React from 'react';
import './Search.scss';
import ResultCard from '../ResultCard/ResultCard'
import SearchSummary from "../SearchSummary/SearchSummary";
import GoogleColors from "../../utils/const";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import Pagination from '@material-ui/lab/Pagination';

const initialState = {
    count: 0,
    time: 0,
    hits: [],
    query: '',
    from: 0,
    size: 5,
    activeQuery: false
}

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.clearSearchQuery = this.clearSearchQuery.bind(this);

        this.conductSearch = this.conductSearch.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()

        this.conductSearch()
    }

    handlePageChange(event, value) {
        event.preventDefault()

        this.setState({from: (parseInt(value) - 1) * this.state.size}, function () {
            this.conductSearch();

            var elementToHighlight = document.getElementById('search-pagination').getElementsByClassName('Mui-selected')[0]
            var elementsToDim = document.getElementById('search-pagination').getElementsByClassName('MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page MuiPaginationItem-textPrimary')

            for (var i = 0; i < elementsToDim.length; i++) {
                var element = elementsToDim[i]
                element.style.backgroundColor = null
            }

            elementToHighlight.style.backgroundColor = GoogleColors[(parseInt(value) - 1) % GoogleColors.length]
        });


    }

    conductSearch() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: {match: {Interests: this.state.query}},
                from: this.state.from,
                size: this.state.size
            })
        };

        fetch('http://localhost:9200/_search', requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    hits: data.hits.hits,
                    count: data.hits.total.value,
                    time: data.took,
                    activeQuery: true
                })
            })
            .catch(console.log)
    }

    handleQueryChange(event) {
        this.setState({query: event.target.value});
    }

    clearSearchQuery(e) {
        this.setState(initialState)
    }

    render() {
        return (
            <div>
                <Grid container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Grid item xs/>
                    <Grid item xs className="searchBar">
                        <div style={{minWidth: "600px"}}>
                            <form noValidate autoComplete="off" onSubmit={this.handleFormSubmit}>
                                <TextField id="outlined-basic" variant="outlined" fullWidth size="small"
                                           style={{minHeight: "40px", marginBottom: "10px", borderRadius: "80px"}}
                                           value={this.state.query}
                                           onChange={this.handleQueryChange}
                                           className="inputRounded"
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <SearchOutlinedIcon color="disabled" fontSize="small"/>
                                                   </InputAdornment>
                                               ),
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <ClearIcon color="disabled"
                                                                  fontSize="small"
                                                                  style={{cursor: "pointer"}}
                                                                  onClick={this.clearSearchQuery}/>
                                                   </InputAdornment>
                                               )
                                           }}
                                />
                            </form>
                            <div style={{visibility: this.state.activeQuery > 0 ? 'visible' : 'hidden'}}>
                                <SearchSummary count={this.state.count} time={this.state.time}/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs/>
                </Grid>
                <Grid container>
                    <Grid item xs>
                        {this.state.hits.map(function (document, index) {
                            return <ResultCard document={document} key={index}/>;
                        })}
                    </Grid>
                </Grid>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {(this.state.count > this.state.size) ?
                        <Pagination
                            id="search-pagination"
                            showFirstButton showLastButton
                            color="primary"
                            onChange={this.handlePageChange}
                            count={Math.ceil(this.state.count / this.state.size)}

                        /> : null}
                </div>
            </div>
        );
    }
}

export default Search;