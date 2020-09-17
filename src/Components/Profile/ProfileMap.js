import React from 'react'
import WorldMapView from '../MapPage/WorldMapView'
import { Card } from 'semantic-ui-react'

const ProfileMap = ({ countries, visitedCountries }) => {

    const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (
        <div className='countries-container'>
            <Card className='profile-card'>
                <Card.Header>
                    Your World Map
                     </Card.Header>
                <Card.Content>
                    <WorldMapView
                        visitedCountries={visitedCountries}
                    />
                </Card.Content>
            </Card>
        </div >
    )
}

export default ProfileMap