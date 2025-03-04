import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const exercises = [
  {
    name: "Square Numbers",
    function: "[1, 2, 3, 4, 5].map(num => num * num)",
  },
  {
    name: "Increment Numbers",
    function: "[1, 2, 3, 4, 5].map(num => num + 1)",
  },
  {
    name: "Filter Even Numbers",
    function: "[1, 2, 3, 4, 5].filter(num => num % 2 === 0)",
  },
  {
    name: "Sum of Array",
    function: "[1, 2, 3, 4, 5].reduce((acc, num) => acc + num, 0)",
  },
  {
    name: "Find Max Number",
    function: "Math.max(...[1, 2, 3, 4, 5])",
  },
  {
    name: "Reverse Array",
    function: "[1, 2, 3, 4, 5].reverse()",
  },
  {
    name: "Sort Array",
    function: "[5, 3, 1, 4, 2].sort((a, b) => a - b)",
  },
];

const FunctionExecutor = () => {
  const [inputFunction, setInputFunction] = useState("");
  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeFunction = () => {
    setError(null);
    setResult(null);
    try {
      // Create a new function from the input string
      const func = new Function(`return ${inputFunction}`);
      const output = func();
      if (Array.isArray(output)) {
        setResult(output);
      } else {
        setError("Function must return an array of numbers for visualization.");
      }
    } catch (err) {
      setError("Error executing function: " + (err as Error).message);
    }
  };

  const data = {
    labels: result ? result.map((_, index) => index + 1) : [],
    datasets: [
      {
        label: "Function Output",
        data: result || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="h-full w-full p-4 bg-gray-900">
      <h2 className="text-3xl font-bold mb-4 text-center">Function Executor</h2>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Select an exercise
        </label>
        <select
          className="border p-2 w-full rounded-md"
          onChange={(e) => setInputFunction(e.target.value)}
        >
          <option value="">Select an exercise</option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise.function}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Enter your function
        </label>
        <textarea
          className="border p-2 w-full h-24 rounded-md"
          placeholder="Enter your function here..."
          value={inputFunction}
          onChange={(e) => setInputFunction(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={executeFunction}
      >
        Execute
      </button>
      {result !== null && (
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Result:</h3>
          <div className="overflow-x-auto">
            <Line data={data} />
          </div>
          <div className="mt-2 p-2 bg-gray-900 rounded-md shadow-md">
            <h4 className="font-bold text-md mb-1">Text Result:</h4>
            <p>{JSON.stringify(result)}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <h3 className="font-bold text-lg mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FunctionExecutor;
