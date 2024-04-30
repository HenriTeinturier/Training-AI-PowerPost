"use client";

// import { Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";
import { PostMode } from "@prisma/client";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const ResumePostGraph = ({
//   totalPowerpostByMode,
// }: {
//   totalPowerpostByMode: Record<PostMode, number>;
// }) => {
//   const options: ChartOptions<"bar"> = {
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           display: false,
//         },
//       },
//     },

//     plugins: {
//       tooltip: {
//         callbacks: {
//           title: function (tooltipItems) {
//             return tooltipItems[0].label;
//           },
//           label: function (tooltipItem) {
//             return tooltipItem.formattedValue;
//           },
//         },
//         displayColors: false,
//         usePointStyle: true,
//       },
//     },
//   };
//   const postModeKeys = Object.keys(PostMode).filter((key) =>
//     isNaN(Number(key))
//   );
//   const linechartData = {
//     labels: postModeKeys,
//     datasets: [
//       {
//         label: "Powerpost Type",
//         data: [
//           totalPowerpostByMode.SHORT,
//           totalPowerpostByMode.TWEET,
//           totalPowerpostByMode.THREAD,
//           totalPowerpostByMode.BULLET_POINT,
//           totalPowerpostByMode.TOP3,
//           totalPowerpostByMode.MAIN_POINTS,
//           totalPowerpostByMode.CODE,
//         ],
//         fill: false,
//         backgroundColor: ["hsl(186 65% 42%)"],
//         // borderColor: "red",
//         borderWidth: 0,
//       },
//     ],
//   };
//   return <Bar options={options} data={linechartData} />;
// };

export const ResumePostGraph = () => {
  return <div>test</div>;
};
