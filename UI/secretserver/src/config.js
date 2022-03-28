const Url = {
    // production: 'http://demo-dataportal.gosaas.io:5000',
    production: 'https://secretserver1234.herokuapp.com',
    //production:'https://coast-dev-portal.gosaas.io',
    development: 'http://localhost:5000',
    //production:"http://localhost:5000"
};

export const SERVER_URL = Url[process.env.REACT_APP_ENV];