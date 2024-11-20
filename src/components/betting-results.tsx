// pages/betting-results.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
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

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
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

interface GamePrediction {
  game: string;
  moneyline: { [team: string]: number };
  spread: { favorite: string; line: number };
  ou: { line: number; prediction: "Over" | "Under" };
  pointDiff: number;
  winner: string;
  projectedScore: { [team: string]: number };
  actual: {
    winner: string;
    score: { [team: string]: number };
    total: number;
  };
}

interface BetResult {
  game: string;
  moneylineNet: number;
  spreadNet: number;
  ouNet: number;
  gameNet: number;
  cumulativeNet: number;
}

export default function BettingResults() {
  const predictions: GamePrediction[] = [
        { game: "SF @ SEA", moneyline: { SF: -170, SEA: 142 }, spread: { favorite: "SF", line: -3.5 }, ou: { line: 47.5, prediction: "Over" }, pointDiff: 3.98, winner: "SF", projectedScore: { SF: 23.83, SEA: 19.85 }, actual: { winner: "SF", score: { SF: 36, SEA: 24 }, total: 60 } },
        { game: "JAX @ CHI", moneyline: { JAX: 120, CHI: -142 }, spread: { favorite: "CHI", line: -2.5 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 2.89, winner: "CHI", projectedScore: { JAX: 22.27, CHI: 25.17 }, actual: { winner: "CHI", score: { JAX: 16, CHI: 35 }, total: 51 } },
        { game: "HOU @ NE", moneyline: { HOU: -310, NE: 250 }, spread: { favorite: "HOU", line: 7.0 }, ou: { line: 38.0, prediction: "Over" }, pointDiff: 1.63, winner: "HOU", projectedScore: { HOU: 19.70, NE: 18.07 }, actual: { winner: "HOU", score: { HOU: 41, NE: 21 }, total: 62 } },
        { game: "PIT @ LV", moneyline: { PIT: -155, LV: 130 }, spread: { favorite: "PIT", line: 3.0 }, ou: { line: 36.5, prediction: "Over" }, pointDiff: 3.63, winner: "LV", projectedScore: { PIT: 18.02, LV: 21.65 }, actual: { winner: "PIT", score: { PIT: 32, LV: 13 }, total: 45 } },
        { game: "CIN @ NYG", moneyline: { CIN: -170, NYG: 142 }, spread: { favorite: "CIN", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 5.08, winner: "CIN", projectedScore: { CIN: 23.73, NYG: 18.65 }, actual: { winner: "CIN", score: { CIN: 17, NYG: 7 }, total: 24 } },
        { game: "BAL @ WAS", moneyline: { BAL: -285, WAS: 230 }, spread: { favorite: "BAL", line: -6.5 }, ou: { line: 52.5, prediction: "Under" }, pointDiff: 6.16, winner: "BAL", projectedScore: { BAL: 26.93, WAS: 20.77 }, actual: { winner: "BAL", score: { BAL: 30, WAS: 23 }, total: 53 } },
        { game: "TB @ NO", moneyline: { TB: -180, NO: 150 }, spread: { favorite: "TB", line: -3.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 3.02, winner: "TB", projectedScore: { TB: 24.09, NO: 21.08 }, actual: { winner: "TB", score: { TB: 51, NO: 27 }, total: 78 } },
        { game: "ARI @ GB", moneyline: { ARI: 195, GB: -238 }, spread: { favorite: "GB", line: -5.0 }, ou: { line: 49.5, prediction: "Under" }, pointDiff: 6.22, winner: "GB", projectedScore: { GB: 27.20, ARI: 20.97 }, actual: { winner: "GB", score: { GB: 34, ARI: 13 }, total: 47 } },
        { game: "IND @ TEN", moneyline: { IND: -112, TEN: -108 }, spread: { favorite: "IND", line: -1.0 }, ou: { line: 43.0, prediction: "Under" }, pointDiff: 1.63, winner: "IND", projectedScore: { IND: 20.47, TEN: 18.84 }, actual: { winner: "IND", score: { IND: 20, TEN: 17 }, total: 37 } },
        { game: "CLE @ PHI", moneyline: { CLE: 330, PHI: -425 }, spread: { favorite: "PHI", line: -8.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 6.52, winner: "PHI", projectedScore: { PHI: 26.87, CLE: 20.35 }, actual: { winner: "PHI", score: { PHI: 20, CLE: 16 }, total: 36 } },
        { game: "LAC @ DEN", moneyline: { LAC: -155, DEN: 130 }, spread: { favorite: "LAC", line: -3.0 }, ou: { line: 35.5, prediction: "Under" }, pointDiff: 1.42, winner: "LAC", projectedScore: { LAC: 18.96, DEN: 17.55 }, actual: { winner: "LAC", score: { LAC: 23, DEN: 16 }, total: 39 } },
        { game: "DET @ DAL", moneyline: { DET: -162, DAL: 136 }, spread: { favorite: "DET", line: 3.0 }, ou: { line: 52.5, prediction: "Over" }, pointDiff: 0.08, winner: "DET", projectedScore: { DET: 20.69, DAL: 20.61 }, actual: { winner: "DET", score: { DET: 47, DAL: 9 }, total: 56 } },
        { game: "ATL @ CAR", moneyline: { ATL: -265, CAR: 215 }, spread: { favorite: "ATL", line: -6.0 }, ou: { line: 47.5, prediction: "Under" }, pointDiff: 3.58, winner: "ATL", projectedScore: { ATL: 23.41, CAR: 19.83 }, actual: { winner: "ATL", score: { ATL: 38, CAR: 20 }, total: 58 } },
        { game: "DEN @ NO", moneyline: { DEN: -148, NO: 124 }, spread: { favorite: "NO", line: -2.5 }, ou: { line: 37.0, prediction: "Over" }, pointDiff: 7.75, winner: "NO", projectedScore: { DEN: 19.70, NO: 27.45 }, actual: { winner: "DEN", score: { DEN: 33, NO: 10 }, total: 43 } },
        { game: "NE @ JAX", moneyline: { NE: 205, JAX: -250 }, spread: { favorite: "JAX", line: 6.0 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 5.27, winner: "JAX", projectedScore: { NE: 21.18, JAX: 26.45 }, actual: { winner: "JAX", score: { JAX: 32, NE: 16 }, total: 48 } },
        { game: "SEA @ ATL", moneyline: { SEA: 130, ATL: -155 }, spread: { favorite: "ATL", line: 3.0 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 10.97, winner: "ATL", projectedScore: { SEA: 21.12, ATL: 32.09 }, actual: { winner: "SEA", score: { SEA: 34, ATL: 14 }, total: 48 } },
        { game: "TEN @ BUF", moneyline: { TEN: 360, BUF: -470 }, spread: { favorite: "BUF", line: 9.5 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 8.85, winner: "BUF", projectedScore: { TEN: 19.96, BUF: 28.81 }, actual: { winner: "BUF", score: { BUF: 34, TEN: 10 }, total: 44 } },
        { game: "CIN @ CLE", moneyline: { CIN: -230, CLE: 190 }, spread: { favorite: "CIN", line: -5.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 0.27, winner: "CIN", projectedScore: { CIN: 24.33, CLE: 24.60 }, actual: { winner: "CIN", score: { CIN: 21, CLE: 14 }, total: 35 } },
        { game: "HOU @ GB", moneyline: { HOU: 124, GB: -148 }, spread: { favorite: "GB", line: 3.0 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 8.71, winner: "GB", projectedScore: { HOU: 20.66, GB: 29.37 }, actual: { winner: "GB", score: { GB: 24, HOU: 22 }, total: 46 } },
        { game: "MIA @ IND", moneyline: { MIA: 130, IND: -155 }, spread: { favorite: "IND", line: 3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 8.21, winner: "IND", projectedScore: { MIA: 20.41, IND: 28.62 }, actual: { winner: "IND", score: { IND: 16, MIA: 10 }, total: 26 } },
        { game: "DET @ MIN", moneyline: { DET: 100, MIN: -120 }, spread: { favorite: "MIN", line: 1.5 }, ou: { line: 50.5, prediction: "Under" }, pointDiff: 4.27, winner: "MIN", projectedScore: { DET: 22.51, MIN: 26.78 }, actual: { winner: "DET", score: { DET: 31, MIN: 29 }, total: 60 } },
        { game: "PHI @ NYG", moneyline: { PHI: -170, NYG: 142 }, spread: { favorite: "PHI", line: -3.5 }, ou: { line: 42.5, prediction: "Under" }, pointDiff: 1.95, winner: "PHI", projectedScore: { PHI: 23.80, NYG: 21.86 }, actual: { winner: "PHI", score: { PHI: 28, NYG: 3 }, total: 31 } },
        { game: "LV @ LA", moneyline: { LV: 275, LA: -345 }, spread: { favorite: "LA", line: 7.0 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 3.48, winner: "LA", projectedScore: { LV: 21.43, LA: 24.91 }, actual: { winner: "LA", score: { LAR: 20, LV: 15 }, total: 35 } },
        { game: "CAR @ WAS", moneyline: { CAR: 360, WAS: -470 }, spread: { favorite: "WAS", line: 9.5 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 8.83, winner: "WAS", projectedScore: { CAR: 20.23, WAS: 29.06 }, actual: { winner: "WAS", score: { WSH: 40, CAR: 7 }, total: 47 } },
        { game: "KC @ SF", moneyline: { KC: 105, SF: -125 }, spread: { favorite: "SF", line: 2.0 }, ou: { line: 47.0, prediction: "Under" }, pointDiff: 2.99, winner: "SF", projectedScore: { KC: 25.19, SF: 28.17 }, actual: { winner: "KC", score: { KC: 28, SF: 18 }, total: 46 } },
        { game: "NYJ @ PIT", moneyline: { NYJ: -135, PIT: 114 }, spread: { favorite: "NYJ", line: -1.5 }, ou: { line: 39.0, prediction: "Over" }, pointDiff: 2.37, winner: "PIT", projectedScore: { NYJ: 19.30, PIT: 21.66 }, actual: { winner: "PIT", score: { PIT: 37, NYJ: 15 }, total: 52 } },
        { game: "BAL @ TB", moneyline: { BAL: -180, TB: 150 }, spread: { favorite: "BAL", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 3.57, winner: "BAL", projectedScore: { BAL: 24.53, TB: 20.96 }, actual: { winner: "BAL", score: { BAL: 41, TB: 31 }, total: 72 } },
        { game: "LAC @ ARI", moneyline: { LAC: -125, ARI: 105 }, spread: { favorite: "LAC", line: -2.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 0.78, winner: "LAC", projectedScore: { LAC: 23.17, ARI: 22.40 }, actual: { winner: "ARI", score: { ARI: 17, LAC: 15 }, total: 32 } },
        { 
            game: "MIN @ LA", 
            moneyline: { MIN: -148, LA: 124 }, 
            spread: { favorite: "MIN", line: -2.5 }, 
            ou: { line: 48.0, prediction: "Under" }, 
            pointDiff: 1.72, 
            winner: "MIN", 
            projectedScore: { MIN: 22.40, LA: 20.68 },
            actual: { winner: "LAR", score: { LAR: 30, MIN: 20 }, total: 50 }
        },
        { 
            game: "PHI @ CIN", 
            moneyline: { PHI: 120, CIN: -142 }, 
            spread: { favorite: "CIN", line: 2.5 }, 
            ou: { line: 47.5, prediction: "Under" }, 
            pointDiff: 7.51, 
            winner: "CIN", 
            projectedScore: { PHI: 20.68, CIN: 28.19 },
            actual: { winner: "PHI", score: { PHI: 37, CIN: 17 }, total: 54 }
        },
        { 
            game: "BAL @ CLE", 
            moneyline: { BAL: -380, CLE: 300 }, 
            spread: { favorite: "BAL", line: -8.0 }, 
            ou: { line: 45.5, prediction: "Under" }, 
            pointDiff: 4.08, 
            winner: "BAL", 
            projectedScore: { BAL: 24.86, CLE: 20.78 },
            actual: { winner: "CLE", score: { CLE: 29, BAL: 24 }, total: 53 }
        },
        { 
            game: "TEN @ DET", 
            moneyline: { TEN: 470, DET: -650 }, 
            spread: { favorite: "DET", line: 11.5 }, 
            ou: { line: 45.0, prediction: "Over" }, 
            pointDiff: 7.51, 
            winner: "DET", 
            projectedScore: { TEN: 20.80, DET: 28.31 },
            actual: { winner: "DET", score: { DET: 52, TEN: 14 }, total: 66 }
        },
        { 
            game: "IND @ HOU", 
            moneyline: { IND: 180, HOU: -218 }, 
            spread: { favorite: "HOU", line: 5.0 }, 
            ou: { line: 45.0, prediction: "Over" }, 
            pointDiff: 4.72, 
            winner: "HOU", 
            projectedScore: { IND: 20.94, HOU: 25.66 },
            actual: { winner: "HOU", score: { HOU: 23, IND: 20 }, total: 43 }
        },
        { 
            game: "GB @ JAX", 
            moneyline: { GB: -198, JAX: 164 }, 
            spread: { favorite: "GB", line: -4.0 }, 
            ou: { line: 49.0, prediction: "Under" }, 
            pointDiff: 3.25, 
            winner: "GB", 
            projectedScore: { GB: 24.00, JAX: 20.75 },
            actual: { winner: "GB", score: { GB: 30, JAX: 27 }, total: 57 }
        },
        { 
            game: "ARI @ MIA", 
            moneyline: { ARI: 164, MIA: -198 }, 
            spread: { favorite: "MIA", line: 4.0 }, 
            ou: { line: 46.0, prediction: "Over" }, 
            pointDiff: 4.21, 
            winner: "MIA", 
            projectedScore: { ARI: 20.74, MIA: 24.95 },
            actual: { winner: "ARI", score: { ARI: 28, MIA: 27 }, total: 55 }
        },
        { 
            game: "NYJ @ NE", 
            moneyline: { NYJ: -325, NE: 260 }, 
            spread: { favorite: "NYJ", line: -7.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 2.61, 
            winner: "NYJ", 
            projectedScore: { NYJ: 21.58, NE: 18.97 },
            actual: { winner: "NE", score: { NE: 25, NYJ: 22 }, total: 47 }
        },
        { 
            game: "ATL @ TB", 
            moneyline: { ATL: -142, TB: 120 }, 
            spread: { favorite: "ATL", line: -2.5 }, 
            ou: { line: 46.0, prediction: "Under" }, 
            pointDiff: 1.74, 
            winner: "ATL", 
            projectedScore: { ATL: 21.38, TB: 19.63 },
            actual: { winner: "ATL", score: { ATL: 31, TB: 26 }, total: 57 }
        },
        { 
            game: "NO @ LAC", 
            moneyline: { NO: 250, LAC: -310 }, 
            spread: { favorite: "LAC", line: 7.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 5.93, 
            winner: "LAC", 
            projectedScore: { NO: 21.23, LAC: 27.16 },
            actual: { winner: "LAC", score: { LAC: 26, NO: 8 }, total: 34 }
        },
        { 
            game: "BUF @ SEA", 
            moneyline: { BUF: -162, SEA: 136 }, 
            spread: { favorite: "BUF", line: -3.0 }, 
            ou: { line: 45.0, prediction: "Under" }, 
            pointDiff: 0.67, 
            winner: "BUF", 
            projectedScore: { BUF: 21.06, SEA: 20.39 },
            actual: { winner: "BUF", score: { BUF: 31, SEA: 10 }, total: 41 }
        },
        { 
            game: "CAR @ DEN", 
            moneyline: { CAR: 425, DEN: -575 }, 
            spread: { favorite: "DEN", line: 11.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 7.84, 
            winner: "DEN", 
            projectedScore: { CAR: 19.99, DEN: 27.82 },
            actual: { winner: "DEN", score: { DEN: 28, CAR: 14 }, total: 42 }
        },
        { 
            game: "KC @ LV", 
            moneyline: { KC: -425, LV: 330 }, 
            spread: { favorite: "KC", line: -9.5 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 5.58, 
            winner: "KC", 
            projectedScore: { KC: 25.03, LV: 19.45 },
            actual: { winner: "KC", score: { KC: 27, LV: 20 }, total: 47 }
        },
        { 
            game: "CHI @ WAS", 
            moneyline: { CHI: -142, WAS: 120 }, 
            spread: { favorite: "CHI", line: -2.5 }, 
            ou: { line: 43.5, prediction: "Under" }, 
            pointDiff: 2.13, 
            winner: "CHI", 
            projectedScore: { CHI: 20.09, WAS: 17.96 },
            actual: { winner: "WAS", score: { WAS: 18, CHI: 15 }, total: 33 }
        },
        { 
            game: "DAL @ SF", 
            moneyline: { DAL: 180, SF: -218 }, 
            spread: { favorite: "SF", line: 4.5 }, 
            ou: { line: 47.0, prediction: "Over" }, 
            pointDiff: 6.67, 
            winner: "SF", 
            projectedScore: { DAL: 21.02, SF: 27.70 },
            actual: { winner: "SF", score: { SF: 30, DAL: 24 }, total: 54 }
        },
        { game: "HOU @ NYJ", moneyline: { HOU: 105, NYJ: -125 }, spread: { favorite: "NYJ", line: 1.5 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 3.37, winner: "HOU", projectedScore: { HOU: 23.82, NYJ: 20.45 }, actual: { winner: "NYJ", score: { NYJ: 21, HOU: 13 }, total: 34 } },
        { game: "DAL @ ATL", moneyline: { DAL: 124, ATL: -148 }, spread: { favorite: "ATL", line: 3.0 }, ou: { line: 52.0, prediction: "Under" }, pointDiff: 5.26, winner: "ATL", projectedScore: { DAL: 20.67, ATL: 25.93 }, actual: { winner: "ATL", score: { ATL: 27, DAL: 21 }, total: 48 } },
        { game: "DEN @ BAL", moneyline: { DEN: 340, BAL: -440 }, spread: { favorite: "BAL", line: 9.0 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 5.82, winner: "BAL", projectedScore: { DEN: 20.30, BAL: 26.12 }, actual: { winner: "BAL", score: { BAL: 41, DEN: 10 }, total: 51 } },
        { game: "MIA @ BUF", moneyline: { MIA: 215, BUF: -265 }, spread: { favorite: "BUF", line: 6.0 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 9.05, winner: "BUF", projectedScore: { MIA: 20.94, BUF: 29.98 }, actual: { winner: "BUF", score: { BUF: 30, MIA: 27 }, total: 57 } },
        { game: "NO @ CAR", moneyline: { NO: -355, CAR: 280 }, spread: { favorite: "NO", line: 7.5 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 4.79, winner: "NO", projectedScore: { NO: 24.20, CAR: 19.42 }, actual: { winner: "CAR", score: { CAR: 23, NO: 22 }, total: 45 } },
        { game: "LV @ CIN", moneyline: { LV: 260, CIN: -325 }, spread: { favorite: "CIN", line: 7.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 7.18, winner: "CIN", projectedScore: { LV: 20.83, CIN: 28.01 }, actual: { winner: "CIN", score: { CIN: 41, LV: 24 }, total: 65 } },
        { game: "LAC @ CLE", moneyline: { LAC: -122, CLE: 102 }, spread: { favorite: "LAC", line: 1.5 }, ou: { line: 43.0, prediction: "Over" }, pointDiff: 0.09, winner: "LAC", projectedScore: { LAC: 21.13, CLE: 21.06 }, actual: { winner: "LAC", score: { LAC: 27, CLE: 10 }, total: 37 } },
        { game: "WAS @ NYG", moneyline: { WAS: -198, NYG: 164 }, spread: { favorite: "WAS", line: 3.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 4.17, winner: "WAS", projectedScore: { WAS: 23.52, NYG: 19.34 }, actual: { winner: "WAS", score: { WAS: 27, NYG: 22 }, total: 49 } },
        { game: "NE @ TEN", moneyline: { NE: 154, TEN: -185 }, spread: { favorite: "TEN", line: 3.5 }, ou: { line: 38.0, prediction: "Over" }, pointDiff: 5.36, winner: "TEN", projectedScore: { NE: 18.04, TEN: 23.40 }, actual: { winner: "TEN", score: { TEN: 20, NE: 17 }, total: 37 } },
        { game: "CHI @ ARI", moneyline: { CHI: -102, ARI: -118 }, spread: { favorite: "ARI", line: 1.0 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 1.89, winner: "ARI", projectedScore: { CHI: 22.05, ARI: 23.16 }, actual: { winner: "ARI", score: { ARI: 29, CHI: 9 }, total: 38 } },
        { game: "JAX @ PHI", moneyline: { JAX: 260, PHI: -325 }, spread: { favorite: "PHI", line: 7.5 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 6.17, winner: "PHI", projectedScore: { JAX: 21.13, PHI: 27.30 }, actual: { winner: "PHI", score: { PHI: 28, JAX: 23 }, total: 51 } },
        { game: "DET @ GB", moneyline: { DET: -175, GB: 145 }, spread: { favorite: "DET", line: 3.5 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 4.63, winner: "DET", projectedScore: { DET: 24.63, GB: 20.00 }, actual: { winner: "DET", score: { DET: 24, GB: 14 }, total: 38 } },
        { game: "LA @ SEA", moneyline: { LA: -120, SEA: 100 }, spread: { favorite: "LA", line: 1.5 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 0.24, winner: "SEA", projectedScore: { LA: 21.07, SEA: 21.31 }, actual: { winner: "LA", score: { LA: 26, SEA: 20 }, total: 46 } },
        { game: "IND @ MIN", moneyline: { IND: 185, MIN: -225 }, spread: { favorite: "MIN", line: 5.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 5.53, winner: "MIN", projectedScore: { IND: 22.61, MIN: 28.14 }, actual: { winner: "MIN", score: { MIN: 21, IND: 13 }, total: 34 } },
        { game: "TB @ KC", moneyline: { TB: 360, KC: -470 }, spread: { favorite: "KC", line: 8.5 }, ou: { line: 45.5, prediction: "Under" }, pointDiff: 2.87, winner: "KC", projectedScore: { TB: 20.81, KC: 23.68 }, actual: { winner: "KC", score: { KC: 30, TB: 24 }, total: 54 } },
        { 
            game: "CIN @ BAL", 
            moneyline: { CIN: 210, BAL: -258 }, 
            spread: { favorite: "BAL", line: 6.0 }, 
            ou: { line: 48.53, prediction: "Under" }, 
            pointDiff: 8.07,
            winner: "BAL", 
            projectedScore: { CIN: 20.40, BAL: 28.47 },
            actual: { 
                winner: "BAL", 
                score: { 
                    BAL: 35, 
                    CIN: 34 
                }, 
                total: 69 
            }
        },
        { 
            game: "NYG @ CAR", 
            moneyline: { NYG: -290, CAR: 235 }, 
            spread: { favorite: "NYG", line: 6.5 }, 
            ou: { line: 40.5, prediction: "Over" }, 
            pointDiff: 2.85,
            winner: "NYG", 
            projectedScore: { NYG: 23.81, CAR: 20.96 },
            actual: { 
                winner: "CAR", 
                score: { 
                    CAR: 20, 
                    NYG: 17 
                }, 
                total: 37 
            }
        },
        { 
            game: "NE @ CHI", 
            moneyline: { NE: 235, CHI: -290 }, 
            spread: { favorite: "CHI", line: 6.8 }, 
            ou: { line: 38.5, prediction: "Over" }, 
            pointDiff: 8.48,
            winner: "CHI", 
            projectedScore: { NE: 18.36, CHI: 26.84 },
            actual: { 
                winner: "NE", 
                score: { 
                    NE: 19, 
                    CHI: 3 
                }, 
                total: 22 
            }
        },
        { 
            game: "BUF @ IND", 
            moneyline: { BUF: -198, IND: 164 }, 
            spread: { favorite: "BUF", line: 4.1 }, 
            ou: { line: 48, prediction: "Over" }, 
            pointDiff: 1.25,
            winner: "BUF", 
            projectedScore: { BUF: 23.88, IND: 22.63 },
            actual: { 
                winner: "BUF", 
                score: { 
                    BUF: 30, 
                    IND: 20 
                }, 
                total: 50 
            }
        },
        {
            game: "MIN @ JAX",
            moneyline: { MIN: -198, JAX: 164 },
            spread: { favorite: "MIN", line: 4.3 },
            ou: { line: 45, prediction: "Under" },
            pointDiff: 3.09,
            winner: "MIN",
            projectedScore: { MIN: 23.96, JAX: 20.87 },
            actual: {
                winner: "MIN",
                score: {
                    MIN: 12,
                    JAX: 7
                },
                total: 19
            }
        },
        {
            game: "DEN @ KC",
            moneyline: { DEN: 295, KC: -375 },
            spread: { favorite: "KC", line: 7.5 },
            ou: { line: 42, prediction: "Over" },
            pointDiff: 4.09,
            winner: "KC",
            projectedScore: { DEN: 19.97, KC: 24.06 },
            actual: {
                winner: "KC",
                score: {
                    KC: 16,
                    DEN: 14
                },
                total: 30
            }
        },
        {
            game: "ATL @ NO",
            moneyline: { ATL: -198, NO: 164 },
            spread: { favorite: "ATL", line: 3.5 },
            ou: { line: 46, prediction: "Under" },
            pointDiff: 1.54,
            winner: "ATL",
            projectedScore: { ATL: 23.14, NO: 21.60 },
            actual: {
                winner: "NO",
                score: {
                    NO: 20,
                    ATL: 17
                },
                total: 37
            }
        },
        {
            game: "SF @ TB",
            moneyline: { SF: -278, TB: 225 },
            spread: { favorite: "SF", line: 6.4 },
            ou: { line: 50.5, prediction: "Under" },
            pointDiff: 4.51,
            winner: "SF",
            projectedScore: { SF: 24.32, TB: 19.81 },
            actual: {
                winner: "SF",
                score: {
                    SF: 23,
                    TB: 20
                },
                total: 43
            }
        },
        {
            game: "PIT @ WAS",
            moneyline: { PIT: 124, WAS: -148 },
            spread: { favorite: "WAS", line: 3.0 },
            ou: { line: 45.5, prediction: "Under" },
            pointDiff: 0.45,
            winner: "PIT",
            projectedScore: { PIT: 21.37, WAS: 20.92 },
            actual: {
                winner: "PIT",
                score: {
                    PIT: 28,
                    WSH: 27
                },
                total: 55
            }
        },
        {
            game: "TEN @ LAC",
            moneyline: { TEN: 280, LAC: -355 },
            spread: { favorite: "LAC", line: 7.5 },
            ou: { line: 39, prediction: "Over" },
            pointDiff: 7.24,
            winner: "LAC",
            projectedScore: { TEN: 18.88, LAC: 26.12 },
            actual: {
                winner: "LAC",
                score: {
                    LAC: 27,
                    TEN: 17
                },
                total: 44
            }
        },
        {
            game: "NYJ @ ARI",
            moneyline: { NYJ: -118, ARI: -102 },
            spread: { favorite: "NYJ", line: 1.0 },
            ou: { line: 46, prediction: "Under" },
            pointDiff: 0.22,
            winner: "NYJ",
            projectedScore: { NYJ: 22.90, ARI: 22.68 },
            actual: {
                winner: "ARI",
                score: {
                    ARI: 31,
                    NYJ: 6
                },
                total: 37
            }
        },
        {
            game: "PHI @ DAL",
            moneyline: { PHI: -360, DAL: 285 },
            spread: { favorite: "PHI", line: 7.2 },
            ou: { line: 43, prediction: "Over" },
            pointDiff: 2.17,
            winner: "PHI",
            projectedScore: { PHI: 24.23, DAL: 22.06 },
            actual: {
                winner: "PHI",
                score: {
                    PHI: 34,
                    DAL: 6
                },
                total: 40
            }
        },
        {
            game: "DET @ HOU",
            moneyline: { DET: -192, HOU: 160 },
            spread: { favorite: "DET", line: 3.5 },
            ou: { line: 49, prediction: "Under" },
            pointDiff: 0.76,
            winner: "DET",
            projectedScore: { DET: 24.10, HOU: 23.34 },
            actual: {
                winner: "DET",
                score: {
                    DET: 26,
                    HOU: 23
                },
                total: 49
            }
        },
        { 
            game: "WAS @ PHI", 
            moneyline: { WAS: 150, PHI: -180 }, 
            spread: { favorite: "PHI", line: 3.5 }, 
            ou: { line: 48.5, prediction: "Under" }, 
            pointDiff: 5.63, 
            winner: "PHI", 
            projectedScore: { WAS: 21.04, PHI: 26.68 },
            actual: { winner: "PHI", score: { PHI: 26, WAS: 18 }, total: 44 }
        },
        {
            game: "GB @ CHI",
            moneyline: { GB: -230, CHI: 190 },
            spread: { favorite: "GB", line: 5.5 },
            ou: { line: 40.5, prediction: "Over" },
            pointDiff: 1.35,
            winner: "GB",
            projectedScore: { GB: 23.96, CHI: 22.60 },
            actual: { winner: "GB", score: { GB: 20, CHI: 19 }, total: 39 }
        },
        {
            game: "JAX @ DET",
            moneyline: { JAX: 525, DET: -750 },
            spread: { favorite: "DET", line: 13.0 },
            ou: { line: 47.0, prediction: "Over" },
            pointDiff: 8.71,
            winner: "DET",
            projectedScore: { JAX: 20.06, DET: 28.77 },
            actual: { winner: "DET", score: { DET: 52, JAX: 6 }, total: 58 }
        },
        {
            game: "LV @ MIA",
            moneyline: { LV: 260, MIA: -325 },
            spread: { favorite: "MIA", line: 7.0 },
            ou: { line: 44.0, prediction: "Under" },
            pointDiff: 3.41,
            winner: "MIA",
            projectedScore: { LV: 20.08, MIA: 23.49 },
            actual: { winner: "MIA", score: { MIA: 34, LV: 19 }, total: 53 }
        },
        {
            game: "LA @ NE",
            moneyline: { LA: -205, NE: 170 },
            spread: { favorite: "LA", line: 4.5 },
            ou: { line: 43.5, prediction: "Under" },
            pointDiff: 0.77,
            winner: "LA",
            projectedScore: { NE: 21.69, LA: 22.47 },
            actual: { winner: "LA", score: { LA: 28, NE: 22 }, total: 50 }
        },
        {
            game: "CLE @ NO",
            moneyline: { CLE: -108, NO: -112 },
            spread: { favorite: "NO", line: 1.0 },
            ou: { line: 44.5, prediction: "Over" },
            pointDiff: 1.98,
            winner: "NO",
            projectedScore: { CLE: 20.94, NO: 22.92 },
            actual: { winner: "NO", score: { NO: 35, CLE: 14 }, total: 49 }
        },
        {
            game: "IND @ NYJ",
            moneyline: { IND: 164, NYJ: -198 },
            spread: { favorite: "NYJ", line: 4.0 },
            ou: { line: 43.5, prediction: "Over" },
            pointDiff: 3.04,
            winner: "NYJ",
            projectedScore: { IND: 20.46, NYJ: 23.50 },
            actual: { winner: "IND", score: { IND: 28, NYJ: 27 }, total: 55 }
        },
        {
            game: "BAL @ PIT",
            moneyline: { BAL: -175, PIT: 145 },
            spread: { favorite: "BAL", line: 3.0 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 0.65,
            winner: "BAL",
            projectedScore: { BAL: 22.63, PIT: 21.98 },
            actual: { winner: "PIT", score: { PIT: 18, BAL: 16 }, total: 34 }
        },
        {
            game: "MIN @ TEN",
            moneyline: { MIN: -258, TEN: 210 },
            spread: { favorite: "MIN", line: 6.0 },
            ou: { line: 39.5, prediction: "Over" },
            pointDiff: 1.28,
            winner: "MIN",
            projectedScore: { TEN: 20.21, MIN: 21.49 },
            actual: { winner: "MIN", score: { MIN: 23, TEN: 13 }, total: 36 }
        },
        {
            game: "ATL @ DEN",
            moneyline: { ATL: 120, DEN: -142 },
            spread: { favorite: "DEN", line: 2.5 },
            ou: { line: 44.0, prediction: "Over" },
            pointDiff: 3.71,
            winner: "DEN",
            projectedScore: { ATL: 19.95, DEN: 23.65 },
            actual: { winner: "DEN", score: { DEN: 38, ATL: 6 }, total: 44 }
        },
        {
            game: "SEA @ SF",
            moneyline: { SEA: 235, SF: -290 },
            spread: { favorite: "SF", line: 6.5 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 7.28,
            winner: "SF",
            projectedScore: { SEA: 21.13, SF: 28.41 },
            actual: { winner: "SEA", score: { SEA: 20, SF: 17 }, total: 37 }
        },
        {
            game: "KC @ BUF",
            moneyline: { KC: 110, BUF: -130 },
            spread: { favorite: "BUF", line: 2.0 },
            ou: { line: 45.5, prediction: "Over" },
            pointDiff: 2.65,
            winner: "BUF",
            projectedScore: { KC: 22.09, BUF: 24.74 },
            actual: { winner: "BUF", score: { BUF: 30, KC: 21 }, total: 51 }
        },
        {
            game: "CIN @ LAC",
            moneyline: { CIN: 105, LAC: -125 },
            spread: { favorite: "LAC", line: 1.5 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 2.96,
            winner: "LAC",
            projectedScore: { CIN: 22.12, LAC: 25.08 },
            actual: { winner: "LAC", score: { LAC: 34, CIN: 27 }, total: 61 }
        },
        {
            game: "HOU @ DAL",
            moneyline: { HOU: -325, DAL: 260 },
            spread: { favorite: "HOU", line: 7.5 },
            ou: { line: 42.0, prediction: "Over" },
            pointDiff: 0.74,
            winner: "HOU",
            projectedScore: { HOU: 23.64, DAL: 22.90 },
            actual: { winner: "HOU", score: { HOU: 34, DAL: 10 }, total: 44 }
        },
    
  ];

  const betAmount = 10;

  function calculateMoneylinePayout(betAmount: number, odds: number) {
    if (odds < 0) {
      return (betAmount * 100) / -odds;
    } else {
      return (betAmount * odds) / 100;
    }
  }

  function calculateStandardPayout(betAmount: number) {
    return (betAmount * 100) / 110;
  }

  function checkSpreadOutcome(game: GamePrediction) {
    const { spread, actual } = game;
    const favoriteScore = actual.score[spread.favorite];
    const underdog =
      spread.favorite === game.game.split(" @ ")[0]
        ? game.game.split(" @ ")[1]
        : game.game.split(" @ ")[0];
    const underdogScore = actual.score[underdog];
    const adjustedScore = favoriteScore + spread.line;
    return adjustedScore > underdogScore;
  }

  function checkOverUnderOutcome(game: GamePrediction) {
    const { ou, actual } = game;
    const totalPoints = actual.total;
    if (ou.prediction === "Over") {
      return totalPoints > ou.line;
    } else {
      return totalPoints < ou.line;
    }
  }

  const CustomScatterTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-stone-900 border-[#4BFFBA] text-white p-2">
          <p>{`Game: ${data.game}`}</p>
          <p>{`Vegas Spread: ${data.vegasSpread}`}</p>
          <p>{`Model Point Diff: ${data.modelDiff}`}</p>
        </div>
      );
    }
    return null;
  };

  let totalNetWinnings = 0;
  let cumulativeNetWinnings: { game: string; cumulativeNet: number }[] = [];
  let totalWins = 0;

  const betResults: BetResult[] = predictions.map((game, index) => {
    const { winner: predictedWinner, actual } = game;
    const actualWinner = actual.winner;
    let moneylineOdds = game.moneyline[predictedWinner];

    let moneylineNet = -betAmount;
    if (predictedWinner === actualWinner) {
      const payout = calculateMoneylinePayout(betAmount, moneylineOdds);
      moneylineNet = payout;
      totalWins += 1;
    }

    const spreadOutcome = checkSpreadOutcome(game);
    let spreadNet = -betAmount;
    if (spreadOutcome) {
      spreadNet = calculateStandardPayout(betAmount);
      totalWins += 1;
    }

    const ouOutcome = checkOverUnderOutcome(game);
    let ouNet = -betAmount;
    if (ouOutcome) {
      ouNet = calculateStandardPayout(betAmount);
      totalWins += 1;
    }

    const gameNet = moneylineNet + spreadNet + ouNet;

    totalNetWinnings += gameNet;
    cumulativeNetWinnings.push({
      game: game.game,
      cumulativeNet: parseFloat(totalNetWinnings.toFixed(2)),
    });

    return {
      game: game.game,
      moneylineNet: parseFloat(moneylineNet.toFixed(2)),
      spreadNet: parseFloat(spreadNet.toFixed(2)),
      ouNet: parseFloat(ouNet.toFixed(2)),
      gameNet: parseFloat(gameNet.toFixed(2)),
      cumulativeNet: parseFloat(totalNetWinnings.toFixed(2)),
    };
  });

  const totalBets = predictions.length * 3;
  const winRate = ((totalWins / totalBets) * 100).toFixed(2);

  const netWinningsData = betResults.map((game) => ({
    game: game.game,
    moneylineNet: game.moneylineNet,
    spreadNet: game.spreadNet,
    ouNet: game.ouNet,
  }));

  const cumulativeNetData = cumulativeNetWinnings;

  const roiData = cumulativeNetWinnings.map((data, index) => ({
    game: data.game,
    roi: parseFloat(
      (
        (data.cumulativeNet / ((index + 1) * betAmount * 3)) *
        100
      ).toFixed(2)
    ),
  }));

  const comparisonData = predictions.map((game) => ({
    game: game.game,
    modelDiff: game.pointDiff,
    vegasSpread: game.spread.line,
  }));

  return (
    <div className="w-full h-full py-20 bg-gray-50 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
      <Header>
        <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Betting Results
        </h2>
      </Header>
      <div className="chart-wrapper mx-auto max-w-7xl p-6 sm:p-8">
        <div className="w-full gap-6 columns-1 sm:columns-2 lg:columns-3">

          {/* Cumulative Net Winnings */}
          <Card className="flex flex-col bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
              <CardTitle>Cumulative Net Winnings</CardTitle>
              <CardDescription>
                Cumulative net winnings based on $10 bets for: predicted O/U, predicted winner, spread to cover for the predicted winner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cumulativeNet: {
                    label: "Cumulative Net",
                    color: "#4BFFBA",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cumulativeNetData} margin={{
                        left: -20,
                        right: 0,
                        top: 0,
                        bottom: 10,
                    }}>
                        <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="hsl(var(--muted-foreground))"
                        strokeOpacity={0.5}
                    />
                    <XAxis dataKey="game" hide />
                    <YAxis />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          className="bg-stone-900 border-[#4BFFBA] text-white"
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulativeNet"
                      stroke="#4BFFBA"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        fill: "#4BFFBA",
                        stroke: "#4BFFBA",
                        r: 4,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
              <CardDescription>
                Final Cumulative Net Winnings:{" "}
                <span className="font-medium text-foreground">
                  ${totalNetWinnings.toFixed(2)}
                </span>
              </CardDescription>
            </CardFooter>
          </Card>

          {/* Return on Investment (ROI) Over Time */}
          <Card className="flex flex-col bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
              <CardTitle>Return on Investment (ROI)</CardTitle>
              <CardDescription>
                ROI progression over the weeks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  roi: {
                    label: "ROI (%)",
                    color: "#4BFFBA",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={roiData} margin={{
                        left: -20,
                        right: 0,
                        top: 0,
                        bottom: 10,
                    }}>
                    <defs>
                      <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4BFFBA" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4BFFBA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#ccc"
                      strokeOpacity={0.5}
                    />
                    <XAxis dataKey="game" hide />
                    <YAxis />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          className="bg-stone-900 border-[#4BFFBA] text-white"
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="roi"
                      stroke="#4BFFBA"
                      fillOpacity={1}
                      fill="url(#colorROI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
              <CardDescription>
                Final ROI:{" "}
                <span className="font-medium text-foreground">
                  {roiData[roiData.length - 1].roi}%
                </span>
              </CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex flex-col bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
                <CardTitle>Bet Success Rates</CardTitle>
                <CardDescription>
                Proportion of winning vs. losing bets.
                </CardDescription>
            </CardHeader>
            <div className="flex flex-row items-center justify-between px-6">
                <div className="flex flex-col justify-center">
                <CardContent className="py-2">
                    <p className="text-sm text-muted-foreground">
                    Total Bets: <span className="font-medium text-foreground">{totalBets}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                    Wins: <span className="font-medium text-foreground">{totalWins}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                    Losses: <span className="font-medium text-foreground">{totalBets - totalWins}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                    Win Rate: <span className="font-medium text-foreground">{winRate}%</span>
                    </p>
                </CardContent>
                </div>
                <div className="w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={[
                        { name: "Wins", value: totalWins },
                        { name: "Losses", value: totalBets - totalWins },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        dataKey="value"
                    >
                        <Cell key="cell-win" fill="#4BFFBA" />
                        <Cell key="cell-loss" fill="#FF6B6B" />
                    </Pie>
                    <Tooltip
                        content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const percentage = ((data.value / totalBets) * 100).toFixed(2);
                            return (
                            <div className="bg-stone-900 border-[#4BFFBA] text-white p-2 rounded">
                                <p>{`${data.name}: ${data.value} (${percentage}%)`}</p>
                            </div>
                            );
                        }
                        return null;
                        }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </div>
            </Card>
         {/* Model Predictions vs. Actual Results */}
            <Card className="flex flex-col bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
                <CardTitle>Predicted vs Actual Spread</CardTitle>
                <CardDescription>
                Model's predicted point differential vs actual game results.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={{
                    Games: {
                    label: "Games",
                    color: "#4BFFBA",
                    },
                }}
                >
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart
                    margin={{
                        left: -20,
                        right: 0,
                        top: 0,
                        bottom: 10,
                    }}
                    >
                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="hsl(var(--muted-foreground))"
                        strokeOpacity={0.5}
                    />
                    <XAxis 
                        type="number" 
                        dataKey="predictedDiff" 
                        name="Predicted Differential"
                        domain={[-30, 30]}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="actualDiff" 
                        name="Actual Differential"
                        domain={[-30, 30]}
                    />
                    <Line
                        type="monotone"
                        dataKey="reference"
                        stroke="#666"
                        strokeDasharray="3 3"
                        data={[
                        { x: -30, y: -30 },
                        { x: 30, y: 30 }
                        ]}
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                            <div className="custom-tooltip bg-stone-900 border-[#4BFFBA] text-white p-2">
                                <p>{`Game: ${data.game}`}</p>
                                <p>{`Predicted Differential: ${data.predictedDiff.toFixed(2)}`}</p>
                                <p>{`Actual Differential: ${data.actualDiff}`}</p>
                                <p>{`Error: ${(Math.abs(data.actualDiff - data.predictedDiff)).toFixed(2)}`}</p>
                            </div>
                            );
                        }
                        return null;
                        }}
                    />
                    <Scatter
                        name="Games"
                        data={predictions.map(game => {
                        const [awayTeam, homeTeam] = game.game.split(" @ ");
                        const homeScore = game.actual.score[homeTeam];
                        const awayScore = game.actual.score[awayTeam];
                        const actualDiff = homeScore - awayScore;
                        const homePredicted = game.projectedScore[homeTeam];
                        const awayPredicted = game.projectedScore[awayTeam];
                        const predictedDiff = homePredicted - awayPredicted;
                        
                        return {
                            game: game.game,
                            predictedDiff,
                            actualDiff,
                            error: Math.abs(actualDiff - predictedDiff)
                        };
                        })}
                    >
                        {predictions.map((game, index) => {
                        const [awayTeam, homeTeam] = game.game.split(" @ ");
                        const homeScore = game.actual.score[homeTeam];
                        const awayScore = game.actual.score[awayTeam];
                        const actualDiff = homeScore - awayScore;
                        const homePredicted = game.projectedScore[homeTeam];
                        const awayPredicted = game.projectedScore[awayTeam];
                        const predictedDiff = homePredicted - awayPredicted;
                        const error = Math.abs(actualDiff - predictedDiff);
                        
                        let fillColor = "#4BFFBA";  // Good prediction
                        if (error >= 14) {
                            fillColor = "#FF6B6B";  // Large error
                        } else if (error >= 7) {
                            fillColor = "#FFD700";  // Moderate error
                        }
                        
                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                        })}
                    </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4BFFBA]" />
                <CardDescription>Error &lt; 7 points</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                <CardDescription>Error 7-14 points</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                <CardDescription>Error &gt; 14 points</CardDescription>
                </div>
            </CardFooter> */}
            </Card>
          {/* Distribution of Net Winnings */}
          <Card className="flex flex-col bg-transparent shadow-lg border-none mb-6 break-inside-avoid">
            <CardHeader>
                <CardTitle>Net Winnings Distribution</CardTitle>
                <CardDescription>
                Distribution of net winnings per game.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={{
                    gameNet: {
                    label: "Net Winnings",
                    color: "#4BFFBA",
                    },
                }}
                >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={betResults} margin={{
                    left: -20,
                    right: 0,
                    top: 0,
                    bottom: 10,
                    }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#ccc"
                        strokeOpacity={0.5}
                    />
                    <XAxis dataKey="game" hide />
                    <YAxis />
                    <Tooltip
                        content={
                        <ChartTooltipContent
                            className="bg-stone-900 border-[#4BFFBA] text-white"
                        />
                        }
                    />
                    <Bar
                        dataKey="gameNet"
                        name="Net Winnings"
                        radius={[5, 5, 0, 0]}
                    >
                        {betResults.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`}
                            fill={entry.gameNet >= 0 ? "#4BFFBA" : "#FF6B6B"}
                        />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
