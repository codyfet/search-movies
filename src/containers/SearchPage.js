import React, { Component } from 'react';
import { Grid, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { MoviesTable } from '../components/MoviesTable.js';
import { connect } from 'react-redux';
import { createSearchMoviesStartAction, createSearchMoviesSuccessAction, createSearchMoviesFailureAction } from '../actions/actions.js';
import { searchMovies } from '../services/service.js';
import { PropTypes } from 'prop-types';
import Select from 'react-select';

class SearchPage extends Component {

    state = {
        format: null,
        genre: null,
        year: null,
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
        const { searchValue, year } = this.state;

        this.props.moviesSearchStart();

        searchMovies(searchValue, year)
            .then((response) => {
                this.props.moviesSearchSuccess(response.data.results)
            })
            .catch(() => {
                this.props.moviesSearchFailure()
            });

    }

    handleFormatChange = (option) => {
        this.setState({
            "format": option ? option.value : null
        })
    }

    handleGenreChange = (option) => {
        this.setState({
            "genre": option ? option.value : null
        })
    }

    handleYearChange = (option) => {
        this.setState({
            "year": option ? option.value : null
        })
    }

    renderSearchField = () => {
        return (
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
        )
    }

    renderFormatFilter = () => {        
        const options = [
            {
                label: "Кино",
                value: "Кино"
            },
            {
                label: "Сериал",
                value: "Сериал"
            }
        ];

        console.log(options.find(item => {console.log(item); return item.value === this.state.format}))

        return (
            <Select 
                name="format"
                placeholder="Выберите формат"
                searchable={false}
                options={options}
                value={options.find(item => item.value === this.state.format)}
                onChange={this.handleFormatChange}
            />
        )
    }

    renderGenreFilter = () => {
        const options = [
            {
                label: "Триллер",
                value: "Триллер"
            },
            {
                label: "Боевик",
                value: "Боевик"
            },
            {
                label: "Мелодрамма",
                value: "Мелодрамма"
            }
        ];
        return (
            <Select 
                name="genre"
                placeholder="Выберите жанр"
                searchable={false}
                options={options}
                value={options.find(item => item.value === this.state.genre)}
                onChange={this.handleGenreChange}
            />
        )
    }

    renderYearFilter = () => {
        const options = [
            {
                label: "2000",
                value: "2000"
            },
            {
                label: "2001",
                value: "2001"
            },
            {
                label: "2001",
                value: "2001"
            }
        ];
        return (
            <Select 
                name="year"
                placeholder="Выберите год"
                searchable={false}
                options={options}
                value={options.find(item => item.value === this.state.year)}
                onChange={this.handleYearChange}
            />
        )
    }

    renderFilters = () => {
        return (
            <Row>
                <Col md={3}>
                    {this.renderFormatFilter()}
                </Col>
                <Col md={3}>
                    {this.renderGenreFilter()}
                </Col>
                <Col md={3}>
                    {this.renderYearFilter()}
                </Col>
                <Col md={3}>
                    {this.renderSearchField()}
                </Col>
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
                {this.renderFilters()}
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