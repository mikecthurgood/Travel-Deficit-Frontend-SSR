import React from 'react'
import SidePanelAccordion from './SidePanelAccordion'

import { Button } from 'semantic-ui-react'


const CountryCard = ({ country, closeSideBar, handleClick, activeIndex, addOrRemoveCountry, visitedCountries, sidebarVisible, selectedCountry, addToWishList, wishlist }) => {

    return (
        <div className={selectedCountry && sidebarVisible ? 'stats-sidebar' : 'sidebar-hidden'}>
            <div className={sidebarVisible ? 'country-card-content' : 'sidebar-hidden'}>
                <Button fluid
                    className='close-sidebar-button'
                    onClick={closeSideBar}>
                    Close
                </Button>
                {country &&
                    <div>
                        <Button
                            fluid className='add-country-button'
                            onClick={() => addOrRemoveCountry(country.name)}
                        >
                            {!visitedCountries.includes(country.code) ? 'Add To Visited' : 'Remove From Visited'}
                        </Button>
                        {!visitedCountries.includes(country.code) &&
                            <Button fluid
                                className='add-to-wish-list'
                                onClick={() => addToWishList(country.id)}
                            >
                                {!wishlist.includes(country.id) ? 'I Want To Go Here' : 'Remove From Wishlist'}
                            </Button>}

                        <SidePanelAccordion
                            handleClick={handleClick}
                            activeIndex={activeIndex}
                            country={country}
                        />
                        <Button
                            fluid className='add-country-button'
                            onClick={() => addOrRemoveCountry(country.name)}
                        >
                            {!visitedCountries.includes(country.code) ? 'Add To Visited' : 'Remove From Visited'}
                        </Button>
                        {!visitedCountries.includes(country.code) &&
                            <Button fluid
                                className='add-to-wish-list'
                                onClick={() => addToWishList(country.id)}
                            >
                                {!wishlist.includes(country.id) ? 'I Want To Go Here' : 'Remove From Wishlist'}
                            </Button>}
                        <Button fluid
                            className='close-sidebar-button'
                            onClick={closeSideBar}>
                            Close
                        </Button>

                    </div>

                }
            </div>

        </div>
    )
}

export default CountryCard