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
            Week 6
        </h2>
        </Header>
        <div className="chart-wrapper mx-auto max-w-7xl p-6 sm:p-8">
        <div className="w-full gap-6 columns-1 sm:columns-2 lg:columns-3">
        <Card className="flex flex-col lg:max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
            <CardHeader className="space-y-0 pb-2">
                <CardDescription>Today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                12,584{" "}
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    steps
                </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={{
                    steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))",
                    },
                }}
                >
                <BarChart
                    accessibilityLayer
                    margin={{
                    left: -4,
                    right: -4,
                    }}
                    data={[
                    {
                        date: "2024-01-01",
                        steps: 2000,
                    },
                    {
                        date: "2024-01-02",
                        steps: 2100,
                    },
                    {
                        date: "2024-01-03",
                        steps: 2200,
                    },
                    {
                        date: "2024-01-04",
                        steps: 1300,
                    },
                    {
                        date: "2024-01-05",
                        steps: 1400,
                    },
                    {
                        date: "2024-01-06",
                        steps: 2500,
                    },
                    {
                        date: "2024-01-07",
                        steps: 1600,
                    },
                    ]}
                >
                    <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={5}
                    fillOpacity={0.6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                        weekday: "short",
                        })
                    }}
                    />
                    <ChartTooltip
                    defaultIndex={2}
                    content={
                        <ChartTooltipContent
                        hideIndicator
                        labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            })
                        }}
                        />
                    }
                    cursor={false}
                    />
                    <ReferenceLine
                    y={1200}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    >
                    <Label
                        position="insideBottomLeft"
                        value="Average Steps"
                        offset={10}
                        fill="hsl(var(--foreground))"
                    />
                    <Label
                        position="insideTopLeft"
                        value="12,343"
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
                Over the past 7 days, you have walked{" "}
                <span className="font-medium text-foreground">53,305</span> steps.
                </CardDescription>
                <CardDescription>
                You need <span className="font-medium text-foreground">12,584</span>{" "}
                more steps to reach your goal.
                </CardDescription>
            </CardFooter>
            </Card>
          {/* Second Chart Card */}
          <Card className="flex flex-col lg:max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
              <div>
                <CardDescription>Moneyline Accuracy</CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                  66.34
                  <span className="text-sm font-normal tracking-normal text-muted-foreground">
                    %
                  </span>
                </CardTitle>
              </div>
              <div>
                <CardDescription>O/U Accuracy</CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                  67.11
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
                    color: "hsl(var(--chart-1))",
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
                      date: "Week 1",
                      Moneyline: 71,
                      OU: 65,
                    },
                    {
                      date: "Week 2",
                      Moneyline: 63,
                      OU: 61,
                    },
                    {
                      date: "Week 3",
                      Moneyline: 65,
                      OU: 65,
                    },
                    {
                        date: "Week 4",
                        Moneyline: 65,
                        OU: 71,
                      },
                      {
                        date: "Week 5",
                        Moneyline: 61,
                        OU: 68,
                      },
                      {
                        date: "Week 6",
                        Moneyline: 68,
                        OU: 63,
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
                        indicator="line"

                      />
                    }
                    cursor={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

        <Card className="max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
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
                    67
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

          <Card className="max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
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
                      value: 79.0,
                      label: "79.0",
                      fill: "var(--color-feature_1)",
                    },
                    {
                      activity: "Away Moneyline",
                      value: 39.4,
                      label: "39.4",
                      fill: "var(--color-feature_2)",
                    },
                    {
                      activity: "Away QB",
                      value: 35.0,
                      label: "35.0",
                      fill: "var(--color-feature_3)",
                    },
                    {
                        activity: "Home QB",
                        value: 29.5,
                        label: "29.5",
                        fill: "var(--color-feature_4)",
                      },
                      {
                        activity: "Away coach",
                        value: 23.0,
                        label: "23.0",
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
          <Card className="max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
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
          </Card>

          {/* Seventh Chart Card */}
          <Card className="max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
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
          </Card>

          {/* Eighth Chart Card */}
          <Card className="max-w-xl bg-zinc-900 border-none mb-6 break-inside-avoid">
            <CardHeader className="space-y-0 pb-0"> 
              <CardDescription>Scoring Residuals Distribution</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                8
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  hr
                </span>
                35
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  min
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--chart-2))",
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
                      time: 18,
                    },
                    {
                        date: "2024-01-02",
                        time: 23,
                      },
                    {
                      date: "2024-01-03",
                      time: 28,
                    },
                    {
                      date: "2024-01-04",
                      time: 31,
                    },
                    {
                      date: "2024-01-05",
                      time: 25,
                    },
                    {
                        date: "2024-01-02",
                        time: 19,
                      },
                    {
                      date: "2024-01-06",
                      time: 9,
                    },
                    {
                      date: "2024-01-07",
                      time: 2,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
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
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          Count: {value} Residual: {}
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
