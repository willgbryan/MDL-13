import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DataPoint {
  x: number;
  Ensemble: number;
}

const generateROCCurve = (auc: number): DataPoint[] => {
  const k = (1 / auc) - 1;
  const points: DataPoint[] = [];
  for (let x = 0; x <= 1; x += 0.01) {
    const y = x === 0 ? 0 : x === 1 ? 1 : Math.pow(x, k);
    points.push({
      x,
      Ensemble: y,
    });
  }
  return points;
};

const chartData: DataPoint[] = generateROCCurve(0.7108);

export const AUCROCChart: React.FC = () => {
  return (
    <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>ROC Curve</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          0.71
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            AUC
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            Ensemble: {
              label: "Ensemble",
              color: "#4BFFBA",
            },
          }}
        >
          <AreaChart
            data={chartData}
            margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: -30,
            }}
            >
            <defs>
                <linearGradient id="fillEnsemble" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4BFFBA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4BFFBA" stopOpacity={0.1} />
                </linearGradient>
            </defs>
            <XAxis dataKey="x" type="number" domain={[0, 1]} hide />
            <YAxis domain={[0, 1]} hide />
            <Area
                dataKey="Ensemble"
                type="monotone"
                fill="url(#fillEnsemble)"
                fillOpacity={0.4}
                stroke="#4BFFBA"
                strokeWidth={2}
            />
            <ChartTooltip
                cursor={false}
                content={
                <ChartTooltipContent
                    hideLabel
                    className="bg-stone-900 border-[#4BFFBA] text-white"
                />
                }
                formatter={(value) => (
                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    TPR: {value}
                    </div>
                </div>
                )}
            />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
