const prodUrl = 'https://travel-deficit-node-api.herokuapp.com/graphql'
const devUrl = 'http://localhost:8080/graphql'

const graphqlUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl

const get = (graphqlQuery) => (
    fetch(graphqlUrl, {
        method: 'POST',
        body: JSON.stringify(graphqlQuery),
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept'      : `application/json`
        }
    })).then(resp => resp.json())

const post = async (graphqlQuery) => {
    const token = localStorage.getItem('token')
    return await fetch(graphqlUrl, {
        method: 'POST',
        body: JSON.stringify(graphqlQuery),
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept'      : `application/json`
        }
    }).then(resp => resp.json())}

const newCountryInfo = async (token) => {
        const query = {query: `
            {
                countries {
                    countries {   
                        id
                        name
                        description
                        climate
                        continent
                        terrain
                        population
                        code
                        imageUrl
                    }
                    loggedIn
                    visitedCountries
                }
            }
        `}

        return await post(query, token)
    }

    const signup = async (userInfo) => {
        const errors = []
        const {username, dob, email, password, passwordConfirmation} = userInfo.submitData
        const promise = new Promise( async (resolve, reject) => {            
            try {
            const graphqlQuery = {
                query: `
                    mutation UserSignUp($email: String!, $dob: String!, $username: String!, $password: String!, $passwordConfirmation: String!) {
                    createUser(userInput: {
                        email: $email,
                        username: $username,
                        password: $password,
                        passwordConfirmation: $passwordConfirmation,
                        dob: $dob

                    }) {
                        id
                        email
                        username
                    }
                    }
                `,
                variables: {
                    email: email,
                    username: username,
                    password: password,
                    passwordConfirmation: passwordConfirmation,
                    dob: dob
                }
                }
                const resData = await get(graphqlQuery)
                
                if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(421)) {
                    const passwordError = new Error(
                        "Passwords don't match."
                    );
                    passwordError.message = "Passwords don't match."
                    passwordError.code = 421
                    errors.unshift(passwordError)
                }
                if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(422)) {
                    const emailError = new Error(
                        "Email address already registered."
                    );
                    emailError.message = "Email address already registered."
                    emailError.code = 422
                    errors.unshift(emailError)
                }
                if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(423)) {
                    const usernameError = new Error(
                        "Username exists. Please choose another username"
                    );
                    usernameError.message = "Username exists. Please choose another username."
                    usernameError.code = 423
                    errors.unshift(usernameError)
                }
                if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(424)) {
                    const invalidEmail = new Error(
                        "Invalid email address"
                    );
                    invalidEmail.message = "Invalid email address."
                    invalidEmail.code = 424
                    errors.push(invalidEmail)
                }
                if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(425)) {
                    const passwordLengthError = new Error(
                        "Password is too short (5 characters minimum)"
                    );
                    passwordLengthError.message = "Password is too short (5 characters minimum)"
                    passwordLengthError.code = 425
                    errors.push(passwordLengthError)
                }
                if (resData.errors && resData.errors.length > 0) {
                const signupErrors = new Error('User creation failed!');
                signupErrors.data = errors
                throw signupErrors
                }
                resolve({ isAuth: false, authLoading: false, signupSuccess: true, userID: resData.data.createUser.id, username: resData.data.createUser.name });
            } catch(err) {
                console.log(err);
                resolve({
                    isAuth: false,
                    authLoading: false,
                    error: errors,
                    signupSuccess: false
                })
            }
        })
        return promise
    }

    const login = async (loginData) => {
        const {username, password} = loginData
        const promise = new Promise( async (resolve, reject) => {
            try {
                const graphqlQuery = {
                    query: `
                    query LoginUser($username: String!, $password: String!){
                        login(
                        username: $username,
                        password: $password
                        ) {
                        token
                        userId
                        username
                        age
                        }
                    }
                    `,
                    variables: {
                    username: username,
                    password: password
                    }
                }
                const resData = await get(graphqlQuery)

                if (resData.errors) {
                    const loginError = new Error('Validation failed.');
                    loginError.data = resData.errors
                    throw loginError
                }
            
                localStorage.setItem('token', resData.data.login.token);
                localStorage.setItem('userId', resData.data.login.userId);
                localStorage.setItem('userName', resData.data.login.username);
                localStorage.setItem('userAge', resData.data.login.age);
        
                resolve ({
                    isAuth: true,
                    token: resData.data.login.token,
                    userId: resData.data.login.userId,
                    username: resData.data.login.username,
                    age: resData.data.login.age
                });
            } catch(err) {
                console.log(err);
                resolve ({
                    isAuth: false,
                    authLoading: false,
                    error: err
                });
            };
        })
        return promise
    }

    const addUserCountry = async (countryId) => {
        try {
            const graphqlQuery = {
                query: `
                    mutation addOrRemoveUserCountry($countryId: Int!) {
                        addRemoveUserCountry(userInput: {CountryId: $countryId})
                    }
                `,
                variables: {
                    countryId: Number(countryId)
                }
            }
            const resData = await post(graphqlQuery)
        } catch(err) {
            console.log(err)
        }
    }

    const addCountryToWishlist = async (countryId) => {
        try {
            const graphqlQuery = {
                query: `
                    mutation addOrRemoveWishlist($countryId: Int!) {
                        addRemoveWishlist(userInput: {CountryId: $countryId})
                    }
                `,
                variables: {
                    countryId: Number(countryId)
                }
            }
            const resData = await post(graphqlQuery)
        } catch(err) {
            console.log(err)
        }
    }

    export default {
        newCountryInfo,
        signup,
        login,
        addUserCountry,
        addCountryToWishlist,
    }