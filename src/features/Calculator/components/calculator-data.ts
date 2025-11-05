export type KeyType = "number" | "operator" | "control" | "modifier";

export type CalculatorKey = {
  key: string;
  keyCode: string;
  name: string;
  bgColor: string;
  type: KeyType;
};

// Top function keys
export const topKeys: CalculatorKey[] = [
  { key: "AC", keyCode: "Escape", name: "Clear", bgColor: "red-400", type: "control" },
  { key: "<-", keyCode: "Backspace", name: "Backspace", bgColor: "blue-400", type: "control" },
  { key: "%", keyCode: "%", name: "Percent", bgColor: "slate-700", type: "modifier" },
];

// Operator keys
export const operatorKeys: CalculatorKey[] = [
  { key: "÷", keyCode: "/", name: "Divide", bgColor: "orange-400", type: "operator" },
  { key: "x", keyCode: "*", name: "Multiply", bgColor: "orange-400", type: "operator" },
  { key: "-", keyCode: "-", name: "Subtract", bgColor: "orange-400", type: "operator" },
  { key: "+", keyCode: "+", name: "Add", bgColor: "orange-400", type: "operator" },
  { key: "=", keyCode: "Enter", name: "Equal", bgColor: "green-400", type: "operator" },
];

// Numeric and modifier keys
export const numericKeys: CalculatorKey[] = [
  { key: "7", keyCode: "7", name: "Seven", bgColor: "slate-700", type: "number" },
  { key: "8", keyCode: "8", name: "Eight", bgColor: "slate-700", type: "number" },
  { key: "9", keyCode: "9", name: "Nine", bgColor: "slate-700", type: "number" },
  { key: "4", keyCode: "4", name: "Four", bgColor: "slate-700", type: "number" },
  { key: "5", keyCode: "5", name: "Five", bgColor: "slate-700", type: "number" },
  { key: "6", keyCode: "6", name: "Six", bgColor: "slate-700", type: "number" },
  { key: "1", keyCode: "1", name: "One", bgColor: "slate-700", type: "number" },
  { key: "2", keyCode: "2", name: "Two", bgColor: "slate-700", type: "number" },
  { key: "3", keyCode: "3", name: "Three", bgColor: "slate-700", type: "number" },
  { key: "+/-", keyCode: "F9", name: "ChangeSign", bgColor: "slate-700", type: "modifier" }, // F9 commonly used for sign change
  { key: "0", keyCode: "0", name: "Zero", bgColor: "slate-700", type: "number" },
  { key: ".", keyCode: ".", name: "Dot", bgColor: "slate-700", type: "modifier" },
];

export const allowedKey = new Set<string>([
    "0","1","2","3","4","5","6","7","8","9",//numbers
    "+","-","*","/","x","÷","=","%",//operators
    ".","Enter","Backspace","Escape",//others
  ]);