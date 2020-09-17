const baseUrl = 'https://travel-deficit-api.herokuapp.com/'
const usersUrl = baseUrl + 'users/'
const addCountryToUserURL = baseUrl + 'add-user-country'
const addCountryToWishListURL = baseUrl + 'add-to-wishlist'
const addImageToCountryURL = baseUrl + 'countries/'
const graphqlUrl = 'http://localhost:8080/graphql'


class API {
    
    static newCountryInfo = () => {
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
                }
            }
        `}

        return this.post(graphqlUrl, query)
    }
    
    static countryInfo = () => (
        fetch(baseUrl + '/countries-and-info')
            .then(res => res.json())
    )

    static addCountryImage = (countryId, imageUrl) => (
        this.patch(addImageToCountryURL + countryId, { image_url: imageUrl })
    )

    static addCountryToUser = (userId, countryId) => (
        this.post(addCountryToUserURL, { userId, countryId })
    )

    static addCountryToWishList = (userId, countryId) => (
        this.post(addCountryToWishListURL, { userId, countryId })
    )

    static updateAge = (userId, age) => (
        this.patch(usersUrl + userId, { age })
    )

    static login = (fb_id, userData) => (
        fetch(baseUrl + 'login', {
            method: 'POST',
            headers: {
                Authorization: fb_id,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }).then(resp => resp.json())
    )

    static travelLocations = (query) => (
        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${query}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "571c034a1amshba07a35df5f1f2bp163af5jsn9566c59b5b86",
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))
    )

    static createFlightSession = (departureLocation, destination, departureDate, returnDate) => (
        this.post(baseUrl + 'countries/recommendations', { departureLocation, destination, departureDate, returnDate })
    ).then(console.log)

    static getQuotes = (destination) => (
        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/LOND-sky/${destination}/anytime?inboundpartialdate=anytime`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "571c034a1amshba07a35df5f1f2bp163af5jsn9566c59b5b86"
            }
        })
            .then(resp => resp.json())
            .catch(err => {
                console.log(err);
            })
    )

    static validate = (fb_id) => (
        fetch(baseUrl + 'validate', {
            headers: {
                Authorization: fb_id
            }
        }).then(resp => resp.json())
    )

    static post = (url, data) =>
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())

    static patch = (url, data) =>
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept'      : `application/json`
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
}

export default API