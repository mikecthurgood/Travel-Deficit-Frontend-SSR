import React from 'react'


const RecommendationTrips = ({ quotes, countryName }) => {

    const country = quotes.length > 0 && quotes.filter(quote => quote.name === countryName)
    const selectedQuote = quotes.length > 0 && country.map(quote => quote.data['Quotes'][0])
    const destination = quotes.length > 0 && country[0] && country[0].data.Places.filter(place => place['PlaceId'] === selectedQuote[0].OutboundLeg.DestinationId)
    const departure = quotes.length > 0 && country[0] && country[0].data.Places.filter(place => place['PlaceId'] === selectedQuote[0].OutboundLeg.OriginId)
    const departureDate = quotes.length > 0 && selectedQuote[0] && selectedQuote[0].OutboundLeg.DepartureDate.replace('T00:00:00', '')
    const carrier = quotes.length > 0 && country[0] && country[0].data.Carriers.filter(carrier => carrier.CarrierId === selectedQuote[0].OutboundLeg.CarrierIds[0])
    const price = quotes.length > 0 && selectedQuote[0] && selectedQuote[0].MinPrice

    return (
        quotes.length > 0 && country[0] && selectedQuote[0] ?
            <>
                <strong>Destination:</strong> {destination[0].Name}<br />
                <strong>Depart from:</strong> {departure[0].Name}<br />
                <strong>Departure Date:</strong> {departureDate}<br />
                <strong>Airline:</strong> {carrier[0].Name}<br />
                <strong>Prices from:</strong> £{price}<br />
            </>
            :
            <>
            </>
    )
}

export default RecommendationTrips