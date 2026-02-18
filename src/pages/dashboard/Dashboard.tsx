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
      title: "Peringatan Stok Rendah",
      message: "Produk 'Lampu' stok hampir habis (5 unit)",
      time: "2 jam yang lalu",
    },
    {
      id: 2,
      type: "info",
      icon: FaInfoCircle,
      title: "Pesanan Baru",
      message: "Pesanan #ORD-006 telah dibuat",
      time: "3 jam yang lalu",
    },
    {
      id: 3,
      type: "success",
      icon: FaCheckCircle,
      title: "Pengiriman Terkirim",
      message: "Pengiriman #SHP-003 telah terkirim",
      time: "5 jam yang lalu",
    },
    {
      id: 4,
      type: "warning",
      icon: FaExclamationTriangle,
      title: "Pembayaran Tertunda",
      message: "Pembayaran pesanan #ORD-004 tertunda",
      time: "1 hari yang lalu",
    },
  ];

  const orders = [
    {
      id: 1,
      orderId: "#ORD-008",
      customerName: "Sarah Johnson",
      productName: "Lampu",
      totalPrice: "Rp 10,500",
      status: "menunggu",
      time: "5 menit yang lalu",
    },
    {
      id: 2,
      orderId: "#ORD-009",
      customerName: "Michael Chen",
      productName: "Kabel",
      totalPrice: "Rp 22,000,000",
      status: "diproses",
      time: "15 menit yang lalu",
    },
    {
      id: 3,
      orderId: "#ORD-010",
      customerName: "Emma Wilson",
      productName: "Kulkas",
      totalPrice: "Rp 14,500,000",
      status: "dikonfirmasi",
      time: "30 menit yang lalu",
    },
    {
      id: 4,
      orderId: "#ORD-011",
      customerName: "David Martinez",
      productName: "Lampu LED",
      totalPrice: "Rp 35,000,000",
      status: "menunggu",
      time: "1 jam yang lalu",
    },
  ];

  const liveTracking = [
    {
      id: 1,
      type: "shipment",
      title: "Pengiriman #SHP-005",
      status: "Dalam Perjalanan",
      location: "Jakarta - Bandung",
      progress: 65,
    },
    {
      id: 2,
      type: "order",
      title: "Pesanan #ORD-007",
      status: "Diproses",
      location: "Gudang",
      progress: 40,
    },
    {
      id: 3,
      type: "shipment",
      title: "Pengiriman #SHP-006",
      status: "Sudah Diambil",
      location: "Hub Surabaya",
      progress: 25,
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar
        menuItems={menuItems}
        logo="PrimeLight"
        onLogout={handleLogout}
      />

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
                  <h3>Jumlah Produk</h3>
                  <p className="number">1,234</p>
                </div>
              </div>
              <div className="card orange">
                <div className="card-icon">
                  <FaShoppingCart />
                </div>
                <div className="card-info">
                  <h3>Pemesanan Hari Ini</h3>
                  <p className="number">56</p>
                </div>
              </div>
              <div className="card green">
                <div className="card-icon">
                  <FaTruck />
                </div>
                <div className="card-info">
                  <h3>Pengiriman Aktif</h3>
                  <p className="number">23</p>
                </div>
              </div>
            </div>

            <div className="orders-section">
              <div className="section-header">
                <h2>Pesanan Terbaru</h2>
                <button className="view-all">Lihat Semua</button>
              </div>

              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID Pemesanan</th>
                      <th>Nama Pelanggan</th>
                      <th>Nama Produk</th>
                      <th>Total Harga</th>
                      <th>Waktu Diinput</th>
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
                            {order.status.charAt(0) + order.status.slice(1)}
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
                <h2>Pelacakan Langsung</h2>
                <button className="view-all">Lihat Semua</button>
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
                          {track.progress}% Selesai
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="chart-section">
              <div className="section-header">
                <h2>Ringkasan Pendapatan</h2>
                <select className="chart-filter">
                  <option>7 Hari Terakhir</option>
                  <option>30 Hari Terakhir</option>
                  <option>90 Hari Terakhir</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="bar" style={{ height: "60%" }}>
                    <span>Senin</span>
                  </div>
                  <div className="bar" style={{ height: "80%" }}>
                    <span>Selasa</span>
                  </div>
                  <div className="bar" style={{ height: "45%" }}>
                    <span>Rabu</span>
                  </div>
                  <div className="bar" style={{ height: "90%" }}>
                    <span>Kamis</span>
                  </div>
                  <div className="bar" style={{ height: "70%" }}>
                    <span>Jumat</span>
                  </div>
                  <div className="bar" style={{ height: "55%" }}>
                    <span>Sabtu</span>
                  </div>
                  <div className="bar" style={{ height: "40%" }}>
                    <span>Minggu</span>
                  </div>
                </div>
                <p className="chart-label">Pendapatan Harian (Rp Juta)</p>
              </div>
            </div>
          </div>

          <div className="alerts-sidebar">
            <div className="alerts-header">
              <h3>Peringatan & Pemberitahuan</h3>
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

            <button className="view-all-alerts">Lihat Semua Notifikasi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
