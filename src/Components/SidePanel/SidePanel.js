import React, {useState} from 'react'


const CountryCard = ({ country }) => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (

        <div className='side-panel-content'>

                <div className='country-card-header'>
                    <span><img className='flag' src={`/world-flags/${country.code}.png`} alt='country-flag' /><h2> {country.name} </h2><img className='flag' src={`/world-flags/${country.code}.png`} alt='country-flag' /></span>
                </div>

                <div className='country-tabs'>
                    <span onClick={() => setActiveIndex(0)}><h4>Stats</h4></span>
                    <span onClick={() => setActiveIndex(1)}><h4>Description</h4></span>
                </div>

                <div className='country-content'>
                    <div className={`country-stats ${activeIndex === 0 ? 'visible' : ''}`}>
                        <p><strong>Region</strong>: {country.continent}</p>
                        
                        <p><strong>Population</strong>: {country.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>

                        <p><strong>Climate</strong>: {country.climate}</p>

                        <p><strong>Terrain</strong>: {country.terrain}</p>
                    </div>

                    <div className={`country-description ${activeIndex === 1 ? 'visible' : ''}`}>
                        <p>{country.description}</p>
                    </div>

                </div>

        </div>
    )
}

export default CountryCard