import Sidebar from "../../components/Sidebar/Sidebar";
import { menuItems } from "../../config/sidebarMenuConfig";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaClipboardList,
  FaPrint,
  FaEdit,
  FaFileExport,
  FaFilter,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useState } from "react";
import * as XLSX from "xlsx";
import "./Orders.scss";

type OrderStatus =
  | "semua"
  | "menunggu"
  | "diproses"
  | "akan dikirim"
  | "dikirim"
  | "selesai"
  | "dibatalkan";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  paymentStatus: "lunas" | "belum-bayar";
  shippingStatus:
    | "menunggu"
    | "diproses"
    | "dikirim"
    | "selesai"
    | "dibatalkan";
  courier: string;
  products: string[];
  resi?: string;
}

function Orders() {
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("semua");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // dummy data
  const allOrders: Order[] = [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      date: "2024-02-10",
      total: "Rp 500,000",
      paymentStatus: "belum-bayar",
      shippingStatus: "menunggu",
      courier: "JNE",
      products: ["Kulkas", "Lampu"],
    },
    {
      id: "ORD-002",
      customer: "Siti Nurhaliza",
      date: "2024-02-10",
      total: "Rp 750,000",
      paymentStatus: "lunas",
      shippingStatus: "diproses",
      courier: "GoSend",
      products: ["Kompor", "Kulkas mini"],
      resi: "",
    },
    {
      id: "ORD-003",
      customer: "Ahmad Wijaya",
      date: "2024-02-09",
      total: "Rp 1,200,000",
      paymentStatus: "lunas",
      shippingStatus: "dikirim",
      courier: "JNE",
      products: ["Microwave", "Blender"],
      resi: "JNE123456789",
    },
    {
      id: "ORD-004",
      customer: "Dewi Lestari",
      date: "2024-02-09",
      total: "Rp 350,000",
      paymentStatus: "lunas",
      shippingStatus: "selesai",
      courier: "TIKI",
      products: ["Stop Kontak", "Kabel Extension"],
      resi: "TIKI987654321",
    },
    // {
    //   id: "ORD-005",
    //   customer: "Rina Susanti",
    //   date: "2024-02-08",
    //   total: "Rp 890,000",
    //   paymentStatus: "lunas",
    //   shippingStatus: "dibatalkan",
    //   courier: "SiCepat",
    //   products: ["Koleksi Teh"],
    // },
  ];

  const filterOrdersByStatus = (
    orders: Order[],
    status: OrderStatus
  ): Order[] => {
    switch (status) {
      case "semua":
        return orders;
      case "menunggu":
        return orders.filter((o) => o.shippingStatus === "menunggu");
      case "diproses":
        return orders.filter(
          (o) => o.paymentStatus === "lunas" && o.shippingStatus === "diproses"
        );
      case "akan dikirim":
        return orders.filter(
          (o) =>
            o.paymentStatus === "lunas" &&
            o.shippingStatus === "diproses" &&
            !o.resi
        );
      case "dikirim":
        return orders.filter((o) => o.shippingStatus === "dikirim");
      case "selesai":
        return orders.filter((o) => o.shippingStatus === "selesai");
      case "dibatalkan":
        return orders.filter((o) => o.shippingStatus === "dibatalkan");
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrdersByStatus(allOrders, statusFilter);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const handlePrintSelected = () => {
    alert(`Mencetak ${selectedOrders.length} pesanan`);
  };

  const handlePrintOrder = (orderId: string) => {
    alert(`Mencetak invoice ${orderId}`);
  };

  const handleEditOrder = (orderId: string) => {
    const order = allOrders.find((o) => o.id === orderId);
    if (order) {
      setEditOrder({ ...order });
      setShowEditModal(true);
    }
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
    setEditOrder(null);
  };

  const handleExport = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Date",
      "Products",
      "Total",
      "Payment Status",
      "Shipping Status",
      "Courier",
      "Resi",
    ];

    const body = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.date,
      order.products.join("; "),
      order.total,
      order.paymentStatus === "lunas" ? "Lunas" : "Belum Bayar",
      order.shippingStatus === "menunggu"
        ? "Menunggu"
        : order.shippingStatus === "diproses"
        ? "Diproses"
        : order.shippingStatus === "dikirim"
        ? "Dikirim"
        : order.shippingStatus === "selesai"
        ? "Selesai"
        : "Dibatalkan",
      order.courier,
      order.resi || "-",
    ]);
    const wb = XLSX.utils.book_new();
    const wsData = [headers, ...body];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `Orders_${currentDate}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="orders-layout">
      <Sidebar
        menuItems={menuItems}
        logo="PrimeLight"
        onLogout={handleLogout}
      />
      <div className="orders-content">
        <div className="orders-header">
          <div className="header-icon">
            <FaClipboardList />
          </div>
          <div>
            <h1>Orders Management</h1>
            <p>Kelola semua pesanan pelanggan</p>
          </div>
        </div>

        <div className="table-controls">
          <div className="left-controls">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Cari..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-filter">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
              >
                <option value="semua">Semua Status</option>
                <option value="menunggu">Menunggu</option>
                <option value="diproses">Diproses</option>
                <option value="akan dikirim">Akan Dikirim</option>
                <option value="dikirim">Dikirim</option>
                <option value="selesai">Selesai</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
            </div>
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              <span>Filter Lanjutan</span>
            </button>
          </div>
          <div className="right-controls">
            {selectedOrders.length > 0 && (
              <button className="bulk-print" onClick={handlePrintSelected}>
                <FaPrint />
                <span>Cetak {selectedOrders.length} Resi</span>
              </button>
            )}
            <button className="export-button" onClick={handleExport}>
              <FaFileExport />
              <span>Export</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Tanggal:</label>
              <input type="date" />
              <span>sampai</span>
              <input type="date" />
            </div>
            <div className="filter-group">
              <label>Kurir:</label>
              <select>
                <option value="">Semua Kurir</option>
                <option value="jne">JNE</option>
                <option value="gosend">GoSend</option>
                <option value="tiki">TIKI</option>
                <option value="sicepat">SiCepat</option>
              </select>
            </div>
            <button className="apply-filter">Terapkan Filter</button>
          </div>
        )}

        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID Pemesanan</th>
                <th>Pelanggan</th>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Pembayaran</th>
                <th>Pengiriman</th>
                <th>Kurir</th>
                <th>Resi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleViewDetail(order)}
                    className="clickable"
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="order-id">#{order.id}</td>
                    <td>
                      <div className="customer-info">
                        <span>{order.customer}</span>
                      </div>
                    </td>
                    <td className="products">{order.products.join(", ")}</td>
                    <td className="total">{order.total}</td>
                    <td>
                      <span className={`payment-status ${order.paymentStatus}`}>
                        {order.paymentStatus === "lunas"
                          ? "Lunas"
                          : "Belum Bayar"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`shipping-status ${order.shippingStatus}`}
                      >
                        {order.shippingStatus === "menunggu" && "Menunggu"}
                        {order.shippingStatus === "diproses" && "Diproses"}
                        {order.shippingStatus === "dikirim" && "Dikirim"}
                        {order.shippingStatus === "selesai" && "Selesai"}
                        {order.shippingStatus === "dibatalkan" && "Dibatalkan"}
                      </span>
                    </td>
                    <td>{order.courier}</td>
                    <td className="resi">
                      {order.resi || <span className="no-resi">-</span>}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons">
                        <button
                          className="btn-print"
                          onClick={() => handlePrintOrder(order.id)}
                          title="Print Invoice"
                        >
                          <FaPrint />
                        </button>
                        <button
                          className="btn-edit"
                          onClick={() => handleEditOrder(order.id)}
                          title="Edit Order"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-data-row">
                  <td colSpan={10}>
                    <div className="no-data">
                      <p>No data found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showEditModal && editOrder && (
          <div
            className="modal-overlay"
            onClick={() => {
              setShowEditModal(false);
              setEditOrder(null);
            }}
          >
            <div
              className="modal-content edit-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Edit Order #{editOrder.id}</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditOrder(null);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Order ID:</label>
                    <input type="text" value={editOrder.id} disabled />
                  </div>
                  <div className="form-group">
                    <label>Tanggal:</label>
                    <input
                      type="date"
                      value={editOrder.date}
                      onChange={(e) =>
                        setEditOrder({ ...editOrder, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Nama Customer:</label>
                  <input
                    type="text"
                    value={editOrder.customer}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, customer: e.target.value })
                    }
                    placeholder="Masukkan nama customer..."
                  />
                </div>

                <div className="form-group">
                  <label>Produk:</label>
                  <textarea
                    value={editOrder.products.join(", ")}
                    onChange={(e) =>
                      setEditOrder({
                        ...editOrder,
                        products: e.target.value
                          .split(",")
                          .map((p) => p.trim()),
                      })
                    }
                    placeholder="Pisahkan dengan koma..."
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total:</label>
                    <input
                      type="text"
                      value={editOrder.total}
                      onChange={(e) =>
                        setEditOrder({ ...editOrder, total: e.target.value })
                      }
                      placeholder="Rp 0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Kurir:</label>
                    <select
                      value={editOrder.courier}
                      onChange={(e) =>
                        setEditOrder({ ...editOrder, courier: e.target.value })
                      }
                    >
                      <option value="JNE">JNE</option>
                      <option value="GoSend">GoSend</option>
                      <option value="TIKI">TIKI</option>
                      <option value="SiCepat">SiCepat</option>
                      <option value="J&T">J&T</option>
                      <option value="AnterAja">AnterAja</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status Pembayaran:</label>
                    <select
                      value={editOrder.paymentStatus}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          paymentStatus: e.target.value as
                            | "lunas"
                            | "belum-bayar",
                        })
                      }
                    >
                      <option value="unpaid">Belum Bayar</option>
                      <option value="paid">Lunas</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status Pengiriman:</label>
                    <select
                      value={editOrder.shippingStatus}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          shippingStatus: e.target
                            .value as Order["shippingStatus"],
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Diproses</option>
                      <option value="shipped">Dikirim</option>
                      <option value="delivered">Diterima</option>
                      <option value="cancelled">Dibatalkan</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nomor Resi:</label>
                  <input
                    type="text"
                    value={editOrder.resi || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, resi: e.target.value })
                    }
                    placeholder="Masukkan nomor resi..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditOrder(null);
                  }}
                >
                  Batal
                </button>
                <button className="btn-save" onClick={handleSaveEdit}>
                  <FaCheck />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div
              className="modal-content detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Detail Pesanan #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="detail-section">
                  <h4>Timeline Status</h4>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-dot"></div>
                      <div className="timeline-info">
                        <strong>Order Masuk</strong>
                        <span>10:00 - {selectedOrder.date}</span>
                      </div>
                    </div>
                    <div className="timeline-item completed">
                      <div className="timeline-dot"></div>
                      <div className="timeline-info">
                        <strong>Pembayaran Diterima</strong>
                        <span>10:15 - {selectedOrder.date}</span>
                      </div>
                    </div>
                    <div className="timeline-item active">
                      <div className="timeline-dot"></div>
                      <div className="timeline-info">
                        <strong>Sedang Dikemas</strong>
                        <span>11:00 - {selectedOrder.date}</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-info">
                        <strong>Menunggu Pickup</strong>
                        <span>-</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Internal Note</h4>
                  <textarea
                    placeholder="Tambahkan catatan internal (hanya admin yang bisa lihat)..."
                    rows={5}
                  ></textarea>
                </div>

                <div className="detail-section">
                  <h4>Bukti Pembayaran</h4>
                  <div className="payment-proof">
                    <img
                      src="https://via.placeholder.com/300x200"
                      alt="Bukti Transfer"
                    />
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Status Stok</h4>
                  <div className="stock-info">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="stock-item">
                        <span className="product-name">{product}</span>
                        <div className="stock-details">
                          <span>
                            Stok Gudang: <strong>50</strong>
                          </span>
                          <span>
                            Pesanan Ini: <strong>2</strong>
                          </span>
                          <span>
                            Sisa:{" "}
                            <strong className="stock-remaining">48</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-cancel"
                  onClick={() => setSelectedOrder(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
