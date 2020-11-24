import React,{Component} from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      count:59,
      countDownHours:0,
      countDownMinutes:0,
      countDownSeconds:0,
      inputHours:0,
      inputMinutes:0,
      start:false,
      pause:false
    }
  }
  
  
  render(){
    const {
      countDownHours, 
      countDownMinutes, 
      countDownSeconds, 
      inputHours,
      inputMinutes,
      start, 
      pause
    } = this.state
    
    const startCounter =()=>{
      if(this.state.inputMinutes!==0 || this.state.inputHours !== 0){
        this.setState(()=>({
          countDownHours:inputHours,
          countDownMinutes:inputMinutes,
          start:true
        }))
      }
      this.Interval=setInterval(()=>{
        if(this.state.countDownMinutes ===0 && this.state.countDownHours!==0){
          this.setState((prevState)=>({
            countDownHours:prevState.countDownHours-1,
            countDownMinutes:59,
            countDownSeconds:59
          }))
        }else if(this.state.countDownSeconds ===0 && this.state.countDownMinutes!==0){
          this.setState((prevState)=>({
            countDownMinutes:prevState.countDownMinutes-1,
            countDownSeconds:59
          }))
        }else if(this.state.countDownSeconds===0 && this.state.countDownMinutes===0){
          stopCounter()
        }else{
        this.setState(prevState =>({
          countDownSeconds:prevState.countDownSeconds -1
        }))}
      },1000)
    }

    const stopCounter = ()=>{
      clearInterval(this.Interval)
      this.setState(()=>({
        countDownHours:0,
        countDownMinutes:0,
        countDownSeconds:0,
        inputHours:0,
        inputMinutes:0,
        start:false
      }))
    }

    const pauseCounter = () =>{
      clearInterval(this.Interval)
      this.setState(()=>({
        countDownHours:countDownHours,
        countDownMinutes:countDownMinutes,
        countDownSeconds:countDownSeconds,
        pause:true
      }))
    }
    
    const continueCounter = ()=>{
      this.setState(()=>({
        pause:false
      }))
      this.Interval=setInterval(()=>{
        if(this.state.countDownMinutes ===0 && this.state.countDownHours!==0){
          this.setState((prevState)=>({
            countDownHours:prevState.countDownHours-1,
            countDownMinutes:59,
            countDownSeconds:59
          }))
        }else if(this.state.countDownSeconds ===0 && this.state.countDownMinutes!==0){
          this.setState((prevState)=>({
            countDownMinutes:prevState.countDownMinutes-1,
            countDownSeconds:59
          }))
        }else if(this.state.countDownSeconds===0 && this.state.countDownMinutes===0){
          stopCounter()
        }else{
        this.setState(prevState =>({
          countDownSeconds:prevState.countDownSeconds -1
        }))}
      },1000)
    }
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-Counter">{`${countDownHours<10?`0${countDownHours}`:countDownHours}:${countDownMinutes<10?`0${countDownMinutes}`:countDownMinutes}:${countDownSeconds<10?`0${countDownSeconds}`:countDownSeconds}`}</div>
          <button className="Counter-button" onClick={()=>stopCounter()}> Reset</button>
          <div>
            <input type="text" className="time-input" placeholder={"00"} onChange={(e)=>this.setState(()=>({inputHours:e.target.value}))}/>
            hours
            <input type="text" className="time-input" placeholder={"00"} onChange={(e)=>this.setState(()=>({inputMinutes:e.target.value}))}/>
            Minutes
          </div>
          <div>
          {
            start?(
             pause ?(
               <button className="App-button pause-button continue-button" onClick={()=>continueCounter()} > Continue</button>
             ):(
             <button className="App-button pause-button" onClick={()=>pauseCounter()}> Pause</button>
             )
            ):(
             <button className="App-button start-button" onClick={()=>startCounter()}> start</button>
            )
          }
          <button className="App-button stop-button" onClick={()=>stopCounter()}> stop</button>
          </div>
        </header>
      </div>
    )
  }
}

export default App
