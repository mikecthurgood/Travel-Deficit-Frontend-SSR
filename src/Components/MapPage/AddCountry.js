import React from 'react'
import CountryCard from '../SidePanel/CountryCard'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'


// import API from '../Helpers/API'

class AddCountry extends React.Component {

    state = {
        filterValue: ""
    }

    handleChange = (e) => {
        this.setState({ filterValue: e.target.value })
    }

    countries = () => {
        if (this.props.filter === 'All') return this.props.countries
        if (this.props.filter === 'visited') return this.props.countries.filter(country => this.props.visitedCountries.includes(country.code))
        if (this.props.filter === 'not-visited') return this.props.countries.filter(country => !this.props.visitedCountries.includes(country.code))
    }

    render() {
        let countries = this.countries()
        let sortedCountries = countries.length > 0 && countries.sort((a, b) => a.name.localeCompare(b.name))
        let filteredCountries = countries.length > 0 && sortedCountries.filter(country => country.name.toLowerCase().includes(this.state.filterValue.toLowerCase()))
        const { selectedCountry, visitedCountries, sidebarVisible, closeSideBar, handleSideBarAccordionClick, activeIndex, addOrRemoveCountry, handleCountryListClick, setFilter, addToWishList, wishlist } = this.props
        const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()
        return (
            <div className='country-list-container'>

                <div className='country-list'>
                    <div className='country-list-page-title'><h3>Select a country to view stats and options or <Link href='/'>find on map</Link></h3></div>
                    <div className='filters'>
                        <div className='filter-button'><Button color={this.props.filter === 'All' ? 'orange' : 'blue'} onClick={() => setFilter('All')} fluid>All</Button></div>
                        <div className='filter-button'><Button color={this.props.filter === 'visited' ? 'orange' : 'blue'} onClick={() => setFilter('visited')} fluid>Visited</Button></div>
                        <div className='filter-button'><Button color={this.props.filter === 'not-visited' ? 'orange' : 'blue'} onClick={() => setFilter('not-visited')} fluid>Not Visited</Button></div>
                    </div>
                    <input type="text" autocomplete="off" placeholder='Search Countries' onChange={this.handleChange} id='add-country-search-filter' />
                    <div className='country-list-items'>
                        {countries.length > 0 && filteredCountries.map(country =>
                            <div
                                key={country.id}
                                className={!this.props.visitedCountries.includes(country.code) ? 'country-item' : 'visited-country-item'}
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
}

export default AddCountry