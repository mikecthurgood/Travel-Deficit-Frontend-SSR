import React, { useState, useEffect } from 'react'
import CountryCard from '../SidePanel/CountryCard'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'


// import API from '../Helpers/API'

const AddCountry = ({ selectedCountry, sidebarVisible, closeSideBar, handleSideBarAccordionClick, activeIndex, addOrRemoveCountry, handleCountryListClick, setFilter, addToWishList, wishlist, countries, visitedCountries, filter }) => {

    const [filterValue, setFilterValue] = useState('')

    useEffect(() => {
        countriesFilter()
    }, [filter])

    const countriesFilter = () => {
        if (filter === 'All') return countries
        if (filter === 'visited') return countries.filter(country => visitedCountries.includes(country.code))
        if (filter === 'not-visited') return countries.filter(country => !visitedCountries.includes(country.code))
        return []
    }

    
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
    }

    const sortedCountries = countriesFilter().length > 0 && countriesFilter().sort((a, b) => a.name.localeCompare(b.name))
    let filteredCountries = countries.length > 0 && sortedCountries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))
    const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()
        return (
            <div className='country-list-container'>

                <div className='country-list'>
                    <div className='country-list-page-title'><h3>Select a country to view stats and options or <Link href='/'>find on map</Link></h3></div>
                    <div className='filters'>
                        <div className='filter-button'><button className={`${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button></div>
                        <div className='filter-button'><button className={`${filter === 'visited' ? 'active' : ''}`} onClick={() => setFilter('visited')}>Visited</button></div>
                        <div className='filter-button'><button className={`${filter === 'not-visited' ? 'active' : ''}`} onClick={() => setFilter('not-visited')}>Not Visited</button></div>
                    </div>
                    <input type="text" autocomplete="off" placeholder='Start typing to filter by name' onChange={handleFilterChange} id='add-country-search-filter' />
                    <div className='country-list-items'>
                        {countries.length > 0 && filteredCountries.map(country =>
                            <div
                                key={country.id}
                                className={!visitedCountries.includes(country.code) ? 'country-item' : 'visited-country-item'}
                                onClick={() => handleCountryListClick(country.name)}
                            >
                                {country.name}
                            </div>
                        )}
                    </div>
                </div >
                <CountryCard
                    country={selectedCountry}
                    closeSideBar={closeSideBar}
                    handleClick={handleSideBarAccordionClick}
                    activeIndex={activeIndex}
                    addOrRemoveCountry={addOrRemoveCountry}
                    visitedCountries={visitedCountries}
                    selectedCountry={selectedCountry}
                    sidebarVisible={sidebarVisible}
                    addToWishList={addToWishList}
                    wishlist={wishlist}
                />
            </div >
        )
    }

export default AddCountry