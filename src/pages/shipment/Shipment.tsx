import Sidebar from "../../components/Sidebar/Sidebar";
import { menuItems } from "../../config/sidebarMenuConfig";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaTruck } from "react-icons/fa";
import "./Shipment.scss";

function Shipment() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleAddShipment = () => {
    console.log("Tambah shipment baru");
  };

  const handleViewShipment = (shipmentId: string) => {
    console.log("View shipment:", shipmentId);
  };

  const handleEditShipment = (shipmentId: string) => {
    console.log("Edit shipment:", shipmentId);
  };

  const handleDeleteShipment = (shipmentId: string) => {
    console.log("Delete shipment:", shipmentId);
  };

  return (
    <div className="shipment-layout">
      <Sidebar menuItems={menuItems} logo="PrimeLight" onLogout={handleLogout} />
      <div className="shipment-content">
        <div className="shipment-header">
          <div className="header-icon">
            <FaTruck />
          </div>
          <div>
            <h1>Shipment Management</h1>
            <p>Kelola pengiriman barang</p>
          </div>
        </div>

        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Cari shipment..." />
          </div>
          <button className="add-button" onClick={handleAddShipment}>
            <FaPlus />
            <span>Tambah Shipment</span>
          </button>
        </div>

        <div className="shipment-table">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Courier</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#SHP-001</td>
                <td>#ORD-001</td>
                <td>John Doe</td>
                <td>Jakarta</td>
                <td>JNE</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
                <td>
                  <button onClick={() => handleViewShipment("001")}>
                    View
                  </button>
                  <button onClick={() => handleEditShipment("001")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment("001")}>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>#SHP-002</td>
                <td>#ORD-002</td>
                <td>Jane Smith</td>
                <td>Bandung</td>
                <td>TIKI</td>
                <td>
                  <span className="status in-transit">In Transit</span>
                </td>
                <td>
                  <button onClick={() => handleViewShipment("002")}>
                    View
                  </button>
                  <button onClick={() => handleEditShipment("002")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment("002")}>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>#SHP-003</td>
                <td>#ORD-003</td>
                <td>Bob Johnson</td>
                <td>Surabaya</td>
                <td>SiCepat</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
                <td>
                  <button onClick={() => handleViewShipment("003")}>
                    View
                  </button>
                  <button onClick={() => handleEditShipment("003")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment("003")}>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>#SHP-004</td>
                <td>#ORD-004</td>
                <td>Alice Brown</td>
                <td>Medan</td>
                <td>J&T</td>
                <td>
                  <span className="status processing">Processing</span>
                </td>
                <td>
                  <button onClick={() => handleViewShipment("004")}>
                    View
                  </button>
                  <button onClick={() => handleEditShipment("004")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment("004")}>
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>#SHP-005</td>
                <td>#ORD-005</td>
                <td>Charlie Wilson</td>
                <td>Yogyakarta</td>
                <td>Pos Indonesia</td>
                <td>
                  <span className="status returned">Returned</span>
                </td>
                <td>
                  <button onClick={() => handleViewShipment("005")}>
                    View
                  </button>
                  <button onClick={() => handleEditShipment("005")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteShipment("005")}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Shipment;
