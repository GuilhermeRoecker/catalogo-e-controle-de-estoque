import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function GraficoCategorias({ data }) {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    
                    <CartesianGrid stroke="#2a2b4a" />

                    <XAxis
                        dataKey="nome"
                        tick={{ fill: "#ffffff" }}
                    />

                    <YAxis
                        tick={{ fill: "#ffffff" }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1c1d3b",
                            border: "1px solid #74dc3b",
                            color: "#ffffff"
                        }}
                        labelStyle={{ color: "#ffffff" }}
                    />

                    <Bar
                        dataKey="total"
                        fill="#74dc3b"
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}