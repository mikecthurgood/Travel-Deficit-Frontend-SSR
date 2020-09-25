import React from 'react'
import SidePanel from './SidePanel'

// import { Button } from 'semantic-ui-react'


const CountryCard = ({ country, closeSideBar, addOrRemoveCountry, visitedCountries, sidebarVisible, selectedCountry, addToWishList, wishlist, page }) => {

    return (
        (
            
            <div className={`stats-sidebar ${selectedCountry && sidebarVisible ? 'visible' : ''}`}>
                <div>
                    <button
                        className='close-sidebar-button'
                        onClick={closeSideBar}>
                        ▶<br /><br /><br /><br /><br /><br /><br /><br />▶
                    </button>
                </div>
                {country &&
                <div className='side-bar-content-container'>
                        <SidePanel
                            country={country}
                        />
                    <div className='sidepanel-buttons'>
                        <button
                            className='add-country-button added'
                            onClick={() => addOrRemoveCountry(country.name)}
                        >
                            {!visitedCountries.includes(country.code) ? 'Add To Visited' : 'Remove From Visited'}
                        </button>
                        {/* {!visitedCountries.includes(country.code) &&
                            <button                                 className='add-to-wishlist-button'
                                onClick={() => addToWishList(country.id)}
                            >
                                {!wishlist.includes(country.id) ? 'Add To Wishlist' : 'Remove From Wishlist'}
                            </button>} */}
                        
                    </div>
                </div>
    
                }
            </div>
        )
    )
}

export default CountryCard