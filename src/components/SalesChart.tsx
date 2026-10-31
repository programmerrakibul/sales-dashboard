import { useMemo } from "react";
import { Chart } from "react-charts";
import type { fetchMetrics } from "../services/get-metrics";

type Metrics = Awaited<ReturnType<typeof fetchMetrics>>;

const SalesChart = ({ metrics }: { metrics: Metrics }) => {
  const chartData = useMemo(
    () => [
      {
        data: metrics.map((metric) => ({
          primary: metric.name,
          secondary: metric.sum,
        })),
      },
    ],
    [metrics],
  );

  const yMax = useMemo(
    () => Math.max(5000, ...metrics.map((metric) => metric.sum + 2000)),
    [metrics],
  );

  return (
    <Chart
      options={{
        data: chartData,
        primaryAxis: {
          getValue: (datum) => datum.primary,
          scaleType: "band",
          innerBandPadding: 0.2,
          position: "bottom",
        },
        secondaryAxes: [
          {
            getValue: (datum) => datum.secondary,
            scaleType: "linear",
            min: 0,
            max: yMax,
            elementType: "bar",
          },
        ],
        defaultColors: ["#58d675"],
        tooltip: {
          show: false,
        },
      }}
    />
  );
};

export default SalesChart;
