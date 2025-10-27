import {
  act,
  configure,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Countdown from "./Countdown";
import ShowCountdown from "./ShowCountdown";

configure({ testIdAttribute: "id" });

const handleStop = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
});

afterEach(() => {
//   jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe.skip("Countdown Main App Test", () => {
  it("renders Countdown component", () => {
    render(<Countdown />);
    const header = screen.getByText("Countdown Timer");
    expect(header).toBeInTheDocument();
  });

  it("renders Countdown component", () => {});
});

describe("Show Countdown Test", () => {
  it.skip("renders ShowCountdown component", () => {
    const time = 3600;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const countdown = screen.getByTestId("countdown-display");
    expect(countdown).toBeInTheDocument();
  });
  it.skip("Test countdown display block", async () => {
    const time = 3600;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const countsEle = await screen.findAllByTestId(/count-/);
    countsEle.forEach((count) => {
      expect(count).toBeInTheDocument();
    });
  });
  it.skip("Test countdown display value", () => {
    const time = 2600;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const daysEle = screen.getByTestId("count-days");
    const hoursEle = screen.getByTestId("count-hours");
    expect(daysEle).toHaveTextContent("00d");
    expect(hoursEle).toHaveTextContent(/00h/);
  });
  it.skip("Test countdown display value", () => {
    const time = 2600;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const daysEle = screen.getByTestId("count-days");
    const hoursEle = screen.getByTestId("count-hours");
    expect(daysEle).toHaveTextContent("00d");
    expect(hoursEle).toHaveTextContent(/00h/);
  });
  it.skip("Test days value", () => {
    const time = 90200;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const daysEle = screen.getByTestId("count-days");
    expect(daysEle).toHaveTextContent("01d");
  });
  it.skip("Test hours value", () => {
    const time = 3600;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const hoursEle = screen.getByTestId("count-hours");
    expect(hoursEle).toHaveTextContent(/01h/);
  });
  it.skip("Test minutes value", () => {
    const time = 240;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const minutesEle = screen.getByTestId("count-minutes");
    expect(minutesEle).toHaveTextContent("04m");
  });
  it.skip("Test seconds value", () => {
    const time = 1;
    render(<ShowCountdown time={time} handleStop={handleStop} />);
    const secondsEle = screen.getByTestId("count-seconds");
    expect(secondsEle).toHaveTextContent("01s");
  });
  it("Test play pause and stop button", () => {
    render(<ShowCountdown time={240} handleStop={handleStop} />);

    const stopBtn = screen.getByTestId("stop-btn");
    const doneBtn = screen.queryByRole("button", { name: /done/i });
    const playPauseBtn = screen.getByTestId("play-pause-btn");

    expect(stopBtn).toBeInTheDocument();
    expect(playPauseBtn).toBeInTheDocument();
    expect(doneBtn).not.toBeInTheDocument();
  });

  it("Test play pause button click", async () => {
    render(<ShowCountdown time={240} handleStop={handleStop} />);
    const uvent = userEvent.setup();
    const playPauseBtn = screen.getByTestId("play-pause-btn");
    jest.useRealTimers();
    await act(async () => {
      await uvent.click(playPauseBtn);
    //   jest.advanceTimersByTime(100);
    });
    expect(playPauseBtn).toHaveAttribute("title", "Resume timer");

    await act(async () => {
      await uvent.click(playPauseBtn);
    //   jest.advanceTimersByTime(100);
    });
    expect(playPauseBtn).toHaveAttribute("title", "Pause timer");

    const stopBtn = screen.getByTestId("stop-btn");
    await act(async ()=>{
        await uvent.click(stopBtn);
    })
    expect(handleStop).toHaveBeenCalled();
  });

  it("Test timer and done btn", async () => {
    const uvent = userEvent.setup();
    render(<ShowCountdown time={10} handleStop={handleStop} />);
    const secondsEle = await screen.queryByTestId("count-seconds");
    act(() => jest.advanceTimersByTime(5000));
    expect(secondsEle).toHaveTextContent("05s");
    act(() => jest.advanceTimersByTime(5000));
    expect(secondsEle).toHaveTextContent("00s");
  });
});

describe.skip("Test create a new countdown", () => {
  it("tests submit button if disabled", () => {
    render(<Countdown />);
    const submitBtn = screen.getByRole("button", { name: /start/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
  it("should have submit button enabled", async () => {
    const uEvent = userEvent.setup();
    render(<Countdown />);

    const secondsInput = screen.getByTestId("seconds");
    await uEvent.clear(secondsInput);
    await uEvent.type(secondsInput, "10");
    expect(secondsInput).toHaveValue(10);

    const submitBtn = screen.getByText(/start/i);
    expect(submitBtn).toBeEnabled();
  });
});
