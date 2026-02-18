import Sidebar from "../../components/Sidebar/Sidebar";
import { menuItems } from "../../config/sidebarMenuConfig";
import { useNavigate } from "react-router-dom";
import { FaCog, FaUser, FaBell, FaLock } from "react-icons/fa";
import { useState } from "react";
import "./Settings.scss";

function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save profile");
    alert("Profile updated successfully!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save password");
    alert("Password updated successfully!");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save notifications");
    alert("Notification settings updated!");
  };

  return (
    <div className="settings-layout">
      <Sidebar menuItems={menuItems} logo="PrimeLight" />
      <div className="settings-content">
        <div className="settings-header">
          <div className="header-icon">
            <FaCog />
          </div>
          <div>
            <h1>Settings</h1>
            <p>Atur preferensi sistem Anda</p>
          </div>
        </div>

        <div className="settings-container">
          <div className="settings-tabs">
            <button
              className={`tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser />
              <span>Profile</span>
            </button>
            <button
              className={`tab ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <FaLock />
              <span>Security</span>
            </button>
            <button
              className={`tab ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <FaBell />
              <span>Notifications</span>
            </button>
          </div>

          <div className="settings-panel">
            {activeTab === "profile" && (
              <div className="panel-content">
                <h2>Profile Settings</h2>
                <p className="panel-description">
                  Perbarui informasi pribadi Anda
                </p>

                <form onSubmit={handleSaveProfile}>
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" placeholder="Enter your full name" />
                  </div>

                  <div className="form-group">
                    <label>Alamat Email</label>
                    <input type="email" placeholder="Enter your email" />
                  </div>

                  <div className="form-group">
                    <label>Nomor Telepon</label>
                    <input type="tel" placeholder="Enter your phone number" />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="panel-content">
                <h2>Security Settings</h2>
                <p className="panel-description">
                  Kelola kata sandi dan preferensi keamanan Anda
                </p>

                <form onSubmit={handleSavePassword}>
                  <div className="form-group">
                    <label>Passowrd Saat Ini</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password Baru</label>
                    <input type="password" placeholder="Enter password baru" />
                  </div>

                  <div className="form-group">
                    <label>Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      placeholder="Konfirmasi password baru"
                    />
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>Aktifkan Otentikasi Dua Faktor (2FA)</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Keluar dari perangkat lain</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <div>
                      <button type="submit" className="btn-save">
                        Perbarui Password
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="logout-button"
                      >
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="panel-content">
                <h2>Notification Settings</h2>
                <p className="panel-description">
                  Pilih notifikasi yang ingin Anda terima.
                </p>

                <form onSubmit={handleSaveNotifications}>
                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Pemberitahuan email untuk pesanan baru</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Pemberitahuan email untuk stok rendah</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>Pemberitahuan SMS untuk pembaruan pengiriman</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Pemberitahuan dorong</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>Laporan ringkasan mingguan</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      Simpan Pengaturan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
