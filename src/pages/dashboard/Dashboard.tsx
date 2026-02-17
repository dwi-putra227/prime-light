import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { menuItems } from "../../config/sidebarMenuConfig";
import "./Dashboard.scss";
import {
  FaHome,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaTruck,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const alerts = [
    {
      id: 1,
      type: "warning",
      icon: FaExclamationTriangle,
      title: "Low Stock Alert",
      message: "Product 'Lampu' stock is running low (5 units)",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      icon: FaInfoCircle,
      title: "New Order",
      message: "Order #ORD-006 has been placed",
      time: "3 hours ago",
    },
    {
      id: 3,
      type: "success",
      icon: FaCheckCircle,
      title: "Shipment Delivered",
      message: "Shipment #SHP-003 has been delivered",
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "warning",
      icon: FaExclamationTriangle,
      title: "Payment Pending",
      message: "Order #ORD-004 payment is pending",
      time: "1 day ago",
    },
  ];

  const orders = [
    {
      id: 1,
      orderId: "#ORD-008",
      customerName: "Sarah Johnson",
      productName: "Lampu",
      totalPrice: "Rp 10,500",
      status: "pending",
      time: "5 mins ago",
    },
    {
      id: 2,
      orderId: "#ORD-009",
      customerName: "Michael Chen",
      productName: "Kabel",
      totalPrice: "Rp 22,000,000",
      status: "processing",
      time: "15 mins ago",
    },
    {
      id: 3,
      orderId: "#ORD-010",
      customerName: "Emma Wilson",
      productName: "Kulkas",
      totalPrice: "Rp 14,500,000",
      status: "confirmed",
      time: "30 mins ago",
    },
    {
      id: 4,
      orderId: "#ORD-011",
      customerName: "David Martinez",
      productName: "Lampu LED",
      totalPrice: "Rp 35,000,000",
      status: "pending",
      time: "1 hour ago",
    },
  ];

  const liveTracking = [
    {
      id: 1,
      type: "shipment",
      title: "Shipment #SHP-005",
      status: "In Transit",
      location: "Jakarta - Bandung",
      progress: 65,
    },
    {
      id: 2,
      type: "order",
      title: "Order #ORD-007",
      status: "Processing",
      location: "Warehouse",
      progress: 40,
    },
    {
      id: 3,
      type: "shipment",
      title: "Shipment #SHP-006",
      status: "Picked Up",
      location: "Surabaya Hub",
      progress: 25,
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar menuItems={menuItems} logo="PrimeLight" onLogout={handleLogout} />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-icon">
            <FaHome />
          </div>
          <div>
            <h1>Dashboard</h1>
            <p>Selamat datang di Inventory System!</p>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="main-content">
            <div className="dashboard-cards">
              <div className="card blue">
                <div className="card-icon">
                  <FaBox />
                </div>
                <div className="card-info">
                  <h3>Total Products</h3>
                  <p className="number">1,234</p>
                </div>
              </div>
              <div className="card orange">
                <div className="card-icon">
                  <FaShoppingCart />
                </div>
                <div className="card-info">
                  <h3>Orders Today</h3>
                  <p className="number">56</p>
                </div>
              </div>
              <div className="card green">
                <div className="card-icon">
                  <FaTruck />
                </div>
                <div className="card-info">
                  <h3>Active Shipments</h3>
                  <p className="number">23</p>
                </div>
              </div>
            </div>

            <div className="orders-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="view-all">View All</button>
              </div>

              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th>Product Name</th>
                      <th>Total Price</th>
                      <th>Insert Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id">{order.orderId}</td>
                        <td>{order.customerName}</td>
                        <td>{order.productName}</td>
                        <td className="price">{order.totalPrice}</td>
                        <td className="time">{order.time}</td>
                        <td>
                          <span className={`status-badge ${order.status}`}>
                            {order.status.charAt(0) +
                              order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="live-tracking-section">
              <div className="section-header">
                <h2>Live Tracking</h2>
                <button className="view-all">View All</button>
              </div>

              <div className="tracking-list">
                {liveTracking.map((track) => {
                  return (
                    <div key={track.id} className="tracking-item">
                      <div className="tracking-info">
                        <div className="tracking-header">
                          <h4>{track.title}</h4>
                          <span
                            className={`status ${track.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {track.status}
                          </span>
                        </div>
                        <p>{track.location}</p>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${track.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {track.progress}% Complete
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="chart-section">
              <div className="section-header">
                <h2>Revenue Overview</h2>
                <select className="chart-filter">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="bar" style={{ height: "60%" }}>
                    <span>Mon</span>
                  </div>
                  <div className="bar" style={{ height: "80%" }}>
                    <span>Tue</span>
                  </div>
                  <div className="bar" style={{ height: "45%" }}>
                    <span>Wed</span>
                  </div>
                  <div className="bar" style={{ height: "90%" }}>
                    <span>Thu</span>
                  </div>
                  <div className="bar" style={{ height: "70%" }}>
                    <span>Fri</span>
                  </div>
                  <div className="bar" style={{ height: "55%" }}>
                    <span>Sat</span>
                  </div>
                  <div className="bar" style={{ height: "40%" }}>
                    <span>Sun</span>
                  </div>
                </div>
                <p className="chart-label">Daily Revenue (Rp Million)</p>
              </div>
            </div>
          </div>

          <div className="alerts-sidebar">
            <div className="alerts-header">
              <h3>Alerts & Notifications</h3>
              <span className="badge">{alerts.length}</span>
            </div>

            <div className="alerts-list">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className={`alert-item ${alert.type}`}>
                    <div className="alert-icon">
                      <Icon />
                    </div>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.message}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="view-all-alerts">View All Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
