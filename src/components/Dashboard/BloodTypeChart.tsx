import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { Donor } from "@/lib/constants";
import { BLOOD_TYPES } from "@/lib/constants";

const CHART_COLORS: Record<string, string> = {
  "O+": "#3B82F6", "O-": "#1E40AF",
  "A+": "#10B981", "A-": "#059669",
  "B+": "#EF4444", "B-": "#DC2626",
  "AB+": "#A855F7", "AB-": "#7E22CE",
};

const BloodTypeChart = ({ donors }: { donors: Donor[] }) => {
  const data = BLOOD_TYPES.map((type) => ({
    name: type,
    count: donors.filter((d) => d.blood_type === type).length,
  }));

  return (
    <div className="rounded-2xl border border-white/10 p-5 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
      <h3 className="text-white font-semibold mb-4 text-right">توزيع فصائل الدم</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CHART_COLORS[entry.name] || "#888"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodTypeChart;
