import React, { useState } from "react";

const FunctionExecutor = () => {
  const [functionInput, setFunctionInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeFunction = () => {
    setError(null);
    try {
      // Create a new function from the input string
      const func = new Function(`return (${functionInput})`)();
      const output = func();
      setResult(output);
    } catch (err) {
      if (err instanceof Error) {
        setError("Error executing function: " + err.message);
      } else {
        setError("Error executing function");
      }
      setResult(null);
    }
  };

  return (
    <div className="h-full w-full">
      <h2 className="text-2xl font-bold">Function Executor</h2>
      <textarea
        className="border border-gray-300 p-2 w-full"
        rows={4}
        value={functionInput}
        onChange={(e) => setFunctionInput(e.target.value)}
        placeholder="Enter a function to execute"
      />
      <button
        className="mt-2 bg-blue-500 text-white p-2"
        onClick={executeFunction}
      >
        Execute Function
      </button>
      {result !== null && (
        <div className="mt-4">
          <h3 className="font-bold">Result:</h3>
          <p>{result}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FunctionExecutor;
