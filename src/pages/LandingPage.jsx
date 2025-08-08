import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const LandingPage = () => {
  const lineData = [
    { name: "Jan", Sales: 4000, Revenue: 2400, Custom: 600 },
    { name: "Feb", Sales: 3000, Revenue: 1398, Custom: 2000 },
    { name: "Mar", Sales: 2000, Revenue: 6000, Custom: 9009 },
    { name: "Apr", Sales: 2780, Revenue: 3908, Custom: 7999 },
    { name: "May", Sales: 1890, Revenue: 4800, Custom: 5400 },
    { name: "Jun", Sales: 2390, Revenue: 3800, Custom: 8009 },
  ];

  const pieChartData = [
    {
      name: "Sales",
      value: lineData.reduce((sum, item) => sum + item.Sales, 0),
      color: "#3b82f6",
    },
    {
      name: "Revenue",
      value: lineData.reduce((sum, item) => sum + item.Revenue, 0),
      color: "#10b981",
    },
    {
      name: "Custom",
      value: lineData.reduce((sum, item) => sum + item.Custom, 0),
      color: "#ffa981",
    },
    {
      name: "Purchase",
      value: 9776,
      color: '#ffa765'
    }
  ];

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      {/* First Row: Two Line Charts */}
      <div className="flex gap-4">
        <div className="h-[50vh] p-4 w-1/2 shadow-xl rounded-xl">
          <h1 className="mb-2 font-semibold text-lg">Sales Reports</h1>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="Sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[50vh] p-4 w-1/2 shadow-xl rounded-xl">
          <h1 className="mb-2 font-semibold text-lg">Sales Reports</h1>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="Sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Custom"
                stroke="#ffa981"
                strokeWidth={2}
                dot={{ fill: "#ffa981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row: Pie Chart */}
      <div className="flex gap-4">
        <div className="h-[50vh] p-4 w-1/2 shadow-xl rounded-xl">
          <h1 className="mb-2 font-semibold text-lg">Sales Distribution</h1>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[50vh] p-4 w-1/2 shadow-xl rounded-xl">
          <h1 className="mb-2 font-semibold text-lg">Sales Distribution</h1>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "red",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
