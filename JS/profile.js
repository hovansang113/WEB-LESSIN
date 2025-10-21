// ======================= TẢI HỒ SƠ NGƯỜI DÙNG =======================
function loadProfile() {
    const loggedInUserJSON = localStorage.getItem("loggedInUser");
    const container = document.getElementById("profileInfo");

    if (!loggedInUserJSON) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập lại!");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(loggedInUserJSON);

    container.innerHTML = `
        <p><strong>Họ tên:</strong> ${user.fullName || 'Chưa cập nhật'}</p>
        <p><strong>Ngày sinh:</strong> ${user.dob || 'Chưa cập nhật'}</p>
        <p><strong>Giới tính:</strong> ${user.gender || 'Chưa cập nhật'}</p>
        <p><strong>Số điện thoại:</strong> ${user.phone || 'Chưa cập nhật'}</p>
        <p><strong>Địa chỉ:</strong> ${user.address || 'Chưa cập nhật'}</p>
        <hr>
        <p><strong>Tên đăng nhập:</strong> ${user.username}</p>
        <p><strong>Trạng thái:</strong> Đã đăng nhập</p>
    `;
}

// ======================= ĐĂNG XUẤT =======================
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Đã đăng xuất!");
    window.location.href = "login.html";
}

// ======================= HIỂN THỊ FORM CẬP NHẬT =======================
function showUpdateForm() {
    document.getElementById("updateForm").style.display = "block";

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    document.getElementById("fullName").value = user.fullName || "";
    document.getElementById("dob").value = user.dob || "";
    document.getElementById("gender").value = user.gender || "";
    document.getElementById("address").value = user.address || "";
}

// ======================= LƯU CẬP NHẬT HỒ SƠ =======================
function saveProfile() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    // Cập nhật dữ liệu trong hồ sơ
    user.fullName = document.getElementById("fullName").value.trim();
    user.dob = document.getElementById("dob").value.trim();
    user.gender = document.getElementById("gender").value.trim();
    user.address = document.getElementById("address").value.trim();

    // Cập nhật vào localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // --- Cập nhật đồng thời trong danh sách users (nếu có) ---
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
        users[index] = user;
        localStorage.setItem("users", JSON.stringify(users));
    }

    alert("✅ Cập nhật hồ sơ thành công!");
    document.getElementById("updateForm").style.display = "none";
    loadProfile();
}

// ======================= GÁN SỰ KIỆN =======================
window.addEventListener("load", loadProfile);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("updateBtn").addEventListener("click", showUpdateForm);
document.getElementById("saveBtn").addEventListener("click", saveProfile);