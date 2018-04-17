/**
 * Функция-редьюсер.
 * 
 * @param {*} state Глобальный стейт приложения.
 * @param {*} action Текущее действие.
 */
export const reducer = (state, action) => {
    
    if (state === undefined) {
        state = {
            movies: [],
            isLoading: false,
            isError: false
        }
        return state;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case "SEARCH_MOVIES_START": 
            newState.isLoading = true;
            break;
        case "SEARCH_MOVIES_SUCCESS": 
            newState.isLoading = false;
            newState.movies = action.payload;
            break;
        case "SEARCH_MOVIES_FAILURE":
            newState.isLoading = false;
            newState.isError = true;
            break;
        default: 
            return state;
    }

    return newState;
}