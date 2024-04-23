"use client";

import { linechartData } from "@/data/fakeData";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ResumePostGraph = () => {
  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function (tooltipItem) {
            return tooltipItem.formattedValue;
          },
        },
        displayColors: false,
        usePointStyle: true,
      },
    },
  };
  return (
    <div className="flex flex-row  items-start justify-start ">
      <Bar options={options} data={linechartData} />
    </div>
  );
};
