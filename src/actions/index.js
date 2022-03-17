export const SET_LOGIN_VALUE = 'SET_LOGIN_VALUE';
export const SET_TOKEN_VALUE = 'SET_TOKEN_VALUE';
export const SET_TRIVIA_VALUE = 'SET_TRIVIA_VALUE';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SET_OPTIONS = 'SET_OPTIONS';

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

export const setTokenRequest = (payload) => ({
  type: SET_TOKEN_VALUE, payload,
});

export const setOptions = (payload) => ({
  type: SET_OPTIONS, payload,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    return dispatch(setTokenRequest(token));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const defaultOptions = {
  amount: 5,
  difficulty: 'easy',
  category: 'any',
  type: 'multiple',
};

export const fetchTriviaQuestions = (options = defaultOptions) => async (dispatch) => {
  try {
    const { amount, difficulty, category, type } = options;
    const { token } = localStorage;
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}&difficulty=${difficulty}&type=${type}&${category !== 'any' && `category=${category}`}&encode=url3986`);
    const data = await response.json();
    const decodedData = data.results.map((current) => (
      {
        ...current,
        category: decodeURIComponent(current.category),
        question: decodeURIComponent(current.question),
        incorrect_answers: current.incorrect_answers.map(decodeURIComponent),
        correct_answer: decodeURIComponent(current.correct_answer),
      }
    ));

    return dispatch(setTriviaRequest({ results: decodedData }));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
