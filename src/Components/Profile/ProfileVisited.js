import React from 'react'
import { Card } from 'semantic-ui-react'
import ScrollContainer from 'react-indiana-drag-scroll'

const ProfileVisited = ({ countries, visitedCountries }) => {

    const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (
        <>
            {filteredCountries.length > 0 && <h2 className='profile-row-heading'>Visited Countries</h2>}
            <ScrollContainer className="profile-row-visited" horizontal={true} vertical={false}>
                {continents && continents.map(continent =>
                    <div key={continent} >
                        <Card className='profile-country-card' key={continent}>
                            <Card.Content>
                                <h2>{continent}</h2>
                            </Card.Content>
                        </Card>
                        {filteredCountries.map(cntry => (cntry.continent === continent ?
                            <Card key={cntry.id} className='profile-country-card'>
                                <Card.Header>
                                    {cntry.name}
                                </Card.Header>
                                <Card.Content>
                                    <img className='flag' src={`/world-flags/${cntry.code}.png`}
                                    alt='country-flag'
                                    className='country-flag' />
                                </Card.Content>
                            </Card>
                            :
                            null))
                        }
                    </div>
                )
                }
            </ScrollContainer>
        </>
    )
}

export default ProfileVisited