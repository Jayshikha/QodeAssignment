import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import MonthlyReturnsTable from "./monthlyReturnsTable"
export default function Portfolio() {
  const [data, setData] = useState([]);
  const [monthlyReturns, setMonthlyReturns] = useState([]);

  useEffect(() => {
    fetch("./FrontendAssignmentHistoricalNAVReport.xlsx")
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        const workbook = XLSX.read(ab, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false, range: 5 });
        console.log("jsonData:", jsonData);
        console.log("First row keys:", Object.keys(jsonData[0]));
        const formatted = jsonData
          .map((row) => {
            const date = row["NAV Date"];
            const nav = parseFloat(row["NAV (Rs)"]);
            if (!date || isNaN(nav)) return null;
            return { date, nav };
          })
          .filter((row) => row !== null)
          .reverse();
    
        console.log("formatted:",formatted);

        
        let peak = formatted[0]?.nav || 0;
        const withDrawdown = formatted.map((point) => {
          peak = Math.max(peak, point.nav);
          const drawdown = ((point.nav - peak) / peak) * 100;
          return {
            ...point,
            drawdown: parseFloat(drawdown.toFixed(2)),
          };
        });
        console.log("withDrawdown:",withDrawdown);
        setData(withDrawdown);
       
        const monthly = {};
        withDrawdown.forEach((entry) => {
          if (!entry.date || typeof entry.date !== "string" || typeof entry.nav !== "number") return;
          const parts = entry.date.split("-");
          if (parts.length !== 3) return;
        
          const [day, month, year] = parts;
          const key = `${year}-${month}`;
          if (!monthly[key]) monthly[key] = [];
          monthly[key].push(entry.nav);
        });
        
        const returns = Object.entries(monthly).map(([month, navs]) => {
          const start = navs[0];
          const end = navs[navs.length - 1];
          const ret = start !== 0 ? ((end - start) / start) * 100 : 0;
          return { month, return: parseFloat(ret.toFixed(2)) };
        });
        
        setMonthlyReturns(returns);
        console.log("monthlyReturns:",returns);
      })
      .catch((err) => {
        console.error("Error loading Excel file:", err);
      });
  }, []);
 console.log("data :", data);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Equity Curve */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-amber-600 mb-4">
          Equity Curve
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="nav"
              stroke="#4F46E5"
           
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Drawdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="drawdown"
              stroke="#DC2626"
             
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Returns */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          Monthly Returns (%)
        </h2>
<MonthlyReturnsTable monthlyReturns={monthlyReturns} />
      </div>
    </div>
  );
}