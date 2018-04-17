import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { PropTypes } from 'prop-types';


export class MoviesTable extends Component {
    render () {
        const { movies } = this.props;
        return (
            <Table className="movies" striped>
                <thead>
                    <tr>
                        <th></th>
                        <th>Название</th>
                        <th>Формат</th>
                        <th>Дата релиза</th>
                        <th>Рейтинг</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((item, index) => (
                            <tr key={index}>
                                <td className="poster-cell"><img src={`http://image.tmdb.org/t/p/w92/${item.poster_path}`} /></td>
                                <td>{item.title}</td>
                                <td>Кино</td>
                                <td>{item.release_date}</td>
                                <td>{item.vote_average}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

MoviesTable.propTypes = {
    movies: PropTypes.array
};
