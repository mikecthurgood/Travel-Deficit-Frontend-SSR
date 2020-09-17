import React from 'react'
import { Card } from 'semantic-ui-react'
import defaultAvatar from '../../Assets/default-avatar.png'

const LeaderBoard = ({ userImage, userName, visitedCountries, userAge, countries }) => {

    // const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    // const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (
        <div className='leaderboard'>
            <Card className='profile-card'>
                <Card.Header>
                    Leaderboard
                </Card.Header>
                <Card.Content >
                    {userName === 'Guest' ? <h2>Login to view leaderboard</h2> :
                        <>
                            <div className='leaderboard'>
                                <div className='leaderboard-item'>
                                    <span className='username-heading'><strong>Username</strong></span>
                                    <span className='ranking-score-heading'><strong>Travel Deficit</strong></span>
                                </div>
                                <div className='leaderboard-item'>
                                    <img className='leaderboard-profile-image' src={defaultAvatar} alt='user 1' />
                                    <span className='username'>Bob Fleming</span>
                                    <span className='ranking-score'>+28</span>
                                </div>
                                {/* <hr className='break' /> */}
                                <div className='leaderboard-item'>
                                    <img className='leaderboard-profile-image' src={userImage ? userImage : defaultAvatar} alt={`${userName}`} />
                                    <span className='username'>{userName}</span>
                                    <span className='ranking-score'>{visitedCountries.length - userAge}</span>
                                </div>
                                {/* <hr className='break' /> */}
                                <div className='leaderboard-item'>
                                    <img className='leaderboard-profile-image' src={defaultAvatar} alt='user 3' />
                                    <span className='username'>Steve Rogers</span>
                                    <span className='ranking-score'>-18</span>
                                </div>
                                {/* <hr className='break' /> */}
                                <div className='leaderboard-item'>
                                    <img className='leaderboard-profile-image' src={defaultAvatar} alt='user 4' />
                                    <span className='username'>Tony Stark</span>
                                    <span className='ranking-score'>-23</span>
                                </div>
                                {/* <hr className='break' /> */}
                                <div className='leaderboard-item'>
                                    <img className='leaderboard-profile-image' src={defaultAvatar} alt='user 5' />
                                    <span className='username'>Wanda Maximov</span>
                                    <span className='ranking-score'>-44</span>
                                </div>
                            </div>
                        </>}
                </Card.Content>


            </Card>
        </div >

    )
}

export default LeaderBoard

