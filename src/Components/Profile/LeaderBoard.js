import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'
import defaultAvatar from '../../Assets/default-avatar.png'

const LeaderBoard = ({ user, visitedCountries, userAge, countries }) => {

    // const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    // const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()
    const placeholderUsers = [{name: user.username, score: Number(visitedCountries.length - user.age)}, {name: 'Bob Fleming', score: 3}, {name: 'Steve Rogers', score: -18}, {name: 'Tony Stark', score: -23}, {name: 'Wanda Maximov', score: -44}]
    const sortedUsers = placeholderUsers.sort((a, b) => b.score > a.score ? 1 : -1)
    return (
        <div className='leaderboard-container'>
            <Card className='leaderboard-card profile-card'>
                <div className='card-header'>
                    <h3>Leaderboard</h3>
                </div>
                    {user.username === 'Guest' ? <h4>Login to view leaderboard</h4> :
                        <>
                            <div className='leaderboard-wrapper'>
                                <div className='leaderboard'>
                                    <div className='leaderboard-item'>
                                        <span className='username heading'><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User</strong></span>
                                        <span className='ranking-score heading'><strong>Travel Deficit</strong></span>
                                    </div>
                                    {sortedUsers.map(placeholder => (
                                        <div className='leaderboard-item' key={placeholder.name}>
                                            <span className='username'><div className='leaderboard-profile-image test'><p>{placeholder.name.split('')[0].toUpperCase()}</p></div>{`  ${placeholder.name}`}</span>
                                            <span className='ranking-score'>{placeholder.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>}
            </Card>
        </div >

    )
}

export default LeaderBoard

