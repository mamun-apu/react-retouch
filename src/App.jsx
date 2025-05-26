// import "./App.css";
import Accordian from "./components/accordian";
import ImageSlider from "./components/image-slider";
import TicTacToe from "./components/tic-tact-toe";

function App() {
  return (
    <div className="App">
      {/* Accordian component */}
      <Accordian/>
      <ImageSlider/>
      <TicTacToe />
      
      <h1>hello world</h1>
    </div>
  );
}

export default App;