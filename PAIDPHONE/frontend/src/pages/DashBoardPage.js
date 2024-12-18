// JavaScript for Dashboard Page

// DOM Elements
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");
const searchPopup = document.getElementById("search-popup");
const popupDetails = document.getElementById("popup-details");
const closePopup = document.getElementById("close-popup");
const randomInfo = document.getElementById("random-info");
const totalPos = document.getElementById("total-pos");
const globalBalance = document.getElementById("global-balance");
const activeModules = document.getElementById("active-modules");
const inactiveModules = document.getElementById("inactive-modules");
const recentLogs = document.getElementById("recent-logs");
const dashboardTab = document.getElementById("dashboard-tab");
const posTab = document.getElementById("pos-tab");
const adminTab = document.getElementById("admin-tab");
const dashboardContent = document.querySelector(".dashboard-content");
const modifyPopup = document.getElementById("modify-popup");
const deletePopup = document.getElementById("delete-popup");
const addPopup = document.getElementById("add-popup");

// Dummy Data for Suggestions and Random Info
const dummyData = [
    { id: "POS001", name: "Store A", manager: "John Doe", phone: "123-456-7890", balance: "$500", cardId: "CARD001" },
    { id: "POS002", name: "Store B", manager: "Jane Smith", phone: "987-654-3210", balance: "$300", cardId: "CARD002" },
    { id: "POS003", name: "Store C", manager: "Alice Brown", phone: "555-123-4567", balance: "$800", cardId: "CARD003" },
];

// Admin Data (with roles)
const adminData = [
    { id: "ADMIN001", name: "Admin", lastLogin: "2024-12-18 10:30 AM", role: "admin", password: "admin123" },
    { id: "ADMIN002", name: "John Doe", lastLogin: "2024-12-17 02:15 PM", role: "moderator", password: "john123" },
    { id: "ADMIN003", name: "Jane Smith", lastLogin: "2024-12-16 09:00 AM", role: "user", password: "jane123" }
];


// Initialize Dashboard Data
function initializeDashboard() {
    totalPos.textContent = dummyData.length;
    globalBalance.textContent = "$1600"; // Sum of all balances in dummyData
    activeModules.textContent = "2"; // Example value
    inactiveModules.textContent = "1"; // Example value
    recentLogs.textContent = "Log 001, Log 002"; // Example logs
    displayRandomInfo();
}

// Show Suggestions Based on Input
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (query) {
        const filteredData = dummyData.filter(
            (item) =>
                item.id.toLowerCase().includes(query) ||
                item.name.toLowerCase().includes(query) ||
                item.manager.toLowerCase().includes(query) ||
                item.phone.includes(query) ||
                item.balance.includes(query) ||
                item.cardId.toLowerCase().includes(query)
        );

        filteredData.forEach((item) => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = `${item.name} (${item.id})`;
            suggestionItem.addEventListener("click", () => showPopup(item));
            suggestionsList.appendChild(suggestionItem);
        });
    }
});

// Show Pop-up with POS Details
function showPopup(item) {
    popupDetails.innerHTML = ` 
        <p><strong>Point of Sale ID:</strong> ${item.id}</p>
        <input type="text" id="modify-name" value="${item.name}">
        <input type="text" id="modify-role" value="${item.role}">
    `;
    searchPopup.hidden = false;  // Show the popup
}


// Close Pop-up
closePopup.addEventListener("click", () => {
    searchPopup.hidden = true;
});

// Add New Admin
function addAdmin() {
    const newAdmin = {
        id: `ADMIN${adminData.length + 1}`,
        name: document.getElementById("add-name").value,
        lastLogin: new Date().toLocaleString(),
        role: document.getElementById("add-role").value, // Add role
    };
    adminData.push(newAdmin);
    closeAddPopup();
    initializeDashboard();
    switchTab('admin-tab');      // Re-render the admin table by switching to the admin tab

}

// Modify Admin Data
function modifyAdmin(itemId) {
    const item = adminData.find(i => i.id === itemId);
    if (item) {
        item.name = document.getElementById("modify-name").value;
        item.role = document.getElementById("modify-role").value; // Update role
        closeModifyPopup();
        switchTab('admin-tab'); // Re-render the admin table with updated data
    }
}

// Display Random Point of Sale Info
function displayRandomInfo() {
    const randomItem = dummyData[Math.floor(Math.random() * dummyData.length)];
    randomInfo.innerHTML = `
        <p><strong>Random Point of Sale:</strong></p>
        <p><strong>ID:</strong> ${randomItem.id}</p>
        <p><strong>Name:</strong> ${randomItem.name}</p>
        <p><strong>Manager:</strong> ${randomItem.manager}</p>
        <p><strong>Balance:</strong> ${randomItem.balance}</p>
    `;
}

// Show Modify Admin Popup
function showModifyPopup(itemId) {
    const item = adminData.find(i => i.id === itemId); 
    if (!item) {
        console.error("Admin not found");
        return;
    }

    modifyPopup.innerHTML = `
        <h3>Modify Admin: ${item.name}</h3>
        <input type="text" id="modify-name" value="${item.name}" required>
        <input type="password" id="modify-password" placeholder="New Password" value="${item.password}" required>
        <select id="modify-role" required>
            <option value="admin" ${item.role === "admin" ? "selected" : ""}>Admin</option>
            <option value="user" ${item.role === "user" ? "selected" : ""}>User</option>
            <option value="moderator" ${item.role === "moderator" ? "selected" : ""}>Moderator</option>
        </select>
        <button onclick="modifyAdmin('${item.id}')">Save Changes</button>
        <button class="cancel-btn" onclick="closeModifyPopup()">Cancel</button>
    `;
    modifyPopup.style.display = "block";  // Show the Modify Admin popup
}


// Close Modify Popup
function closeModifyPopup() {
    modifyPopup.style.display = "none";  // Hide the Modify Admin popup
}


// Show Delete Admin Popup
function showDeletePopup(itemId) {
    deletePopup.innerHTML = `
        <h3>Are you sure you want to delete this admin?</h3>
        <button onclick="deleteAdmin('${itemId}')">Yes, Delete</button>
        <button class="cancel-btn" onclick="closeDeletePopup()">Cancel</button>
    `;
    deletePopup.style.display = "block";  // Show the Delete Admin popup
}


// Close Delete Popup
function closeDeletePopup() {
    deletePopup.style.display = "none";  // Hide the Delete Admin popup
}


// Delete Admin
function deleteAdmin(itemId) {
    const index = adminData.findIndex(i => i.id === itemId);
    if (index > -1) {
        adminData.splice(index, 1); // Remove admin from array
        closeDeletePopup();          // Close the delete popup
        switchTab('admin-tab');      // Re-render the admin table by switching to the admin tab
    }
}

// Show Add Admin Popup
function showAddPopup() {
    addPopup.innerHTML = `
        <h3>Add New Admin</h3>
        <input type="text" id="add-name" placeholder="Name" required>
        <input type="password" id="add-password" placeholder="Password" required>
        <select id="add-role" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
        </select>
        <button onclick="addAdmin()">Add Admin</button>
        <button class="cancel-btn" onclick="closeAddPopup()">Cancel</button>
    `;
    addPopup.style.display = "block";  // Show Add Admin popup
}



// Close Add Popup
function closeAddPopup() {
    addPopup.style.display = "none";  // Hide the Add Admin popup
}

// Modify POS
function modifyPOS(itemId) {
    const item = dummyData.find(i => i.id === itemId);
    item.name = document.getElementById("modify-name").value;
    item.manager = document.getElementById("modify-manager").value;
    item.phone = document.getElementById("modify-phone").value;
    item.balance = document.getElementById("modify-balance").value;
    closeModifyPopup();
    initializeDashboard();
}

// Show Add POS
function addPOS() {
    const newPOS = {
        id: `POS${dummyData.length + 1}`,
        name: document.getElementById("add-name").value,
        manager: document.getElementById("add-manager").value,
        phone: document.getElementById("add-phone").value,
        balance: document.getElementById("add-balance").value,
        cardId: `CARD${dummyData.length + 1}`,
    };
    dummyData.push(newPOS);
    closeAddPopup();
    initializeDashboard();
}

// Tab Switching Logic
function switchTab(activeTabId) {
    document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
    document.getElementById(activeTabId).classList.add("active");

    if (activeTabId === "dashboard-tab") {
        closeModifyPopup();
        closeAddPopup();
        closeDeletePopup();
        dashboardContent.innerHTML = `
            <div class="top-summary">
                <p>Total Points of Sale: <span id="total-pos">${dummyData.length}</span></p>
                <p>Global Balance Summary: <span id="global-balance">$1600</span></p>
                <p>Active Modules: <span id="active-modules">2</span></p>
                <p>Inactive Modules: <span id="inactive-modules">1</span></p>
                <p>Recent Logs: <span id="recent-logs">Log 001, Log 002</span></p>
            </div>
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search...">
                <ul class="autocomplete-suggestions" id="suggestions"></ul>
            </div>
            <div class="bottom-section">
                <div class="random-info" id="random-info">Random Point of Sale Information will appear here.</div>
            </div>
        `;
        initializeDashboard();
    } else if (activeTabId === "pos-tab") {
        closeModifyPopup();
        closeAddPopup();
        closeDeletePopup();
        dashboardContent.innerHTML = `<table><tr><th>ID</th><th>Name</th><th>Manager</th><th>Phone</th><th>Balance</th><th>Card ID</th></tr>` +
            dummyData.map(item => `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.manager}</td><td>${item.phone}</td><td>${item.balance}</td><td>${item.cardId}</td></tr>`).join('') + `</table>`;
    } else if (activeTabId === "admin-tab") {
        dashboardContent.innerHTML = `
            <h2>Admin Management</h2>
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Last Login</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.lastLogin}</td>
                                <td>${item.role}</td>
                                <td>${'*'.repeat(item.password.length)}</td> <!-- Password displayed as dots -->
                                <td>
                                    <button class="modify-btn" onclick="showModifyPopup('${item.id}')">Modify</button>
                                    <button class="delete-btn" onclick="showDeletePopup('${item.id}')">Delete</button>
                                </td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <button class="add-btn" onclick="showAddPopup()">Add Admin</button>
        `;
    }
    
}

// Tab Event Listeners
dashboardTab.addEventListener("click", () => switchTab('dashboard-tab'));
posTab.addEventListener("click", () => switchTab('pos-tab'));
adminTab.addEventListener("click", () => switchTab('admin-tab'));

// Default Tab
switchTab('dashboard-tab');
