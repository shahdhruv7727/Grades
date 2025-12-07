import { useState, useMemo, useEffect } from "react";
import {
  FaChartBar,
  FaCreditCard,
  FaDownload,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaPlus,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { SendGETRequest } from "../services/SendGETRequest";
import { API } from "../API/api";
import AddPayment from "../components/Modals/AddPayment";

// ✅ Subcomponent: Fees Analysis Section
const FeesAnalysis = ({ chartData, collectionfees  }) => {
  const PieData = [
    { category: "Tuition Fees", value: 5000 },
    { category: "Transportation", value: 1200 },
    { category: "Stationery", value: 800 },
    { category: "Miscellaneous", value: 600 },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // Distance of label from pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const color = chartData[index].color;

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${PieData[index].category} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Fees Collected</p>
            <p className="text-2xl font-bold">₹25,000</p>
          </div>
          <FaMoneyBillWave className="w-8 h-8 text-blue-200" />
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Expenses</p>
            <p className="text-2xl font-bold">₹12,000</p>
          </div>
          <FaCreditCard className="w-8 h-8 text-green-200" />
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Pending Fees</p>
            <p className="text-2xl font-bold">₹4,500</p>
          </div>
          <FaFileInvoiceDollar className="w-8 h-8 text-purple-200" />
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Monthly Growth</p>
            <p className="text-2xl font-bold">+15%</p>
          </div>
          <FaChartBar className="w-8 h-8 text-orange-200" />
        </div>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Chart 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Financial Overview
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fees" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Expense Overwiew
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fees" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expense Breakdown
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                <Pie
                  data={PieData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4f46e5"
                  labelLine={true}
                  label={renderCustomizedLabel}
                >
                  {PieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#4f46e5", "#10b981", "#f97316", "#ef4444"][index % 4]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
         <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Income Breakdown
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={collectionfees}>
                <XAxis dataKey={"month"}/>
                <Tooltip />
                {/* <CartesianGrid stroke="#4f46e5"/> */}
                <Line  type={"dualtone"} dataKey={"totalCollected"}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Subcomponent: Listing Table Section
const FeesListing = ({
  filteredTransactions,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  handleSort,
  getSortIcon,
}) => {
  return (
    <div className="space-y-6">
      {/* Search + Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort("student")}
                    className="flex items-center justify-center gap-1 w-full"
                  >
                    Student {getSortIcon("student")}
                  </button>
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{t.student}</td>
                  <td className="px-6 py-4">{t.class}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {t.amount}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{t.date}</td>
                  <td className="px-6 py-4">{t.mode}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ✅ Main Component
const FeesFinances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("student");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");
  const [view, setView] = useState("analysis"); // 👈 toggle view
  const [collectionfees, setCollectionFees] = useState();
  const [open , setOpen] = useState(false);

  async function getFeesCollection() {
    const fees = await SendGETRequest(API.Fees);
    fees && setCollectionFees(fees?.data?.data);
  }

  useEffect(() => {
    getFeesCollection();
  }, []);

  const [transactions] = useState([
    {
      id: 1,
      student: "Aarav Shah",
      class: "10th",
      amount: "₹1500",
      date: "2025-11-01",
      status: "Paid",
      mode: "Online",
    },
    {
      id: 2,
      student: "Riya Patel",
      class: "9th",
      amount: "₹1200",
      date: "2025-10-20",
      status: "Pending",
      mode: "Cash",
    },
    {
      id: 3,
      student: "Dev Mehta",
      class: "8th",
      amount: "₹1800",
      date: "2025-09-28",
      status: "Paid",
      mode: "UPI",
    },
  ]);

  const chartData = [
    { month: "Jan", fees: 8000, expenses: 4000 },
    { month: "Feb", fees: 7500, expenses: 3000 },
    { month: "Mar", fees: 9000, expenses: 3500 },
    { month: "Apr", fees: 8500, expenses: 4000 },
    { month: "May", fees: 9500, expenses: 4500 },
  ];

  const handleSort = (field) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else setSortField(field), setSortDirection("asc");
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="text-blue-500" />
    ) : (
      <FaSortDown className="text-blue-500" />
    );
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchesSearch = t.student
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || t.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    return filtered;
  }, [transactions, searchTerm, sortField, sortDirection, filterStatus]);

  const labels = collectionfees?.map((item) => item.month);
  const totalCollected = collectionfees?.map((item) => item.totalCollected);
  const noOfTransactions = collectionfees?.map((item) => item.transactions);

  const handleOpenPayment = () => { setOpen(true) };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fees & Finances
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage student fee payments and expenses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
              <FaDownload className="inline mr-2" />
              Export
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition" onClick={handleOpenPayment}>
              <FaPlus className="inline mr-2" />
              Add Payment
            </button>
            <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
              <FaPlus className="inline mr-2" />
              Add Expense
            </button>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="flex w-full gap-3 mt-4">
          <button
            onClick={() => setView("analysis")}
            className={`w-1/2 px-5 py-3 rounded-lg font-medium transition-all duration-300 border ${
              view === "analysis"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Analysis
          </button>

          <button
            onClick={() => setView("listing")}
            className={`w-1/2 px-5 py-3 rounded-lg font-medium transition-all duration-300 border ${
              view === "listing"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Transactions
          </button>
        </div>

        {/* Conditional Section */}
        {view === "analysis" ? (
          <FeesAnalysis chartData={chartData} collectionfees={collectionfees} />
        ) : (
          <FeesListing
            filteredTransactions={filteredTransactions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
          />
        )}
      </div>
      {open && <AddPayment isOpen={open} setIsOpen={setOpen} />}
    </div>
  );
};

export default FeesFinances;
