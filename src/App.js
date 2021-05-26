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
    document.onkeydown = this.onkeydown
  }

 

  componentDidUpdate(){
    this.checkIfOutOfBound()
    this.checkIfCollapsed() 
    this.checkIfEat()
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.pause !== nextState.pause
  // }


  onkeydown = (e) => {
    console.log("hell", e)
    e = e || window.event

    switch (e.keyCode){
      case 37:
        if(this.state.direction === "RIGHT") break
        this.setState({direction: 'LEFT'})
        break
        
      case 38:
        if(this.state.direction === "DOWN") break
        this.setState({direction: 'UP'})
        break
        
      case 39:
        if(this.state.direction === "LEFT") break
        this.setState({direction: 'RIGHT'})
        break
        
      case 40:
        if(this.state.direction === "UP") break
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

  checkIfCollapsed=()=>{
    let snake = [...this.state.snakeDots]
    let head = snake.pop()
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver()
      }
    })
  }

  checkIfEat=()=>{
    let head = this.state.snakeDots[this.state.snakeDots.length -1]
    let food = this.state.foodDot
    if(head[0] === food[0] && head[1] === food[1]){
      this.setState({
        foodDot: getRandomCoordinates()
      })
      this.enlargeSnake()
    }
  }


  enlargeSnake=()=>{
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({snakeDots: newSnake})
  }


  onGameOver=()=>{
    alert(`Game is over. Scored ${this.state.snakeDots.length-2}`)
    this.setState({
      ...initalState,
      foodDot: getRandomCoordinates()
    })
  }


  handlePause=(e)=>{
    clearInterval(this.interveal) 
    this.setState(prevState => ({
      pause: !prevState.pause
    }))
  }

  handlePlay=()=>{
    this.interveal = setInterval(this.movement, this.state.speed)
    this.setState(prevState => ({
      pause: !prevState.pause
    }))
  }




  render(){
    console.log("hi", this.state.pause)

    return (
      <div>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}></Snake>
          <Food foodDot={this.state.foodDot} />
        </div>

        <div className="options">
          <button onClick={this.handlePause}>pause</button>
        </div>
        
        <div className="paused-area" style={this.state.pause ? {display:'flex'} : {display:'none'}}>
            <div className="paused">
              <h1>Paused</h1>
              <h2>Scored: {this.state.snakeDots.length-2}</h2>
              <button onClick={this.handlePlay}>Play</button>
            </div>
        </div>
       
      </div>
    );
  }
}

export default App;
