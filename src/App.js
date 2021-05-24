import React, {Component} from 'react'
import './index.css';
import Snake from './snake'
import Food from './Food'


const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor( (Math.random()*(max-min+1)+ min) /2 ) * 2
  let y= Math.floor( (Math.random()*(max-min+1)+ min) /2 ) * 2
  return [x,y]
}


const initalState = {
    foodDot: getRandomCoordinates(),
    speed: 200,
    direction: 'RIGHT',
    pause: true,
    snakeDots: [
    //[x,y]
      [0,0],
      [2,0]
    ]
}



class App extends Component {

  state = {
    ...initalState
  }


  componentDidMount(){
    setInterval(this.movement, this.state.speed)
    document.onkeydown = this.onkeydown
  }


  componentDidUpdate(){
    this.checkIfOutOfBound()
    this.checkIfCollapsed() 
    this.checkIfEat()

 

  }



  onkeydown = (e) => {
    console.log("hell", e)
    e = e || window.event

    // if (e.keyCode === 32){
    //       this.setState({
    //         pause: !this.state.pause
    //       })
    // } 
    
    switch (e.keyCode){
      case 37:
        this.setState({direction: 'LEFT'})
        break
      case 38:
        this.setState({direction: 'UP'})
        break
      case 39:
        this.setState({direction: 'RIGHT'})
        break
      case 40:
        this.setState({direction: 'DOWN'})
        break
      default:
        break  
    }
  }


  movement = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]
    switch (this.state.direction){
      case 'RIGHT':
        head = [head[0]+2, head[1]]
        break
      case 'LEFT':
        head = [head[0]-2, head[1]]
        break
      case 'UP':
        head = [head[0], head[1]-2]
        break
      case 'DOWN':
        head = [head[0], head[1]+2]
        break
      default:
        break
    }

    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }


  checkIfOutOfBound = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length -1]
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ){
      this.onGameOver()
    }
  }

  checkIfCollapsed(){
    let snake = [...this.state.snakeDots]
    let head = snake.pop()
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver()
      }
    })
  }

  checkIfEat(){
    let head = this.state.snakeDots[this.state.snakeDots.length -1]
    let food = this.state.foodDot
    if(head[0] === food[0] && head[1] === food[1]){
      this.setState({
        foodDot: getRandomCoordinates()
      })
      this.enlargeSnake()
    }
  }

  enlargeSnake(){
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({snakeDots: newSnake})
  }



  onGameOver(){
    alert(`Game is over. Scored ${this.state.snakeDots.length-2}`)
    this.setState({
      ...initalState,
      foodDot: getRandomCoordinates()
    })
  }


  render(){
    console.log("hi", this.state.pause)
    return (
      <div className="game-area">
       <Snake snakeDots={this.state.snakeDots}></Snake>
       <Food foodDot={this.state.foodDot} />
    
  
      </div>
    );
  }
}

export default App;
