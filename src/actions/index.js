export const SET_LOGIN_VALUE = 'SET_LOGIN_VALUE';
export const SET_TRIVIA_VALUE = 'SET_TRIVIA_VALUE';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const setUserLogin = (payload) => (
  {
    type: SET_LOGIN_VALUE, payload,
  }
);

export const setTriviaRequest = (payload) => ({
  type: SET_TRIVIA_VALUE, payload,
});

export const failedRequest = (payload) => ({
  type: FAILED_REQUEST, payload,
});

export const fetchTriviaQuestions = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();
    return dispatch(setTriviaRequest(data));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
