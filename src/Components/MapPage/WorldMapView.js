import React from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import worldMap from '../../Helpers/worldMap'
import CountryName from '../SidePanel/CountryName'

const HomePage = ({ handleMapClick, visitedCountries, countryNamePopUp, countryNamePopUpValue, mouseXPosition, mouseYPosition, mousePosition, handleHover }) => (

    <div id="chartdiv" onMouseMove={mousePosition}>
        <>
            <CountryName
                visible={countryNamePopUp}
                countryName={countryNamePopUpValue}
                x={mouseXPosition}
                y={mouseYPosition}
            />
            <VectorMap
                {...worldMap}
                onClick={handleMapClick}
                onMouseOver={handleHover}
                checkedLayers={visitedCountries}
            />
        </>
    </div>
)

export default HomePage