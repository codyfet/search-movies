import React, { Component } from 'react';
import { Grid, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from "axios";
import { MoviesTable } from '../components/MoviesTable.js';
import { connect } from 'react-redux';
import { createSearchMoviesStartAction, createSearchMoviesSuccessAction, createSearchMoviesFailureAction } from '../actions/actions.js';
import { PropTypes } from 'prop-types';

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

class SearchPage extends Component {

    state = {
        searchValue: "",
    }

    /**
     * Обработчки измененя значения в поле для поиска фильмов.
     */
    handleInputChange = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    /**
     * Обработчки нажатия на кнопку "Найти".
     */
    handleButtonClick = () => {
        const { searchValue } = this.state;

        this.props.moviesSearchStart();

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchValue}&page=1&include_adult=false`)
            .then((response) => {
                this.props.moviesSearchSuccess(response.data.results)
            })
            .catch(() => {
                this.props.moviesSearchFailure()
            });

    }

    /**
     * Рисует поле для поиска.
     */
    renderSearchField = () => {
        return (
            <Row>
                <InputGroup>
                    <FormControl
                        className="searchField"
                        type="text"
                        value={this.state.searchValue}
                        placeholder="Введите название фильма"
                        onChange={this.handleInputChange}
                    />
                    <InputGroup.Button>
                        <Button
                            className="searchButton"
                            onClick={this.handleButtonClick}
                        >
                            Найти
                    </Button>
                    </InputGroup.Button>
                </InputGroup>
            </Row>
        )
    }

    /**
     * Рисует таблицу.
     */
    renderTable = () => {
        const { movies, isLoading } = this.props;
        return (
            movies.length > 0 &&
                (
                    isLoading ? 
                        <p>Идёт загрузка данных...</p> :
                        <Row className="table-panel">
                            <MoviesTable movies={movies} />
                        </Row>
                )
        )
    }

    render = () => {
        return (
            <Grid>
                {this.renderSearchField()}
                {this.renderTable()}
            </Grid>
        )
    }

}

SearchPage.propTypes = {
    movies: PropTypes.array,
    isLoading: PropTypes.boolean,
    isError: PropTypes.boolean,
    moviesSearchStart: PropTypes.function,
    moviesSearchSuccess: PropTypes.function,
    moviesSearchFailure: PropTypes.function
};


const mapStateToProps = (globalState) => {
    return {
        movies: globalState.movies,
        isLoading: globalState.isLoading,
        isError: globalState.isError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moviesSearchStart: () => dispatch(createSearchMoviesStartAction()),
        moviesSearchSuccess: (movies) => dispatch(createSearchMoviesSuccessAction(movies)),
        moviesSearchFailure: () => dispatch(createSearchMoviesFailureAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);