import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash, faBackspace, faEquals, faDivide, faTimes, faMinus, faPlus, faPercentage,
} from "@fortawesome/free-solid-svg-icons";

function Calculator() {
  const [expression, setExpression] = useState("0");

  const handleClick = (value) => {
    // Function to check if a character is an operator
    const isOperator = (char) => {
      return ["+", "-", "*", "/", "%", "="].includes(char);
    };

    if (expression === "0" && (value === "Backspace" || value === "Reset")) {
      // Do nothing if expression is already "0" and the button clicked is "Backspace" or "Reset"
      return;
    }

    if (expression === "0") {
      if (value === "Backspace") {
        // Do nothing if expression is already "0"
        return;
      } else {
        setExpression(value);
      }
    } else {
      if (value === "=") {
        try {
          let result;
          if (expression.includes("%")) {
            const parts = expression.split("%");
            const number = parseFloat(parts[0]);
            const percentage = parseFloat(parts[1]);
            result = (number * percentage) / 100;
          } else {
            result = eval(expression);
          }
          setExpression(result.toString());
        } catch (error) {
          setExpression("Error");
        }
      } else if (value === "Reset") {
        setExpression("0");
      } else if (value === "Backspace") {
        setExpression((prevExpression) =>
          prevExpression.length > 1 ? prevExpression.slice(0, -1) : "0"
        );
      } else if (
        isOperator(value) &&
        isOperator(expression[expression.length - 1])
      ) {
        // Do nothing if the last character in the expression is an operator and the current value is an operator
        return;
      } else {
        setExpression((prevExpression) => prevExpression + value);
      }
    }
  };

  const buttons = [
    { value: "Reset", icon: faTrash, className: "operator" },
    { value: "%", icon: faPercentage, className: "operator" },
    { value: "Backspace", icon: faBackspace, className: "operator" },
    { value: "/", icon: faDivide, className: "operator" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "*", icon: faTimes, className: "operator" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "-", icon: faMinus, className: "operator" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "+", icon: faPlus, className: "operator" },
    { value: "00" },
    { value: "0" },
    { value: "." },
    { value: "=", icon: faEquals, className: "operator" },
  ];

  return (
    <div id="calculator">
      <div id="display">{expression}</div>
      <div id="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={button.className || ""}
            onClick={() => handleClick(button.value)}
          >
            {button.icon ? (
              <FontAwesomeIcon icon={button.icon} />
            ) : (
              button.value
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
