import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function GraficoCategorias({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid stroke="#2a2b4a" />

          <XAxis dataKey="nome" tick={{ fill: "#ffffff" }} />

          <YAxis tick={{ fill: "#ffffff" }} />

          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#1c1d3b",
              border: "1px solid #74dc3b",
              color: "#ffffff",
            }}
          />

          <Legend />

          <Bar
            dataKey="total_produtos"
            fill="#74dc3b"
            name="Produtos"
            activeBar={false}
          />

          <Bar
            dataKey="total_estoque"
            fill="#3b82f6"
            name="Estoque"
            activeBar={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
