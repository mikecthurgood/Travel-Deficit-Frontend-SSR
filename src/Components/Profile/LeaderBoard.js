import React from 'react'
import { Card } from 'semantic-ui-react'
import defaultAvatar from '../../Assets/default-avatar.png'

const LeaderBoard = ({ userImage, userName, visitedCountries, userAge, countries }) => {

    // const filteredCountries = countries.length > 0 && countries.filter(country => visitedCountries.includes(country.code)).sort((a, b) => a.name.localeCompare(b.name))
    // const continents = filteredCountries.length > 0 && [...new Set(filteredCountries.map(country => country.continent))].sort()

    return (
        <div className='leaderboard-container'>
            <Card className='leaderboard-card profile-card'>
                <div className='card-header'>
                    <h3>Leaderboard</h3>
                </div>
                    {userName === 'Guest' ? <h4>Login to view leaderboard</h4> :
                        <>
                            <div className='leaderboard-wrapper'>
                                <div className='leaderboard'>
                                    <div className='leaderboard-item'>
                                        <span className='username heading'><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User</strong></span>
                                        <span className='ranking-score heading'><strong>Travel Deficit</strong></span>
                                    </div>
                                    <div className='leaderboard-item'>
                                        {/* <span><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 1' /></span> */}
                                        <span className='username'><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 1' /> Bob Fleming</span>
                                        <span className='ranking-score'>+28</span>
                                    </div>
                                    {/* <hr className='break' /> */}
                                    <div className='leaderboard-item'>
                                        {/* <span><img className='leaderboard-profile-image' src={userImage ? userImage : defaultAvatar} alt={`${userName}`} /></span> */}
                                        <span className='username'><img className='leaderboard-profile-image' src={userImage ? userImage : defaultAvatar} alt={`${userName}`} />{`  ${userName}`}</span>
                                        <span className='ranking-score'>{visitedCountries.length - userAge}</span>
                                    </div>
                                    {/* <hr className='break' /> */}
                                    <div className='leaderboard-item'>
                                        {/* <span><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 3' /></span> */}
                                        <span className='username'><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 3' />{`  Steve Rogers`}</span>
                                        <span className='ranking-score'>-18</span>
                                    </div>
                                    {/* <hr className='break' /> */}
                                    <div className='leaderboard-item'>
                                        {/* <span><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 4' /></span> */}
                                        <span className='username'><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 4' />{`  Tony Stark`}</span>
                                        <span className='ranking-score'>-23</span>
                                    </div>
                                    {/* <hr className='break' /> */}
                                    <div className='leaderboard-item'>
                                        {/* <span><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 5' /></span> */}
                                        <span className='username'><img className='leaderboard-profile-image' src={defaultAvatar} alt='user 5' />{`  Wanda Maximov`}</span>
                                        <span className='ranking-score'>-44</span>
                                    </div>
                                </div>
                            </div>
                        </>}
            </Card>
        </div >

    )
}

export default LeaderBoard

