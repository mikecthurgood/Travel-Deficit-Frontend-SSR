import React, {useState} from 'react'
import { Card, Button } from 'semantic-ui-react'

const UserInfo = (props) => {

    const { countries, visitedCountries, userName, userAge, badges, userImage, updateAge } = props
    const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    const [ageFormVisible, setAgeFormVisibility] = useState(false)

    const toggleAgeForm = () => {
        setAgeFormVisibility(!ageFormVisible)
    }

    const handleAgeChange = (e) => {
        e.preventDefault()
        props.updateAge(e.target['ageInput'].value)
        setAgeFormVisibility(!ageFormVisible)
    }

        return (
            <div className='user-container'>
                <div className='card profile-card user-info'>
                    <div className='card-header'>
                        <h3>My Stats</h3>
                    </div>
                    <div className='user-details'>
                        <p><strong>Username</strong>: {userName}</p>
                        <>
                            <p><strong>Age</strong>: 
                                <span className='age-form-span'>{` ${userAge}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {ageFormVisible &&
                                        <form onSubmit={handleAgeChange} >
                                            <input className='age-form' size="4" type="number" name='ageInput' />
                                        </form>}
                                    <button
                                        color={'blue'}
                                        onClick={toggleAgeForm}>{ageFormVisible ? 'Cancel' : userAge ? 'Update' : 'Add Age'}</button>
                                </span>
                                {/* :
                                <span className='age-form-span'>
                                    {ageFormVisible &&
                                        <form onSubmit={handleAgeChange}>
                                            <input className='age-form' size="4" type="number" name='ageInput' />
                                        </form>}
                                    <button
                                        color={'blue'}
                                        onClick={toggleAgeForm}>{!ageFormVisible ? 'Add Age' : 'Cancel'}
                                    </button>
                                </span> */}
                            </p>
                        </>
                        <p><strong>Travel Deficit</strong>: {userAge ? visitedCountries.length - userAge : <em>Add age to calculate</em> } </p>
                        <p><strong>Countries Visited</strong>: {visitedCountries.length}</p>
                        <p><strong>Regions Visited</strong>: {continents.length}</p>
                        {/* <p><strong>Badges Earned</strong>: {badges && badges.length > 0 ? badges.length : <span>No badges earned yet</span>}</p> */}
                    </div>
                </div>
            </div>
        )
    }

export default UserInfo