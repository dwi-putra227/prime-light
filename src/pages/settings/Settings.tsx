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
            {/* <button
              className={`tab ${activeTab === "system" ? "active" : ""}`}
              onClick={() => setActiveTab("system")}
            >
              <FaDatabase />
              <span>System</span>
            </button> */}
          </div>

          <div className="settings-panel">
            {activeTab === "profile" && (
              <div className="panel-content">
                <h2>Profile Settings</h2>
                <p className="panel-description">
                  Update your personal information
                </p>

                <form onSubmit={handleSaveProfile}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your full name" />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" />
                  </div>

                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="Enter company name" />
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
                  Manage your password and security preferences
                </p>

                <form onSubmit={handleSavePassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password" />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" />
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>Enable Two-Factor Authentication (2FA)</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Log out from other devices</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <div>
                      <button type="submit" className="btn-save">
                        Update Password
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
                  Choose what notifications you want to receive
                </p>

                <form onSubmit={handleSaveNotifications}>
                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for new orders</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for low stock</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>SMS notifications for shipment updates</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Push notifications</span>
                    </label>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input type="checkbox" />
                      <span>Weekly summary reports</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      Save Preferences
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
