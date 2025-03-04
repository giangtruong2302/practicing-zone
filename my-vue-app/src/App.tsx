import "./App.css";
import Exercise from "./components/exercise";
// import FunctionExecutor from "./components/FunctionExecutor";

function App() {
  return (
    <>
      <div className="app-container">
        <h1 className="text-3xl font-bold">Function Executor App</h1>
        <Exercise />
        {/* <FunctionExecutor /> */}
      </div>
    </>
  );
}

export default App;
