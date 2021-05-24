import React from 'react'




export default function Food({foodDot}) {

    const style = {
        left: `${foodDot[0]}%`,
        top: `${foodDot[1]}%`
    }

    return (
        <div>
            <div className="food-dot" style={style}></div>
        </div>
    )
}
