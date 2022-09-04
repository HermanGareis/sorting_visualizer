import React from 'react';

import bubbleSort from './algorithms/bubbleSort';
import {getMergeSortAnimations} from './algorithms/mergeSort';


import 'bootstrap/dist/css/bootstrap.min.css';

//CSS IMPORTS
import './App.css';

const PRIMARY_COLOR = 'cyan';
const SECONDARY_COLOR = 'red';
const SORTED_COLOR = 'rgb(74,245,72)';

class App extends React.Component {
  constructor(props) {
    super(props);
  
  this.state = {
    array: [],
    count: 200, //number of array bars
    delay: 10, //animation
  }}

  componentDidMount(){
    this.generateRandomArray();
    document.title = "Sorting Visualizer"
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random()*(max-min)+min);
  }

  generateRandomArray = () => {
    const count = this.state.count;
    const temp = [];

    this.changeBarsColor(PRIMARY_COLOR);

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(5,700));
    }
    this.setState({
      array: temp,

    });
  }

   rangeValue() {
    var input = document.getElementById("customRange").value;
    return input
}

  disableButtons(){
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = true;
    document.getElementById("customRange").disabled = true;

  }
  
  enableButtons(){
    document.getElementById("button1").disabled = false;
    document.getElementById("button2").disabled = false;
    document.getElementById("button3").disabled = false;
    document.getElementById("customRange").disabled = false;
  }

  changeBarsColor = (color) =>{
    console.log(2);
    var arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      const barStyle = arrayBars[i].style;
      setTimeout(() => {
        barStyle.backgroundColor = color;
      }, i * 2);
      
    }

  }

  bubbleSort() {
    this.state.delay=0.5;
    var animationSpeed = this.rangeValue();
    
    this.disableButtons();
    const animations = bubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (i === animations.length - 20) {
            this.enableButtons();
            this.changeBarsColor(SORTED_COLOR);
          }
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;  
        }, i * this.state.delay/animationSpeed);
      }
      else{
        if (animations[i][5] === true) {
          setTimeout(() => {
            //get the idx of the values we need to swap
            const [barOneIdx, barTwoIdx] = animations[i];
            
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            //get the values
            const barOneNewHeight = animations[i][2];
            const barTwoNeWHeight = animations[i][3];
            //swap the values
            barOneStyle.height = `${barTwoNeWHeight}px`;
            barTwoStyle.height = `${barOneNewHeight}px`;

            const j = animations[i][4] //sorted bars
            if (j>0) {
              const sortedBar = arrayBars[arrayBars.length - j  ].style;
              sortedBar.backgroundColor = SORTED_COLOR; 
            }

          }, i * this.state.delay/animationSpeed);
        }
      }
  } 
  
}

  mergeSort(){
    this.state.delay=2;
    this.disableButtons();
    var animationSpeed = this.rangeValue();

    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      var arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.delay/animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (i=== animations.length-4) {
            this.enableButtons();
            this.changeBarsColor(SORTED_COLOR);           
          }
        }, i * this.state.delay/animationSpeed);        
      }              
    }
  }
  


  render() {

    const {array} = this.state;
    return (
      
    <> 
      <nav id="header" class="navbar navbar-expand-lg navbar-dark  bg-dark bg-company-red fixed-top"  >
        <div class='container'>
          <a class="navbar-brand" ><p>Sorting Visualizer  |</p></a>
          <p1>Animation Speed</p1>
          <div className="range-slider">
            <input type="range" class="form-range" min="0.5" max="2" step="0.01" defaultValue="1" id="customRange"/>       
          </div>
          <div className="new-array">
              <button type="button" id='button1' class="btn btn-outline-primary navbar-btn"  onClick={() => this.generateRandomArray()}> 
              Generate New Array
              </button>
          </div>
          <div className="bubble-sort">
              <button type="button" id='button2' class="btn btn-outline-primary navbar-btn"  onClick={() => this.bubbleSort()}> 
              Bubble Sort
              </button>
          </div>
          <div className="merge-sort">
              <button type="button" id='button3' class="btn btn-outline-primary navbar-btn"  onClick={() => this.mergeSort()}> 
              Merge Sort
              </button>
          </div>    
        </div>
     </nav>


      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        </div>
      </> 
    );
  }
}
 
export default App;

