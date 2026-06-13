const ADMIN_PASSWORD = "1010";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
    deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvjKzjBm8klCg93Mm1Zcpgaty5jz7cWik",
    authDomain: "mobile-wedding-1ef27.firebaseapp.com",
    projectId: "mobile-wedding-1ef27",
    storageBucket: "mobile-wedding-1ef27.firebasestorage.app",
    messagingSenderId: "980398374898",
    appId: "1:980398374898:web:c806ffffccedde1196356b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestbookBtn = document.getElementById("guestbookBtn");
const guestbookList = document.getElementById("guestbookList");

async function loadGuestbook() {

    guestbookList.innerHTML = "";

    const q = query(
        collection(db, "guestbook"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {

        const data = doc.data();

     const date = data.createdAt?.toDate();

const formattedDate = date
    ? `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`
    : '';

guestbookList.innerHTML += `
    <div class="guestbook-item">
        <div class="guestbook-name">
            ${data.name}
        </div>

        <div class="guestbook-date">
            ${formattedDate}
        </div>
<button
    class="delete-btn"
    data-id="${doc.id}">
    삭제
</button>
        <div class="guestbook-message">
            ${data.message}
        </div>
    </div>
`;
    });
}

guestbookBtn.addEventListener("click", async () => {

    const name =
        document.getElementById("guestName").value.trim();

    const message =
        document.getElementById("guestMessage").value.trim();

    if (!name || !message) {

        alert("이름과 메시지를 입력해주세요.");

        return;
    }
    if (name.length > 10) {

    alert("이름은 10자 이하로 입력해주세요.");

    return;
}

if (message.length > 100) {

    alert("메시지는 100자 이하로 입력해주세요.");

    return;
}
    const lastWrite =
    localStorage.getItem("guestbookLastWrite");

if (
    lastWrite &&
    Date.now() - Number(lastWrite) < 10000
) {

    alert("잠시 후 다시 작성해주세요.");

    return;
}

    await addDoc(
        collection(db, "guestbook"),
        {
            name,
            message,
            createdAt: serverTimestamp()
        }
    );

    document.getElementById("guestName").value = "";
    document.getElementById("guestMessage").value = "";

    loadGuestbook();
    document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn"))
        return;

    const password =
        prompt("관리자 비밀번호");

    if (password !== "1010") {

        alert("비밀번호가 틀렸습니다.");

        return;
    }

    const id =
        e.target.dataset.id;

    await deleteDoc(
        doc(db, "guestbook", id)
    );

    loadGuestbook();
});

    alert("축하 메시지가 등록되었습니다 💌");
});
localStorage.setItem(
    "guestbookLastWrite",
    Date.now()
);

loadGuestbook();
