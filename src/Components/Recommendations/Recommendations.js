import React from 'react'
import API from '../../Helpers/API'
import { Card, Button } from 'semantic-ui-react'
import RecommendationTrips from './RecommendationTrips'
// import API from '../Helpers/API'


const configObj = (type, page, body = null) => {
    return {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

class Recommendations extends React.Component {

    state = {
        wishlist: [],
        quotes: [],
        countries: []
    }

    componentDidMount() {
        // Promise.all(
        //     this.props.countries.map(country => {
        //         return fetch(`http://localhost:3004/countries?name=${country.name}`).then(resp => resp.json())
        //     })
        // ).then(countries => {
        //     this.setState({
        //         countries: countries.filter(a => a.length > 0).map(a => a[0])
        //     })
        //     const b = countries.filter(a => a.length > 0).map(a => a[0])
        //     // console.log(b)
        //     b.map(c => {
        //         const d = this.props.countries.filter(country => country.name === c.name)
        //         const imageUrl = c.images[0].source_url
        //         API.addCountryImage(d[0].id, imageUrl)
        //     })
        // })



        // const wishlist = this.props.countries.length > 0 && this.props.countries.filter(country => this.props.wishlist.includes(country.id))
        // console.log(wishlist)

        // this.props.countries.length > 0 && wishlist.map(country => fetch(`http://localhost:3004/countries?name=${country.name}`).then(resp => resp.json()).then(country => this.setState({ wishlist: [...this.state.wishlist, ...country] })))
        const wl = this.props.countries.filter(country => this.props.wishlist.includes(country.id))
        this.props.countries.length > 0 && wl.map(country => API.travelLocations(country.name)
            .then(json => json['Places'][1]['CityId'] !== '-sky' ? API.getQuotes(json['Places'][1]['PlaceId']) : null).then(json => this.setState({ quotes: [...this.state.quotes, { name: country.name, data: json }] })))
    }

    dateInXDays = (x = 0) => {
        let date = new Date();
        const dd = String(date.getDate() + x).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()
        date = yyyy + '-' + mm + '-' + dd
        return date
    }

    render() {
        // const mapped = this.state.countries
        //     .filter(ctry => ctry && ctry.data && ctry.data[0] && ctry.data[0].images)
        //     .map(ctry => ctry.data[0].images[0])
        // console.log(mapped)

        const wl = this.props.countries.filter(country => this.props.wishlist.includes(country.id))
        const quotes = this.state.quotes.filter(quote => quote.data !== null)
        return (
            <>
                <div className='recommendations-page-container'>
                    {wl.length > 0 ? <>
                        {this.props.countries.length > 0 && wl.map(country => country.image_url && (

                            <Card className='recommendation-card' key={country.id}>
                                <Card.Header>
                                    <h2>{country.name}</h2>
                                </Card.Header>
                                <Card.Content className='country-image-container'>
                                    <div className='country-image-inner-container'>
                                        <img className='country-image' src={country.image_url} />
                                    </div>
                                </Card.Content>
                                <Card.Content>
                                    <div className='suggested-trip'>
                                        <RecommendationTrips countryName={country.name} quotes={quotes} />
                                    </div>
                                </Card.Content>
                                <Card.Content>
                                    <a href="https://www.skyscanner.net/" target='popup' onClick={() => window.open('https://www.skyscanner.net/', 'popup', 'width=600,height=600')}><Button fluid> Visit Skyscanner for more flights </Button></a>
                                </Card.Content>
                            </Card>
                        ))}</> :
                        <h2>Add a few more countries to your wishlist to enable recommendations</h2>}
                </div>
            </>
        )
    }
}

export default Recommendations  