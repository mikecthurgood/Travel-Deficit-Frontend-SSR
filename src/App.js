import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import HomePage from './Components/MapPage/HomePage'
import NavBar from './Components/Navigation/NavBar'
import API from './Helpers/API';
import AddCountry from './Components/MapPage/AddCountry'
import SecondaryNav from './Components/Navigation/SecondaryNav'
import Profile from './Components/Profile/Profile'
// import Footer from './Components/Navigation/Footer'
import Recommendations from './Components/Recommendations/Recommendations'
import PrivacyPolicy from './Components/Profile/PrivacyPolicy'
// import { useEffect, useState } from 'react/cjs/react.production.min';

const App = ({page}) => {

  const [user, setUser] = useState({ id: 0, username: 'Mikey T', age: '36'})
  const [visitedCountries, setVisitedCountries] = useState({codes: [], names: []})
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [countryNamePopUpValue, setCountryNamePopUpValue] = useState("")
  const [countryNamePopUp, setCountryNamePopUp] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [loginMenuVisible, setLoginMenuVisibility] = useState(false)
  const [addCountryFilter, setAddCountryFilter] = useState('All') //STILL TO DO
  const [activeIndex, setActiveIndex] = useState(0) //STILL TO DO

  useEffect(() => {
    API.newCountryInfo()
      .then(data => {
        setCountries(data.data.countries.countries)
      })
    const countryCodes = localStorage.getItem('countries')
    const countryNames = localStorage.getItem('countryNames')
    if (countryCodes) {
      setVisitedCountries({codes: countryCodes.split(','), names: countryNames.split(',')})
    }
  }, [])
  
  const handleHover = (e) => {
    if (e.target && e.target.attributes && e.target.attributes.name && e.target.attributes.name.value) {
      setCountryNamePopUpValue(e.target.attributes.name.value)
      setCountryNamePopUp(true)
    } else {
      setCountryNamePopUp(false)
    }
  }

  const handleMousePositionChange = (e) => {
    setMousePosition({x: e.clientX, y: e.clientY})
  }

  const handleMapClick = (e) => {
    const country = countries.find(cntry => cntry.code === e.target.id)
    if (e.target && e.target.attributes && e.target.attributes.name && e.target.attributes.name.value) {
      setSelectedCountry(country)
      setSidebarVisible(true)
    } 
  }

  const loginMenuToggle = () => {
    setLoginMenuVisibility(!loginMenuVisible)
  }

  const handleCountryListClick = (countryName) => {
    const country = countries.find(country => country.name === countryName)
    setSelectedCountry(country)
    setSidebarVisible(true)
  }

  const addOrRemoveCountryButtonClick = (countryName) => {
    const country = countries.find(country => country.name === countryName)
    if (!visitedCountries.codes.includes(country.code)) {
      if (countries.length > 0){
        setVisitedCountries({codes: [...visitedCountries.codes, country.code], names: [...visitedCountries.names, country.name]})
        localStorage.setItem('countries', [...visitedCountries.codes, country.code])
        localStorage.setItem('countryNames', [...visitedCountries.names, country.name])
      } else {
        setVisitedCountries({codes: [country.code], names: [country.name]})
        localStorage.setItem('countries', country.code)
        localStorage.setItem('countryNames', country.name)
      }
      // API.addCountryToUser(userID, country.id)
    } else {
      const filteredCountryCodes = visitedCountries.codes.filter(cntry => cntry !== country.code)
      const filteredCountryNames = visitedCountries.names.filter(cntry => cntry !== country.name)
      setVisitedCountries({codes: filteredCountryCodes, names: filteredCountryNames})
      localStorage.setItem('countries', filteredCountryCodes)
      localStorage.setItem('countryNames', filteredCountryNames)

      // API.addCountryToUser(userID, country.id)
    }
  }

  const addToWishList = (countryId) => {
    if (!wishlist.includes(countryId)) {
      setWishlist([...wishlist, countryId])
      // API.addCountryToWishList(this.state.userID, countryId)
    } else {
      const filteredCountries = wishlist.filter(cntry => cntry !== countryId)
      setWishlist(filteredCountries)
      // API.addCountryToWishList(this.state.userID, countryId)
    }
  }

  const closeSideBar = () => {
    setSelectedCountry("")
    setSidebarVisible(false)
    setActiveIndex(0)
  }

  const handleSideBarAccordionClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  //login functions

  // guestLogin = () => {
  //   this.setState({ username: 'Guest' })
  //   this.props.history.push('/')
  // }

  // authenticate = (resp) => {
  //   API.login(resp.id, { name: resp.name, image_url: resp.picture.data.url, fb_id: resp.id })
  //     .then(res => {
  //       if (res.error) throw Error(res.error)
  //       console.log(res)
  //       this.setUser(res)
  //       this.props.history.push('/')
  //     })
  // };

  // setUser = (user) => {
  //   const countriesArray = user.user_countries && user.user_countries.map(country => country.country)
  //   const visited = user.user_countries && countriesArray.map(country => country.code)
  //   const visitedByName = user.user_countries && countriesArray.map(country => country.name)
  //   const wishList = user.wishlists && user.wishlists.map(country => country.country.id)
  //   console.log(user)
  //   this.setState({
  //     userID: user.id,
  //     username: user.name,
  //     userAge: user.age,
  //     user_image_url: user.image_url,
  //     userBadges: user.badges,
  //     visitedCountries: visited,
  //     visitedCountriesByName: visitedByName,
  //     wishlist: wishList
  //   })
  //   this.props.history.goBack()
  // }

  // setFilter = (filter) => {
  //   this.setState({
  //     addCountryFilter: filter
  //   })
  // }

  // updateAge = (age) => {
  //   if (this.state.username === 'Guest') {
  //     this.setState({ userAge: age })
  //   } else {
  //     API.updateAge(this.state.userID, age)
  //       .then(resp => resp.json)
  //       .then(console.log)
  //       .then(() => this.setState({ userAge: age }))
  //   }
  // }

  return (
    <>
      <div className='site'>
        <div className="App" >
          <NavBar
            username={user.name}
            loginMenuToggle={loginMenuToggle}
            loginMenuVisible={loginMenuVisible}
          />
          <SecondaryNav />
          <div className='site-body'>
              {page === 'home' && <HomePage
                user={user.id}
                countries={countries}
                handleMapClick={handleMapClick}
                visitedCountries={visitedCountries.codes}
                selectedCountry={selectedCountry}
                sidebarVisible={sidebarVisible}
                closeSideBar={closeSideBar}
                addOrRemoveCountry={addOrRemoveCountryButtonClick}
                activeIndex={activeIndex}
                handleSideBarAccordionClick={handleSideBarAccordionClick}
                countryNamePopUp={countryNamePopUp}
                countryNamePopUpValue={countryNamePopUpValue}
                mouseXPosition={mousePosition.x}
                mouseYPosition={mousePosition.y}
                mousePosition={handleMousePositionChange}
                handleHover={handleHover}
                addToWishList={addToWishList}
                wishlist={wishlist}
              />}
            {/* <Route path="/login" render={(routerProps) =>
              <Login
                {...routerProps}
                guestLogin={guestLogin}
                user={user.id}
                authenticate={authenticate}
                setUser={setUser}
              />
            } /> */}
            {page === 'listView' &&
              <AddCountry
                user={user.id}
                setUser={setUser}
                countries={countries}
                handleCountryListClick={handleCountryListClick}
                visitedCountries={visitedCountries.codes}
                selectedCountry={selectedCountry}
                sidebarVisible={sidebarVisible}
                closeSideBar={closeSideBar}
                addOrRemoveCountry={addOrRemoveCountryButtonClick}
                activeIndex={activeIndex}
                handleSideBarAccordionClick={handleSideBarAccordionClick}
                // setFilter={setFilter}
                addToWishList={addToWishList}
                wishlist={wishlist}
                filter={addCountryFilter}

              />}
            
            {page === 'profile' &&
              <Profile
                countries={countries}
                handleMapClick={handleMapClick}
                visitedCountries={visitedCountries.codes}
                visitedCountriesByName={visitedCountries.names}
                userName={user.username}
                userAge={user.age}
                // updateAge={updateAge}
                wishlist={wishlist}
              />}

            {page === 'recommendations' &&
              <Recommendations
                countries={countries}
                wishlist={wishlist}
              />}
            {page === 'privacyPolicy' &&
              <PrivacyPolicy
              />}

          </div>
        </div>

      </div>

      {/* <Footer /> */}
    </>
  );
}

export default App;
