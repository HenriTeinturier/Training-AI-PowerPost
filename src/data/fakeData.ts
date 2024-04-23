import { PostMode } from "@prisma/client";
const postModeKeys = Object.keys(PostMode).filter((key) => isNaN(Number(key)));

export const linechartData = {
  labels: postModeKeys,
  datasets: [
    {
      label: "Powerpost Type",
      data: [0, 5, 2, 4, 3, 8, 1],
      fill: false,
      backgroundColor: ["hsl(186 65% 42%)"],
      // borderColor: "red",
      borderWidth: 0,
    },
  ],
};
