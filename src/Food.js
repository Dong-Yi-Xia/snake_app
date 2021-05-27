import React from 'react'
import Heart from './asset/heart.png'
import Cry from './asset/cry.png'
import Angel from './asset/angel.png'


let foodSelection = [Heart, Cry, Angel]

export default function Food({foodDot}) {

    const style = {
        left: `${foodDot[0]}%`,
        top: `${foodDot[1]}%`,
        backgroundImage: `url(${Heart})`
    }

    return (
        <div>
            <div className="food-dot" style={style}></div>
        </div>
    )
}
