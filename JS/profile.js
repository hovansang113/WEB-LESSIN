function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("customerProfile"));
    const container = document.getElementById("profileInfo");

    if (!profile) {
        container.innerHTML = `
            <p>❌ Bạn chưa đăng nhập hoặc chưa có thông tin khách hàng.</p>
            <p><a href="register.html">Đăng ký ngay</a></p>
        `;
        return;
    }

    container.innerHTML = `
        <p><strong>Họ tên:</strong> ${profile.name}</p>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Số điện thoại:</strong> ${profile.phone}</p>
        <p><strong>Địa chỉ:</strong> ${profile.address}</p>
        <p><strong>Giới tính:</strong> ${profile.gender}</p>
    `;
}

function logout() {
    localStorage.removeItem("customerProfile");
    alert("Đã đăng xuất!");
    window.location.href = "login.html"; // hoặc trang đăng nhập của bạn
}

window.addEventListener("load", loadProfile);