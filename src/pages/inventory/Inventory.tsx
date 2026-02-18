import Sidebar from "../../components/Sidebar/Sidebar";
import { menuItems } from "../../config/sidebarMenuConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaPlus,
  FaBox,
  FaSearch,
  FaTimes,
  FaCheck,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./Inventory.scss";

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: string;
  category?: string;
  description?: string;
}

function Inventory() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    sku: "",
    stock: 0,
    price: "",
    category: "",
    description: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Produk ${newProduct.name} berhasil ditambahkan!`);
    setShowAddModal(false);
    setNewProduct({
      id: "",
      name: "",
      sku: "",
      stock: 0,
      price: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="inventory-layout">
      <Sidebar menuItems={menuItems} logo="PrimeLight" onLogout={handleLogout} />
      <div className="inventory-content">
        <div className="inventory-header">
          <div className="header-icon">
            <FaBox />
          </div>
          <div>
            <h1>Inventory Management</h1>
            <p>Kelola stok barang Anda</p>
          </div>
        </div>

        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={handleAddProduct}>
            <FaPlus />
            <span>Tambah Barang</span>
          </button>
        </div>

        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lampu</td>
                <td>SKU-001</td>
                <td>100</td>
                <td>Rp 50,000</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="action-buttons">
                    <button className="btn-view" title="View Product">
                      <FaEye />
                    </button>
                    <button className="btn-edit" title="Edit Product">
                      <FaEdit />
                    </button>
                    <button className="btn-delete" title="Delete Product">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Kabel</td>
                <td>SKU-001</td>
                <td>100</td>
                <td>Rp 50,000</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="action-buttons">
                    <button className="btn-view" title="View Product">
                      <FaEye />
                    </button>
                    <button className="btn-edit" title="Edit Product">
                      <FaEdit />
                    </button>
                    <button className="btn-delete" title="Delete Product">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {showAddModal && (
            <div
              className="modal-overlay"
              onClick={() => {
                setShowAddModal(false);
                setNewProduct({
                  id: "",
                  name: "",
                  sku: "",
                  stock: 0,
                  price: "",
                  category: "",
                  description: "",
                });
              }}
            >
              <div
                className="modal-content add-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Tambah Produk Baru</h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setNewProduct({
                        id: "",
                        name: "",
                        sku: "",
                        stock: 0,
                        price: "",
                        category: "",
                        description: "",
                      });
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct}>
                  <div className="modal-body">
                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          Nama Produk <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan nama produk..."
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          SKU <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan SKU..."
                          value={newProduct.sku}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              sku: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          Stok <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: parseInt(e.target.value) || 0,
                            })
                          }
                          min="0"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Harga <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Rp 0"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Kategori</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="elektronik">Elektronik</option>
                        <option value="furniture">Furniture</option>
                        <option value="fashion">Fashion</option>
                        <option value="makanan">Makanan</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea
                        placeholder="Masukkan deskripsi produk..."
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setShowAddModal(false);
                        setNewProduct({
                          id: "",
                          name: "",
                          sku: "",
                          stock: 0,
                          price: "",
                          category: "",
                          description: "",
                        });
                      }}
                    >
                      Batal
                    </button>
                    <button type="submit" className="btn-save">
                      <FaCheck />
                      <span>Simpan Produk</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
