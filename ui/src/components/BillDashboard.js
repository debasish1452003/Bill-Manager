import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBill,
  deleteBill,
  filterBills,
  highlightBills,
} from "../redux/actions/billActions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// import "./BillDashboard.css";
import "./latest.css";
import "./BD.css";

const BillDashboard = () => {
  const dispatch = useDispatch();

  const {
    list: bills = [],
    filteredList: filteredBills = [],
    totalAmount = 0,
    monthlyBudget = 50000,
    highlightedList: highlightedBills = [],
  } = useSelector((state) => state.bills || {});

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (bills.length && monthlyBudget > 0) {
      dispatch(highlightBills());
    }
  }, [bills, monthlyBudget, dispatch]);

  const handleAddBill = (newBill) => {
    dispatch(addBill(newBill));
    setShowAddModal(false);
  };

  const handleDeleteBill = (id) => {
    dispatch(deleteBill(id));
  };

  const handleFilter = (e) => {
    dispatch(filterBills(e.target.value));
  };

  const chartData = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((entry) => entry.month === month);
    if (existing) {
      existing.amount += parseFloat(bill.amount);
    } else {
      acc.push({ month, amount: parseFloat(bill.amount) });
    }
    return acc;
  }, []);

  return (
    <div
      className={`bill-dashboard ${
        totalAmount > monthlyBudget ? "dark-mode" : "light-mode"
      }`}
    >
      <header className="dashboard-header">
        <h1>Adithya's Bill Manager</h1>
        <button
          className="primary-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Bill
        </button>
      </header>

      <section className="dashboard-summary">
        <p>
          Total Monthly Billed Amount: <span>₹{totalAmount.toFixed(2)}</span>
        </p>
        <p>
          Monthly Budget: <span>₹{monthlyBudget.toFixed(2)}</span>
        </p>
      </section>

      <section className="dashboard-controls">
        <label htmlFor="filter">Filter by Category:</label>
        <select id="filter" onChange={handleFilter} className="styled-select">
          <option value="">All</option>
          {[...new Set(bills.map((bill) => bill.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>

      <section className="bill-list">
        {filteredBills.map((bill) => (
          <div
            key={bill.id}
            className={`bill-item ${
              highlightedBills.some((b) => b.id === bill.id)
                ? "highlighted"
                : ""
            }`}
          >
            <p>{bill.description}</p>
            <p>₹{bill.amount.toFixed(2)}</p>
            <p>{bill.category}</p>
            <p>{bill.date}</p>
            <button
              className="delete-button"
              onClick={() => handleDeleteBill(bill.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      <section className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6200ea"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {showAddModal && (
        <AddBillModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBill}
        />
      )}
    </div>
  );
};

const AddBillModal = ({ onClose, onAdd }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (description && category && !isNaN(amount) && date) {
      onAdd({
        id: Date.now(),
        description,
        category,
        amount: parseFloat(amount),
        date,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Bill</h2>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />
        <div className="modal-actions">
          <button className="primary-button" onClick={handleSubmit}>
            Add
          </button>
          <button className="secondary-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDashboard;
