import React from 'react'
import { Card, Button } from 'semantic-ui-react'

class UserInfo extends React.Component {

    state = {
        ageFormVisible: false,
    }

    toggleAgeForm = () => {
        this.setState({
            ageFormVisible: !this.state.ageFormVisible
        })
    }

    updateAge = (e) => {
        e.preventDefault()
        this.props.updateAge(e.target['ageInput'].value)
        this.setState({
            ageFormVisible: false
        })
    }

    render() {
        const { countries, visitedCountries, userName, userAge, badges, userImage, updateAge } = this.props
        const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
        const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

        return (
            <div className='user-container'>
                <div className='user-info'>
                    <Card className='profile-card'>
                        <Card.Header>
                            Details
                    </Card.Header>
                        <Card.Content >
                            <div className='user-details'>
                                <p className='user-details-card-p'><strong>Username</strong>: {userName}</p>
                                <>
                                    <strong>Age</strong>: {userAge ?
                                        <span className='age-form-span'>{`${userAge}`}
                                            {this.state.ageFormVisible &&
                                                <form onSubmit={this.updateAge} >
                                                    <input className='age-form' size="4" type="number" name='ageInput' />
                                                </form>}
                                            <button
                                                color={'blue'}
                                                onClick={this.toggleAgeForm}>{!this.state.ageFormVisible ? 'Update' : 'Cancel'}</button>
                                        </span>
                                        :
                                        <span className='age-form-span'>
                                            {this.state.ageFormVisible &&
                                                <form onSubmit={updateAge}>
                                                    <input className='age-form' size="4" type="number" name='ageInput' />
                                                </form>}
                                            <button
                                                color={'blue'}
                                                onClick={this.toggleAgeForm}>{!this.state.ageFormVisible ? 'Add Age' : 'Cancel'}
                                            </button>
                                        </span>}
                                </>
                                <p className='user-details-card-p'><strong>Travel Deficit</strong>: {userAge ? <span> {visitedCountries.length - userAge} </span> : <span><em>Add age to calculate</em></span>}</p>
                                <p className='user-details-card-p'><strong>Countries Visited</strong>: {visitedCountries.length}</p>
                                <p className='user-details-card-p'><strong>Regions Visited</strong>: {continents.length}</p>
                                {/* <p className='user-details-card-p'><strong>Badges Earned</strong>: {badges && badges.length > 0 ? badges.length : <span>No badges earned yet</span>}</p> */}
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                <div className='user-details'></div>

            </div>
        )
    }
}

export default UserInfo