import React, {Component} from 'react'
import './index.css';
import Snake from './snake'
import Food from './Food'



//get mulitple of 2 from 2 to 98
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
  //   return this.state.speed !== nextState.speed
  // }


  onkeydown = (e) => {
    console.log("hell", e)
    e = e || window.event

    switch (e.keyCode){
      //left key
      case 37: 
        //when going left, cannot go right 
        if(this.state.direction === "RIGHT") break
        if(this.state.direction === "LEFT") {
          this.speedChange()
          break
        }
        this.setState({direction: 'LEFT'})
        break
      
      //up key  
      case 38:
        //when going up, cannot go down 
        if(this.state.direction === "DOWN") break
        if(this.state.direction === "UP") {
          this.speedChange()
          break
        }
        this.setState({direction: 'UP'})
        break
      
      //right key  
      case 39:
        //when going right, cannot go left 
        if(this.state.direction === "LEFT") break
        if(this.state.direction === "RIGHT") {
          this.speedChange()
          break
        }
        this.setState({direction: 'RIGHT'})
        break
       
      //down key  
      case 40:
        //when going down, cannot go up 
        if(this.state.direction === "UP") break
        if(this.state.direction === "DOWN") {
          this.speedChange()
          break
        }
        this.setState({direction: 'DOWN'})
        break
        
      default:
        break  
    }
  }


  movement = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]
    //head[X,Y] position
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
    //add a new head and remove the tail. Give the effect of it is moving.
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }


  //check it the snake is within bound
  checkIfOutOfBound = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length -1]
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ){
      this.onGameOver()
    }
  }

  //check if the snake crashed into itself
  checkIfCollapsed=()=>{
    let snake = [...this.state.snakeDots]
    //pop off the head and compare it to the body. 
    //If you don't remove the head, it will always be true, when comparing head to head + body
    let head = snake.pop()
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver()
      }
    })
  }

  //check if the head meets the food 
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
    //when the snake move it always add a new head position and remove the tail
    //add a empty [] to the tail, then removing a empty gives the effect that its increasing in size.
    newSnake.unshift([])
    this.setState({snakeDots: newSnake})
  }


  speedChange=()=>{
    this.setState({speed: 40}) 
    this.updateGame()

    //when key is release, reset speed back to default 
    document.onkeyup =(e)=> {
      this.setState({speed: 200})
      this.updateGame()
    }
  }


  updateGame=()=>{
    if(!this.state.pause){
      clearInterval(this.interveal) 
      this.interveal = setInterval(this.movement, this.state.speed)
    }
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


  //using setInterval to repeat the function, in MS,
  //need to use pass by reference to clearInterval
  //DO NOT pass by value, clearInterval(setInterval(this.movement, this.state.speed))
  handlePlay=()=>{
    this.interveal = setInterval(this.movement, this.state.speed)
    this.setState(prevState => ({
      pause: !prevState.pause
    }))
  }




  render(){
    console.log("hi", this.state.pause, this.state.speed)

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
