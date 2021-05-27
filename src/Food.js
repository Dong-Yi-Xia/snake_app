import React, {useState} from 'react'
import cookie from './asset/cookie.png'
import sushi from './asset/sushi.png'
import burger from './asset/burger.jpeg'
import hotdog from './asset/hotdog.jpeg'
import ice from './asset/ice.jpeg'
import taco from './asset/taco.jpeg'



let foodSelection = [cookie,burger,hotdog,ice,taco,sushi]
let myfood = foodSelection[0]

export default function Food({foodDot}) {

    const [currentFood, setCurrentFood] = useState([])

    const randomFood = () => {
        return Math.floor( Math.random()* foodSelection.length )
    }

    if(foodDot !== currentFood){
        myfood = foodSelection[randomFood()]
        setCurrentFood(foodDot)
    }


    const style = {
        left: `${foodDot[0]}%`,
        top: `${foodDot[1]}%`,
        backgroundImage: `url(${myfood})`
    }

  
    return (
        <div>
            <div className="food-dot" style={style}></div>
        </div>
    )
}


