import { configure, fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./Calculator";
import CalculatorDisplay from "./components/CalculatorDisplay";
import CalculatorKeypad from "./components/CalculatorKeypad";

configure({ testIdAttribute: "id" });
describe("Calculator Tests", () => {
  it("should render the calculator", () => {
    render(<Calculator />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
  });
  it("should test Calculator display", () => {
    const _expression = `3*2`;
    const _result = 6;
    render(<CalculatorDisplay expression={_expression} result={_result} />);
    const expression = screen.getByTestId("expression");
    expect(expression).toHaveTextContent(_expression);
    const result = screen.getByTestId("result");
    expect(result).toHaveTextContent(_result.toString());
  });
  it("should test Calculator display with multiple operations", () => {
    const onNumKeyClick = jest.fn();
    const onOperatorKeyClick = jest.fn();

    render(
      <CalculatorKeypad
        onNumKeyClick={onNumKeyClick}
        onOperatorKeyClick={onOperatorKeyClick}
        onContolKeyClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "3" });
    fireEvent.click(button);
    const button2 = screen.getByRole("button", { name: "*" });
    fireEvent.click(button2);
    // const button3 = screen.getByRole("button", { name: "2" });
    // fireEvent.click(button3);
    // const button4 = screen.getByRole("button", { name: "+" });
    // fireEvent.click(button4);
    // const button5 = screen.getByRole("button", { name: "1" });
    // fireEvent.click(button5);
    expect(onNumKeyClick).toHaveBeenCalledWith({
      key: "3",
      keyCode: "3",
      name: "Three",
      type: "number",
      bgColor: "slate-700",
    });
    expect(onOperatorKeyClick).toHaveBeenCalledWith({
      key: "x",
      keyCode: "*",
      name: "Multiply",
      type: "operator",
      bgColor: "orange-400",
    });
    // render(<CalculatorDisplay expression={_expression} result={_result} />);
    // const result = screen.getByTestId("result");
    // expect(result).toHaveTextContent(_result.toString());
  });
  it("should test Calculator display with multiple operations", () => {
    const onNumKeyClick = jest.fn();
    const onOperatorKeyClick = jest.fn();

    render(
      <CalculatorKeypad
        onNumKeyClick={onNumKeyClick}
        onOperatorKeyClick={onOperatorKeyClick}
        onContolKeyClick={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "3" });
    fireEvent.click(button);
    const button2 = screen.getByRole("button", { name: "*" });
    fireEvent.click(button2);
    const button3 = screen.getByRole("button", { name: "2" });
    fireEvent.click(button3);
    const button4 = screen.getByRole("button", { name: "+" });
    fireEvent.click(button4);
    const button5 = screen.getByRole("button", { name: "1" });
    fireEvent.click(button5);
    
    expect(onNumKeyClick).toHaveBeenCalledWith({
      key: "3",
      keyCode: "3",
      name: "Three",
      type: "number",
      bgColor: "slate-700",
    });
    expect(onOperatorKeyClick).toHaveBeenCalledWith({
      key: "x",
      keyCode: "*",
      name: "Multiply",
      type: "operator",
      bgColor: "orange-400",
    });
    // render(<CalculatorDisplay expression={_expression} result={_result} />);
    // const result = screen.getByTestId("result");
    // expect(result).toHaveTextContent(_result.toString());
  });
});
