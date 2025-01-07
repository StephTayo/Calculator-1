import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op) => {
    const value = parseFloat(display);
    
    if (currentValue === null) {
      setCurrentValue(value);
    } else if (operator) {
      const result = calculate(currentValue, value, operator);
      setCurrentValue(result);
      setDisplay(String(result));
    }
    
    setWaitingForOperand(true);
    setOperator(op);
  };

  const handleEqual = () => {
    if (currentValue !== null && operator) {
      const value = parseFloat(display);
      const result = calculate(currentValue, value, operator);
      setDisplay(String(result));
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="w-64 bg-gray-100 rounded-lg p-4 shadow-lg">
      <div className="bg-white rounded mb-4 p-2 text-right text-2xl h-12 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷',
          '4', '5', '6', '×',
          '1', '2', '3', '-',
          '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': handleEqual(); break;
                case '+':
                case '-':
                case '×':
                case '÷': handleOperator(btn); break;
                default: handleNumber(btn);
              }
            }}
            className={`p-2 text-lg rounded ${
              ['+', '-', '×', '÷'].includes(btn)
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : btn === '='
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white hover:bg-gray-200'
            }`}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="col-span-4 mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;