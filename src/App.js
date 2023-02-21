import React,{useState,useEffect} from 'react';
import Header from './components/Header/Header';
import Keypad from './components/Keypad/Keypad';
import Footer from './components/Footer/Footer';
import './App.css';
import moon from './assets/moon.png'
import sun from './assets/sun.png'

const App = () => {
const usedKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
  ];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

const [darkmode,setDarkmode]=useState(false);
// const [darkmode,setDarkmode]=useState(
//   JSON.parse(localStorage.getItem("calculator-app-mode")) || false
// );
const [expression,setExpression]=useState("");
const [result,setResult]=useState("")
const [history, setHistory] = useState(
  JSON.parse(localStorage.getItem("calculator-app-history")) || []
);

const handlekeypress=(keyCode,key)=>{
  if(!keyCode)return;
  // keyCode=keycode+' '
  if(!usedKeyCodes.includes(keyCode))return; 
  if(numbers.includes(key)){
    if(key==='0'){
      if(expression.length===0)return
    }
    calculateResult(expression+key)
    setExpression(expression+key)
  }
  // else if(operators.includes(key)){
  //   // console.log('operator')
  //   if(key==='0'){
  //     if(expression.length===0)return
  //   }
  //   setExpresson(expression+key)
  // }
  else if(operators.includes(key)){
    if(!expression) return

    const lastchar=expression.slice(-1)
    if(operators.includes(lastchar))return
    if(lastchar==='.')return;
    setExpression(expression+key)
  }
  else if(key==='.'){
    if(!expression)return
    const lastchar=expression.slice(-1);
    if(!numbers.includes(lastchar))return;
    setExpression(expression+key);
  }
  else if(keyCode===8){
    if(!expression)return
    calculateResult(expression.slice(0,-1))
    setExpression(expression.slice(0,-1))
  }
  else if(keyCode===13){
    if(!expression)return;
    calculateResult(expression);
    let tempHistory = [...history];
    if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
    tempHistory.push(expression);
    setHistory(tempHistory);
  }
};
const calculateResult=(exp)=>{
  if (!exp) {
    setResult("");
    return;
  }
const lastchar=exp.slice(-1);
if(!numbers.includes(lastchar))exp=exp.slice(0,-1)
const answer=eval(exp).toFixed(2)+'';
setResult(answer)
}
useEffect(() => {
  localStorage.setItem("calculator-app-mode", JSON.stringify(darkmode));
}, [darkmode]);

useEffect(() => {
  localStorage.setItem("calculator-app-history", JSON.stringify(history));
}, [history]);
  return (
    <div 
    className='app'
     tabIndex='0' 
     onKeyDown={(event)=>handlekeypress(event.keyCode,event.key)}
     data-theme={darkmode ? 'dark':''}
     >
    <div className='app_claculator '>
      <div className='app_calculator_navbar'>
      <div 
        className='app_calculator_navbar_toggle'
        onClick={()=>setDarkmode(!darkmode)}
      >
      <div 
        className={`app_calculator_navbar_toggle_circle ${
          darkmode ?
           "app_calculator_navbar_toggle_circle_active":""
           }`}
        />
      </div>
          <img src={darkmode ? moon:sun} alt='mode' />
      </div>           
      <Header expression={expression} result={result} history={history}/>
      <Keypad handlekeypress={handlekeypress}/>
    </div>
    <Footer />
    </div>
  )
}

export default App
