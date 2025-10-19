function loadComments() {
    const commentList = document.getElementById("commentList");
    if (!commentList) return;

    const comments = JSON.parse(localStorage.getItem("productComments")) || [];

    commentList.innerHTML = comments.map(c => `
    <div class="d-flex mb-3 p-2 bg-white rounded shadow-sm">
      <img src="${c.avatar}" class="rounded-circle me-3" alt="avatar" width="50" height="50">
      <div>
        <h6 class="mb-1 fw-bold">${c.name}</h6>
        <p class="mb-1">${c.text}</p>
        <small class="text-muted">${c.time}</small>
      </div>
    </div>
  `).join("");
}

function addComment() {
    const textArea = document.getElementById("commentText");
    const text = textArea.value.trim();
    if (!text) {
        alert("Vui lòng nhập bình luận!");
        return;
    }

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("customerProfile"));
    const name = user ? user.name : "Khách ẩn danh";
    const avatar = user && user.avatar ?
        user.avatar :
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // avatar mặc định

    const newComment = {
        name: name,
        avatar: avatar,
        text: text,
        time: new Date().toLocaleString("vi-VN")
    };

    const comments = JSON.parse(localStorage.getItem("productComments")) || [];
    comments.push(newComment);
    localStorage.setItem("productComments", JSON.stringify(comments));

    textArea.value = "";
    loadComments();
}

window.addEventListener("load", () => {
    loadComments();

    const btn = document.getElementById("btnComment");
    const textArea = document.getElementById("commentText");

    if (btn) btn.addEventListener("click", addComment);

    if (textArea) {
        textArea.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addComment();
            }
        });
    }
});