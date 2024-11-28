"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { AUCROCChart } from "./auc-chart";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-fit mx-auto p-4 flex items-center justify-center">
      <motion.div
        initial={{
          width: 0,
          height: 0,
          borderRadius: 0,
        }}
        whileInView={{
          width: "100%",
          height: "100%",
        }}
        style={{
          transformOrigin: "top-left",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="absolute inset-0 h-full border border-neutral-200 dark:border-neutral-800 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -top-1 -left-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -top-1 -right-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -bottom-1 -left-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -bottom-1 -right-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
      </motion.div>
      {children}
    </div>
  );
};

export default function Analytics() {
return (
    <div className="w-full h-full py-20 bg-gray-50 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
        <Header>
        <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            Model Performance
        </h2>
        </Header>
        <div className="chart-wrapper mx-auto max-w-7xl p-6 sm:p-8">
        <div className="w-full gap-6 columns-1 sm:columns-2 lg:columns-3">
        <Card className="flex flex-col lg:max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader className="space-y-0 pb-2">
                <CardDescription>Average Historical Test Accuracy</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                65.17{" "}
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    %
                </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={{
                    xgboost: {
                    label: "XGBoost",
                    color: "hsl(var(--chart-1))",
                    },
                    catboost: {
                    label: "CatBoost",
                    color: "hsl(var(--chart-2))",
                    },
                    lightgbm: {
                    label: "LightGBM",
                    color: "hsl(var(--chart-3))",
                    },
                    
                }}
                >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: -4,
                  }}
                  barGap={0}
                  barCategoryGap={0}
                  data={[
                    {
                      date: "Week 4",
                      xgboost: 63,
                      catboost: 68,
                      lightgbm: 64,
                    },
                    {
                      date: "Week 5",
                      xgboost: 66,
                      catboost: 69,
                      lightgbm: 64,
                    },
                    {
                      date: "Week 6",
                      xgboost: 62,
                      catboost: 66,
                      lightgbm: 64,
                    },
                    {
                      date: "Week 7",
                      xgboost: 63,
                      catboost: 68,
                      lightgbm: 65,
                    },
                    {
                      date: "Week 8",
                      xgboost: 64,
                      catboost: 66,
                      lightgbm: 66,
                    },
                     {
                      date: "Week 9",
                      xgboost: 62,
                      catboost: 65,
                      lightgbm: 63,
                    },
                    {
                      date: "Week 10",
                      xgboost: 63,
                      catboost: 65,
                      lightgbm: 64,
                    },
                    {
                      date: "Week 11",
                      xgboost: 68,
                      catboost: 67,
                      lightgbm: 68,
                    },
                    {
                      date: "Week 12",
                      xgboost: 62,
                      catboost: 65,
                      lightgbm: 63,
                    },
                  ]}
                >
                  <Bar
                    dataKey="xgboost"
                    fill="var(--color-xgboost)"
                    radius={[5, 5, 0, 0]}
                    fillOpacity={0.8}
                    activeBar={<Rectangle fillOpacity={1} />}
                  />
                  <Bar
                    dataKey="catboost"
                    fill="var(--color-catboost)"
                    radius={[5, 5, 0, 0]}
                    fillOpacity={0.8}
                    activeBar={<Rectangle fillOpacity={1} />}
                  />
                  <Bar
                    dataKey="lightgbm"
                    fill="var(--color-lightgbm)"
                    radius={[5, 5, 0, 0]}
                    fillOpacity={0.8}
                    activeBar={<Rectangle fillOpacity={1} />}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                  />
                  <ChartTooltip
                    defaultIndex={2}
                    content={
                      <ChartTooltipContent
                        className="bg-stone-900 border-[#4BFFBA] text-white"
                        // hideIndicator
                      />
                    }
                    cursor={false}
                  />
                  <ReferenceLine
                    y={50}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  >
                    <Label
                      position="insideBottomLeft"
                      value="Baseline Accuracy"
                      offset={10}
                      fill="hsl(var(--foreground))"
                    />
                    <Label
                      position="insideTopLeft"
                      value="60%"
                      className="text-lg"
                      fill="hsl(var(--foreground))"
                      offset={10}
                      startOffset={100}
                    />
                  </ReferenceLine>
                </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                MDL-13 evaluates{" "}
                <span className="font-medium text-foreground">397,122</span> data points and counting.
                </CardDescription>
                <CardDescription>
                This dataset is <span className="font-medium text-foreground">small</span>{" "}
                and only covers a fraction of what we intend to model in the future.
                </CardDescription>
            </CardFooter>
            </Card>
            <AUCROCChart />
          {/* Second Chart Card */}
          <Card className="flex flex-col lg:max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
              <div>
                <CardDescription>Moneyline Accuracy</CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                  73.78%
                  <span className="text-sm font-normal tracking-normal text-muted-foreground">
                    %
                  </span>
                </CardTitle>
              </div>
              <div>
                <CardDescription>O/U Accuracy</CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                  59.89%
                  <span className="text-sm font-normal tracking-normal text-muted-foreground">
                    %
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 items-center">
              <ChartContainer
                config={{
                  Moneyline: {
                    label: "Moneyline",
                    color: "hsl(var(--chart-3))",
                  },
                  OU: {
                    label: "OU",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="w-full"
              >
                <LineChart
                  accessibilityLayer
                  margin={{
                    left: 14,
                    right: 14,
                    top: 10,
                  }}
                  data={[
                    {
                      date: "Week 4",
                      Moneyline: 65,
                      OU: 62,
                    },
                    {
                      date: "Week 5",
                      Moneyline: 75,
                      OU: 70,
                    },
                    {
                      date: "Week 6",
                      Moneyline: 92,
                      OU: 77,
                    },
                    {
                      date: "Week 7",
                      Moneyline: 67,
                      OU: 73,
                    },
                    {
                      date: "Week 8",
                      Moneyline: 60,
                      OU: 53,
                    },
                    {
                      date: "Week 9",
                      Moneyline: 80,
                      OU: 47,
                    },
                    {
                      date: "Week 10",
                      Moneyline: 69,
                      OU: 46,
                    },
                    {
                      date: "Week 11",
                      Moneyline: 79,
                      OU: 57,
                    },
                    {
                      date: "Week 12",
                      Moneyline: 77,
                      OU: 54,
                    },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.5}
                  />
                  <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <Line
                    dataKey="Moneyline"
                    type="natural"
                    fill="var(--color-Moneyline)"
                    stroke="var(--color-Moneyline)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      fill: "var(--color-Moneyline)",
                      stroke: "var(--color-Moneyline)",
                      r: 4,
                    }}
                  />
                  <Line
                    dataKey="OU"
                    type="natural"
                    fill="var(--color-OU)"
                    stroke="var(--color-OU)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      fill: "var(--color-OU)",
                      stroke: "var(--color-OU)",
                      r: 4,
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="bg-stone-900 border-[#4BFFBA] text-white"
                        indicator="line"

                      />
                    }
                    cursor={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

        <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
                <CardTitle>Moneyline Importance</CardTitle>
                <CardDescription>
                    Highest impact model features for winners.
                </CardDescription>
                </CardHeader>
            <CardContent className="flex pl-4 pb-2">
              <ChartContainer
                config={{
                  feature_1: {
                    label: "feature_1",
                    color: "hsl(var(--chart-3))",
                  },
                  feature_2: {
                    label: "feature_2",
                    color: "hsl(var(--chart-2))",
                  },
                  feature_3: {
                    label: "feature_3",
                    color: "hsl(var(--chart-1))",
                  },
                  feature_4: {
                    label: "feature_4",
                    color: "hsl(var(--chart-2))",
                  },
                  feature_5: {
                    label: "feature_5",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[140px] w-full"
              >
                <BarChart
                  margin={{
                    left: 10,
                    right: 0,
                    top: 0,
                    bottom: 10,
                  }}
                  data={[
                    {
                      activity: "Adjusted spread",
                      value: 80.0,
                      label: "80.0",
                      fill: "var(--color-feature_1)",
                    },
                    {
                      activity: "Expected margin",
                      value: 43.3,
                      label: "43.3",
                      fill: "var(--color-feature_2)",
                    },
                    {
                      activity: "Spread line",
                      value: 25.0,
                      label: "25.0",
                      fill: "var(--color-feature_3)",
                    },
                    {
                        activity: "Away coach",
                        value: 23.9,
                        label: "23.9",
                        fill: "var(--color-feature_4)",
                      },
                      {
                        activity: "Away QB",
                        value: 21.0,
                        label: "21.0",
                        fill: "var(--color-feature_5)",
                      },
                  ]}
                  layout="vertical"
                  barSize={32}
                  barGap={2}
                >
                  <XAxis type="number" dataKey="value" hide />
                  <YAxis
                    dataKey="activity"
                    type="category"
                    tickLine={false}
                    tickMargin={4}
                    axisLine={false}
                    className="capitalize"
                  />
                  <Bar dataKey="value" radius={5}>
                    <LabelList
                      position="insideLeft"
                      dataKey="label"
                      fill="white"
                      offset={8}
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row border-t p-4">
              <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Train Time</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    61
                    <span className="text-sm font-normal text-muted-foreground">
                      min
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Test Accuracy</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    68.09
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                {/* <Separator orientation="vertical" className="mx-2 h-10 w-px" /> */}
                {/* <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">ROC AUC</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    0.7331
                    <span className="text-sm font-normal text-muted-foreground">
                    </span>
                  </div>
                </div> */}
              </div>
            </CardFooter>
          </Card>

          <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
                <CardTitle>Scoring Importance</CardTitle>
                <CardDescription>
                    Highest impact model features for scoring.
                </CardDescription>
                </CardHeader>
            <CardContent className="flex pl-4 pb-2">
              <ChartContainer
                config={{
                  feature_1: {
                    label: "feature_1",
                    color: "hsl(var(--chart-1))",
                  },
                  feature_2: {
                    label: "feature_2",
                    color: "hsl(var(--chart-2))",
                  },
                  feature_3: {
                    label: "feature_3",
                    color: "hsl(var(--chart-3))",
                  },
                  feature_4: {
                    label: "feature_4",
                    color: "hsl(var(--chart-1))",
                  },
                  feature_5: {
                    label: "feature_5",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[140px] w-full"
              >
                <BarChart
                  margin={{
                    left: 10,
                    right: 0,
                    top: 0,
                    bottom: 10,
                  }}
                  data={[
                    {
                      activity: "Total Line",
                      value: 55.0,
                      label: "55.0",
                      fill: "var(--color-feature_3)",
                    },
                    {
                      activity: "Away QB",
                      value: 46.4,
                      label: "46.4",
                      fill: "var(--color-feature_2)",
                    },
                    {
                      activity: "Away Moneyline",
                      value: 29.0,
                      label: "29.0",
                      fill: "var(--color-feature_1)",
                    },
                    {
                        activity: "Home Moneyline",
                        value: 28.5,
                        label: "28.5",
                        fill: "var(--color-feature_2)",
                      },
                      {
                        activity: "Spread Line",
                        value: 25.0,
                        label: "25.0",
                        fill: "var(--color-feature_1)",
                      },
                  ]}
                  layout="vertical"
                  barSize={32}
                  barGap={2}
                >
                  <XAxis type="number" dataKey="value" hide />
                  <YAxis
                    dataKey="activity"
                    type="category"
                    tickLine={false}
                    tickMargin={4}
                    axisLine={false}
                    className="capitalize"
                  />
                  <Bar dataKey="value" radius={5}>
                    <LabelList
                      position="insideLeft"
                      dataKey="label"
                      fill="white"
                      offset={8}
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row border-t p-4">
              <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Train Time</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    46
                    <span className="text-sm font-normal text-muted-foreground">
                      min
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Point Accuracy Margin</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    8.10
                    <span className="text-sm font-normal text-muted-foreground">
                      +/-
                    </span>
                  </div>
                </div>
                {/* <Separator orientation="vertical" className="mx-2 h-10 w-px" /> */}
                {/* <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">ROC AUC</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    0.7331
                    <span className="text-sm font-normal text-muted-foreground">
                    </span>
                  </div>
                </div> */}
              </div>
            </CardFooter>
          </Card>

          {/* Sixth Chart Card */}
          {/* <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardContent className="flex gap-4 p-4">
              <div className="grid items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Move</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    562/600
                    <span className="text-sm font-normal text-muted-foreground">
                      kcal
                    </span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Exercise</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    73/120
                    <span className="text-sm font-normal text-muted-foreground">
                      min
                    </span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Stand</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    8/12
                    <span className="text-sm font-normal text-muted-foreground">
                      hr
                    </span>
                  </div>
                </div>
              </div>
              <ChartContainer
                config={{
                  move: {
                    label: "Move",
                    color: "hsl(var(--chart-1))",
                  },
                  exercise: {
                    label: "Exercise",
                    color: "hsl(var(--chart-2))",
                  },
                  stand: {
                    label: "Stand",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="mx-auto aspect-square w-full max-w-[80%]"
              >
                <RadialBarChart
                  margin={{
                    left: -10,
                    right: -10,
                    top: -10,
                    bottom: -10,
                  }}
                  data={[
                    {
                      activity: "stand",
                      value: (8 / 12) * 100,
                      fill: "var(--color-stand)",
                    },
                    {
                      activity: "exercise",
                      value: (46 / 60) * 100,
                      fill: "var(--color-exercise)",
                    },
                    {
                      activity: "move",
                      value: (245 / 360) * 100,
                      fill: "var(--color-move)",
                    },
                  ]}
                  innerRadius="20%"
                  barSize={24}
                  startAngle={90}
                  endAngle={450}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    dataKey="value"
                    tick={false}
                  />
                  <RadialBar dataKey="value" background cornerRadius={5} />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card> */}

          {/* Seventh Chart Card */}
          {/* <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader className="p-4 pb-0">
              <CardTitle>Active Energy</CardTitle>
              <CardDescription>
                You're burning an average of 754 calories per day. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                1,254
                <span className="text-sm font-normal text-muted-foreground">
                  kcal/day
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2024-01-01",
                      calories: 354,
                    },
                    {
                      date: "2024-01-02",
                      calories: 514,
                    },
                    {
                      date: "2024-01-03",
                      calories: 345,
                    },
                    {
                      date: "2024-01-04",
                      calories: 734,
                    },
                    {
                      date: "2024-01-05",
                      calories: 645,
                    },
                    {
                      date: "2024-01-06",
                      calories: 456,
                    },
                    {
                      date: "2024-01-07",
                      calories: 345,
                    },
                  ]}
                >
                  <Bar
                    dataKey="calories"
                    fill="var(--color-calories)"
                    radius={2}
                    fillOpacity={0.2}
                    activeIndex={6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    hide
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card> */}

          {/* Eighth Chart Card */}
          <Card className="max-w-xl bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader className="space-y-0 pb-0"> 
              <CardDescription>Scoring Residuals Distribution</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                0.03
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  Avg
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: "2024-01-01",
                      time: 0,
                    },
                    {
                      date: "2024-01-02",
                      time: 5,
                    },
                    {
                        date: "2024-01-02",
                        time: 12,
                      },
                    {
                      date: "2024-01-03",
                      time: 18,
                    },
                    {
                      date: "2024-01-04",
                      time: 31,
                    },
                    {
                      date: "2024-01-05",
                      time: 19,
                    },
                    {
                        date: "2024-01-02",
                        time: 11,
                      },
                    {
                      date: "2024-01-06",
                      time: 7,
                    },
                    {
                      date: "2024-01-07",
                      time: 0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: -30,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-time)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-time)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="time"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="var(--color-time)"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel className="bg-stone-900 border-[#4BFFBA] text-white"/>}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        <div className="ml-auto flex items-baseline bg-stone-900gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          Residual Count: {value}
                          <span className="font-normal text-muted-foreground"> 
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
  );
}
