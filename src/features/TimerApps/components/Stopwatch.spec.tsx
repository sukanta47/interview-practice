import { render, screen } from "@testing-library/react"
import Stopwatch from "./Stopwatch"
import userEvent from "@testing-library/user-event";

describe("Stopwatch App Test",()=>{
    it("test button renders",()=>{
        render(<Stopwatch/>);
        const playBtn = screen.getByTestId("play-btn");
        const resetBtn = screen.getByTestId("reset-btn");
        const stopBtn = screen.getByTestId("stop-btn");
        expect(playBtn).toBeInTheDocument();
        expect(stopBtn).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
        expect(playBtn).toBeEnabled();
        expect(stopBtn).toBeDisabled();
        expect(resetBtn).toBeDisabled();
    });
    it("test button click",async()=>{
        render(<Stopwatch/>);
        const playBtn = screen.getByTestId("play-btn");
        const resetBtn = screen.getByTestId("reset-btn");
        const stopBtn = screen.getByTestId("stop-btn");
        
        expect(playBtn).toBeInTheDocument();
        expect(stopBtn).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
        expect(playBtn).toBeEnabled();

        const uvent = userEvent.setup();
        await uvent.click(playBtn);
        const pauseBtn = await screen.findByTestId("pause-btn");
        const lapBtn = await screen.findByTestId("lap-btn");

        expect(stopBtn).toBeEnabled();
        expect(resetBtn).toBeEnabled();
        expect(lapBtn).toBeEnabled();

        await uvent.click(pauseBtn);
        expect(lapBtn).toBeDisabled();
        
    })
})