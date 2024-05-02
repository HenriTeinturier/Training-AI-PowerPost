"use client";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export const ResumePostGraph = ({
  postModeStats,
}: {
  postModeStats: { name: string; total: number }[];
}) => {
  return (
    <div className="h-full w-full    md:h-[200px]">
      <ResponsiveContainer minHeight={200}>
        <BarChart data={postModeStats}>
          <Bar
            dataKey="total"
            style={
              {
                fill: "hsl(var(--primary))",
                opacity: 0.9,
              } as React.CSSProperties
            }
          />
          <Tooltip />
          <XAxis
            dataKey="name"
            angle={280}
            textAnchor="end"
            height={60}
            style={{
              fontSize: "12px",
              wordWrap: "break-word",
              // height: "5px",
            }}
            interval={0}
            tickFormatter={(value) =>
              `${value.length > 6 ? value.substring(0, 6) : value}`
            } // Tronque les textes longs
            tickLine={false}
            tickMargin={10}
          />
          <Legend
            verticalAlign="top"
            iconSize={0}
            iconType="star"
            formatter={renderLegend}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const renderLegend = () => {
  return (
    <span style={{ color: `hsl(var(--primary-muted))` }}>
      {"Total PowerPost by Type"}
    </span>
  );
};
