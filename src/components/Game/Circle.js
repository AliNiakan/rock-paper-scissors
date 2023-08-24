import React from 'react';
import "./Circle.css";

const Circle = ({ type , onClickHandler}) => {
    const circleStyle = {
        backgroundImage: `conic-gradient(from 271deg, hsl(${type.primaryBorderColor}), hsl(${type.secondBorderColor})`
    };
    return (
        <div className='circle-container' >
            <div className='circle' style={circleStyle} onClick={onClickHandler} >
                <div className='inner-circle'>
                    <img src={type.icon} alt='icon' />
                </div>
            </div>
        </div>
    );
}

export default Circle;