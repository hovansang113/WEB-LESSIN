// ==== Lấy các phần tử ====
const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");
const logoutBox = document.getElementById("logout-box");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const currentUser = document.getElementById("currentUser");

// ==== Lấy các trường nhập liệu ====
const loginInputs = loginBox.querySelectorAll("input") || [];
const registerInputs = registerBox.querySelectorAll("input") || [];

// =======================================================
// ==== XỬ LÝ PHÍM ENTER ====
// =======================================================
function handleEnter(event, actionBtn) {
    if (event.key === "Enter") {
        event.preventDefault();
        actionBtn.click();
    }
}

loginInputs.forEach(input => input.addEventListener("keypress", e => handleEnter(e, loginBtn)));
registerInputs.forEach(input => input.addEventListener("keypress", e => handleEnter(e, registerBtn)));

// =======================================================
// ==== HIỆN / ẨN FORM ====
// =======================================================
showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
});

showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});

// =======================================================
// ==== LẤY DANH SÁCH USER ==== 
// =======================================================
let users = JSON.parse(localStorage.getItem("users")) || [];

// =======================================================
// ==== ĐĂNG KÝ ====
// =======================================================
registerBtn.addEventListener("click", () => {
    const username = document.getElementById("regUsername").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password1 = document.getElementById("regPassword1").value.trim();
    const password2 = document.getElementById("regPassword").value.trim();

    if (!username || !phone || !password1 || !password2) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password1 !== password2) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    if (password1.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
    }

    const existUser = users.find(u => u.username === username);
    if (existUser) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    const user = { username, phone, password: password1 };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
});

// =======================================================
// ==== ĐĂNG NHẬP ====
// =======================================================
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (username === "admin123" && password === "123456") {
        alert("Đăng nhập trang quản trị thành công!");
        window.location.href = "admin.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
        return;
    }

    alert("Đăng nhập thành công!");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "../HTML/profile.html"; // 👉 chuyển sang trang hồ sơ
});

// =======================================================
// ==== KIỂM TRA NẾU CHƯA CÓ USER THÌ CHUYỂN SANG TRANG ĐĂNG KÝ ====
// =======================================================
window.addEventListener("load", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        // Nếu chưa có tài khoản nào
        alert("Chưa có tài khoản nào. Vui lòng đăng ký trước!");
        window.location.href = "register.html";
    }
});