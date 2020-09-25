import React from 'react'
import WorldMapView from '../MapPage/WorldMapView'
import { Card } from 'semantic-ui-react'

const ProfileMap = ({ countries, visitedCountries }) => {

    const filteredCountries = countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name)) || []
    const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (
        <div className='countries-container'>
            <Card className='profile-card map-card'>
                <div className='card-header'>
                    <h3>Your World Map</h3>
                </div>
                <div className='profile-map-content'>
                    <div className='profile-map'>
                    <WorldMapView
                        visitedCountries={visitedCountries}
                    />
                    </div>
                    <div className='profile-map-flags'>
                        {filteredCountries.map(cnt => (
                            <div key={cnt.code}>
                                <div className="profile-map-flag">
                                    <div className="profile-map-flag-inner">
                                        <div className="profile-map-flag-front">
                                        <img src={`/world-flags/${cnt.code}.png`} alt={cnt.name}/>
                                        </div>
                                        <div className="profile-map-flag-back">
                                        <h4>{cnt.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div >
    )
}

export default ProfileMap