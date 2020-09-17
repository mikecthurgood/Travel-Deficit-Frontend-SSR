import React from 'react'
import { Icon, Accordion } from 'semantic-ui-react'


const CountryCard = ({ country, handleClick, activeIndex }) => {

    return (

        <Accordion styled fluid className='side-panel-accordion'>
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Icon name='info' /><strong>Details</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <div className='country-card-header'>
                    <img className='flag' src={`/world-flags/${country.code}.png`} alt='country-flag' />
                    {/* <img id='main-logo' src={(require('../Assets/TD-logo.png').default)} alt="" /> */}

                    <h2>{country.name}</h2>
                </div>
                <Icon name='map marker alternate' /> <strong>Region:</strong> {country.continent}
            </Accordion.Content>
            <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Icon name='users' /><strong>Population</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
                <p>
                    <Icon name='users' />{country.population}
                </p>
            </Accordion.Content>
            <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Icon name='sun' /><strong>Climate</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
                <p>
                    {country.climate}
                </p>
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Icon name='picture' /> <strong>Terrain:</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
                <p>
                    {country.terrain}
                </p>
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 4}
                index={4}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Icon name='book' /><strong>Description</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 4}>
                <p>
                    {country.description}
                </p>
            </Accordion.Content>
        </Accordion>
    )
}

export default CountryCard