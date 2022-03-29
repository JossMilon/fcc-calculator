import './App.scss';
import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState("");
  const [memory, setMemory] = useState("0");
  //We use this state to keep track of a new operation ongoing and requiring to overwrite current display
  const [ResetDisplay, setResetDisplay] = useState(false);
  const handleClear = () => {
    setDisplay("0");
    setMemory("0");
    setOperator("");
  };
  const handleDigit = (digit) => {
    if (display === "0" || ResetDisplay) {
      setDisplay(digit)
      //I set ResetDisplay to false as I'm updating the display and want to keep concatenating
      setResetDisplay(false);
    }
    else {
      setDisplay(display+digit);
    }
  };
  const handleOperator = (operation) => {
    //If operator is empty, I store the displayed value in memory and update the operator
    if (operator === "") {
      setMemory(display);
    }
    //Else I proceed with calculation and store the upcoming operation
    else if (!ResetDisplay) {
      let result = 0;
      if (operator === "+") {
        result = Number(memory)+Number(display);
      }
      else if (operator === "-") {
        result = Number(memory)-Number(display);
      }
      else if (operator === "X") {
        result = Number(memory)*Number(display);
      }
      else {
        result = Number(memory)/Number(display);
      }
      setDisplay(result);
      setMemory(result);
    }  

    //In any case I set ResetDisplay to true as there's an operation ongoing
    setResetDisplay(true);
    setOperator(operation);  
  };
  const handleEqual = () => {
    //If there's a value stored in memory, I proceed with the operation, else I leave it as is
    if (memory !== "0") {
      let result = 0;
      if (operator === "+") {
        result = Number(memory)+Number(display);
      }
      else if (operator === "-") {
        result = Number(memory)-Number(display);
  
      }
      else if (operator === "X") {
        result = Number(memory)*Number(display);
      }
      else {
        result = Number(memory)/Number(display);
      }
      setOperator("");
      setDisplay(result);
      setMemory("0");
      setResetDisplay(true);
    }
  };
  const handleDecimal = () => {
    if (ResetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
    }
    else if (!display.includes(".")) {
      setDisplay(display+".");
    }
  };
  return (
    <div className='container'>
      <div className='display'>{display}</div>
      {/* <div className='display'>{operator}</div>
      <div className='display'>{memory}</div> */}
      <div className='bodyCalc'>
        <div className='leftSide'>
          <div onClick={handleClear} className='pad' id="clear">AC</div>
          <div className='one2nine'>
            <div onClick={() => handleDigit("1")} className='pad' id="one">1</div>
            <div onClick={() => handleDigit("2")} className='pad' id="two">2</div>
            <div onClick={() => handleDigit("3")} className='pad' id="three">3</div>
            <div onClick={() => handleDigit("4")} className='pad' id="four">4</div>
            <div onClick={() => handleDigit("5")} className='pad' id="five">5</div>
            <div onClick={() => handleDigit("6")} className='pad' id="six">6</div>
            <div onClick={() => handleDigit("7")} className='pad' id="seven">7</div>
            <div onClick={() => handleDigit("8")} className='pad' id="eight">8</div>
            <div onClick={() => handleDigit("9")} className='pad' id="nine">9</div>
          </div>
          <div className='zeroAndDecimal'>
            <div onClick={() => handleDigit("0")} className='pad' id="zero">0</div>
            <div onClick={handleDecimal} className='pad' id="decimal">.</div>
          </div>
        </div>
        <div className='operators'>
          <div onClick={() => handleOperator("+")} className='pad' id="add">+</div>
          <div onClick={() => handleOperator("-")} className='pad' id="substract">-</div>
          <div onClick={() => handleOperator("X")} className='pad' id="multiply">X</div>
          <div onClick={() => handleOperator("/")} className='pad' id="divide">/</div>
          <div onClick={handleEqual} className='pad' id="equals">=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
