export const createSearchMoviesStartAction = () => ({
    type: 'SEARCH_MOVIES_START'
})

export const createSearchMoviesSuccessAction = (movies) => ({
    type: 'SEARCH_MOVIES_SUCCESS',
    payload: movies
})

export const createSearchMoviesFailureAction = () => ({
    type: 'SEARCH_MOVIES_FAILURE'
})
