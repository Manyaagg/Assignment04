import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";

const analyticsData = [
  { month: "Jan", value: 240 },
  { month: "Feb", value: 320 },
  { month: "Mar", value: 500 },
  { month: "Apr", value: 620 },
];

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [user, setUser] = useState(null);
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#f0f0f0";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setLiveData(data.slice(0, 4)));
  }, []);

  const login = () => setUser({ name: "Manya Aggarwal" });
  const logout = () => setUser(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>📊 Dashboard Overview</h1>
        <div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ marginRight: "10px" }}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {user ? (
            <button onClick={logout}>Logout ({user.name})</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: darkMode ? "#2c2c2c" : "#ffffff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>📈 Performance Overview</h2>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData}>
              <XAxis dataKey="month" stroke={darkMode ? "#ccc" : "#000"} />
              <YAxis stroke={darkMode ? "#ccc" : "#000"} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: darkMode ? "#2c2c2c" : "#ffffff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>📅 Events Calendar</h2>
        <p>Calendar integration goes here.</p>
        <p>Selected Date: {new Date().toDateString()}</p>
      </motion.div>

      <div style={{ backgroundColor: darkMode ? "#2c2c2c" : "#ffffff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>🗂️ Kanban Workflow</h2>
        <p>Track and manage your team tasks visually.</p>
        <button onClick={() => setShowKanban(!showKanban)}>
          {showKanban ? "Hide Kanban" : "Launch Kanban"}
        </button>
        <AnimatePresence>
          {showKanban && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: "10px", display: "flex", gap: "20px" }}>
              {["To Do", "In Progress", "Done"].map((col, index) => (
                <div key={index} style={{ flex: 1 }}>
                  <h4>{col}</h4>
                  <Draggable>
                    <div style={{ padding: "10px", backgroundColor: darkMode ? "#3c3c3c" : "#f9f9f9", margin: "5px 0" }}>
                      Task #{index + 1}
                    </div>
                  </Draggable>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: darkMode ? "#2c2c2c" : "#ffffff", padding: "20px", borderRadius: "8px" }}>
        <h2>👥 Team Members (Live)</h2>
        <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Username</th>
            </tr>
          </thead>
          <tbody>
            {liveData.map((u, idx) => (
              <tr key={idx} style={{ borderTop: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{u.name}</td>
                <td style={{ padding: "8px" }}>{u.email}</td>
                <td style={{ padding: "8px" }}>{u.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
