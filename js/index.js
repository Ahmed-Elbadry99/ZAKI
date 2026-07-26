
//! =============== Close & Open Sidebar-Responsive =============== //
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (menuIcon && sidebar) {
        menuIcon.addEventListener("click", function () {
            sidebar.classList.toggle("responsive");
        });
    }
});

//! =============== Active-Link (Side-Bar) =============== //
const navItems = document.querySelectorAll('.sidebar ul.links li');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navItems.forEach(li => {
    const link = li.querySelector('a');
    const href = link.getAttribute('href').replace('./', '');

    if (href === currentPage) {
        li.classList.add('active-link');
        // moveIndicator(li);
    } else {
        li.classList.remove('active-link');
    }
});

const linksScroll = document.querySelector('.sidebar .links-scroll');
const activeItem = document.querySelector('.sidebar .links li.active-link');

if (activeItem && linksScroll) {
    activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

//! =============== Dots Dropdown-Menu =============== //
document.querySelectorAll(".dots-dropdown-menu").forEach(menu => {
    const dots = menu.querySelector(".dots-menu");
    const dropdown = menu.querySelector(".dropdown");

    if (!dots || !dropdown) return;

    dots.addEventListener("click", (e) => {
        e.stopPropagation();

        document.querySelectorAll(".dropdown.show").forEach(item => {
            if (item !== dropdown) {
                item.classList.remove("show");
            }
        });

        dropdown.classList.toggle("show");
    });

    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});
document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.show").forEach(item => {
        item.classList.remove("show");
    });
});

//! =============== Platform Box =============== //
document.querySelectorAll(".platform-box").forEach(box => {
    const messagesToggle = box.querySelector(".platform-box .messages-toggle");
    const commentsToggle = box.querySelector(".platform-box .comments-toggle");
    const disconnectBtn = box.querySelector(".platform-box .disconnect-btn");

    const messagesStatus = box.querySelector(".platform-box .messages-status");
    const commentsStatus = box.querySelector(".platform-box .comments-status");
    const connectionStatus = box.querySelector(".platform-box .connection-status");
    const disconnectText = box.querySelector(".platform-box .disconnect-text");

    if (messagesToggle && messagesStatus) {
        messagesToggle.addEventListener("change", () => {
            if (messagesToggle.checked) {
                messagesStatus.textContent = "الرسائل مفعلة";
                messagesStatus.classList.add("active");
                messagesStatus.classList.remove("no-active");
            }
            else {
                messagesStatus.textContent = "الرسائل مُغلقة";
                messagesStatus.classList.add("no-active");
                messagesStatus.classList.remove("active");
            }
        });
    }

    if (commentsToggle && commentsStatus) {
        commentsToggle.addEventListener("change", () => {
            if (commentsToggle.checked) {
                commentsStatus.textContent = "التعليقات مفعلة";
                commentsStatus.classList.add("active");
                commentsStatus.classList.remove("no-active");
            }
            else {
                commentsStatus.textContent = "التعليقات مُغلقة";
                commentsStatus.classList.add("no-active");
                commentsStatus.classList.remove("active");
            }
        });
    }

    if (disconnectBtn && connectionStatus && disconnectText) {
        disconnectBtn.addEventListener("click", () => {
            if (connectionStatus.classList.contains("active")) {
                connectionStatus.textContent = "غير متصل";
                connectionStatus.classList.remove("active");
                connectionStatus.classList.add("no-active");
                disconnectText.textContent = "إعادة الاتصال";
            }
            else {
                connectionStatus.textContent = "متصل";
                connectionStatus.classList.remove("no-active");
                connectionStatus.classList.add("active");
                disconnectText.textContent = "قطع الاتصال";
            }
        });
    }
});

document.querySelectorAll(".platform-box.close").forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

//! =============== Custom Select =============== //
document.querySelectorAll(".custom-select").forEach(select => {
    const selected = select.querySelector(".select-selected");
    const items = select.querySelectorAll(".select-items .select-item");

    const text = selected.querySelector("span");
    const plus = selected.querySelector(".fa-plus");

    selected.onclick = (e) => {
        e.stopPropagation();
        select.classList.toggle("active");
    };

    items.forEach(item => {
        item.onclick = (e) => {
            e.stopPropagation();
            selected.classList.add("active");
            text.textContent = item.textContent.trim();
            if (plus) {
                plus.remove();
            }
            select.classList.remove("active");
        };
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach(select => {
        select.classList.remove("active");
    });
});

document.querySelectorAll(`.chats .actions .plus-btn`).forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {
            btn.childNodes[0].textContent = "تم الحفظ ";
            btn.querySelector("i").className = "fa-solid fa-check";
        } else {
            btn.childNodes[0].textContent = "حفظ العميل ";
            btn.querySelector("i").className = "fa-regular fa-bookmark";
        }
    });
});

document.querySelectorAll(`.chats .filters button`).forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
});

//! ================= Chat-Deatails ================= //
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesBox = document.getElementById("messagesBox");

const avatar = document.querySelector(".myMessage-box .avatar")?.src;
const defaultAvatar = "../assets/images/avtar.jpg";

const chatBody = document.querySelector(".chats .chat-deatails .body");

const fileBtn = document.querySelector(".fa-paperclip")?.parentElement;
const fileInput = document.getElementById("fileInput");

const filePreview = document.getElementById("filePreview");


let selectedFiles = [];
// ================= Scroll ================= //
function scrollToBottom() {
    if (!chatBody) return;

    requestAnimationFrame(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
    });
}

// ================= إرسال الرسالة ================= //
function sendMessage() {
    const text = input.value.trim();
    if (text === "" && selectedFiles.length === 0) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    let attachments = "";
    selectedFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        if (file.type.startsWith("image")) {
            attachments += `
                <img class="chat-image" src="${url}">
            `;
        }
        else {
            attachments += `
                <video class="chat-video" controls src="${url}"></video>
            `;
        }
    });

    messagesBox.innerHTML += `
    <div class="myMessage-box">
        <div class="myMessage">
            <div class="images">
                ${attachments}
            </div>
            ${text ? `<p>${text}</p>` : ""}
            <span class="time"> ${time} </span>
        </div>

        <figure>
            <img 
            src="${avatar || defaultAvatar}" 
            alt="avatar"
            onerror="this.src='${defaultAvatar}'"
            >
        </figure>
    </div>`;

    input.value = "";
    selectedFiles = [];
    fileInput.value = "";
    filePreview.innerHTML = "";
    filePreview.classList.remove("active");
    scrollToBottom();
}

if (sendBtn && input && messagesBox) {
    sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sendMessage();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// ================= تسجيل الصوت ================= //
const micControl = document.querySelector(".mic-control");
const micBtn = micControl;
const recordUI = document.querySelector(".record-ui");
const cancelRecord = document.querySelector(".cancel-record");
const sendRecord = document.querySelector(".send-record");

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioURL = null;

if (micBtn && recordUI && sendBtn) {
    micBtn.addEventListener("click", async () => {
        if (!isRecording) {


            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    alert("المتصفح لا يدعم تسجيل الصوت");
                    return;
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    audioChunks.push(e.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, {
                        type: "audio/webm"
                    });
                    audioURL = URL.createObjectURL(audioBlob);
                };

                mediaRecorder.start();
                isRecording = true;

                micControl.innerHTML = `<i class="fa-solid fa-stop"></i>`;
                recordUI.classList.remove("d-none");
                sendBtn.classList.add("d-none");

            } catch (error) {
                console.log(error);

                alert("لا يوجد ميكروفون متاح أو لم يتم السماح باستخدامه");
            }











            // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            //     mediaRecorder = new MediaRecorder(stream);
            //     audioChunks = [];

            //     mediaRecorder.ondataavailable = (e) => {
            //         audioChunks.push(e.data);
            //     };

            //     mediaRecorder.onstop = () => {
            //         const audioBlob = new Blob(audioChunks, {
            //             type: "audio/webm"
            //         });
            //         audioURL = URL.createObjectURL(audioBlob);
            //     };

            //     mediaRecorder.start();
            //     isRecording = true;
            //     micControl.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            //     recordUI.classList.remove("d-none");
            //     sendBtn.classList.add("d-none");
            // } else {
            //     mediaRecorder.stop();
            //     isRecording = false;
            //     micControl.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        }
    });
}

// ================= إرسال الصوت ================= //
if (sendRecord) {
    sendRecord.addEventListener("click", () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            setTimeout(() => {
                sendAudioMessage();
            }, 300);
        } else {
            sendAudioMessage();
        }
    });
}

function sendAudioMessage(){
    if(!audioURL) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
    });
    messagesBox.innerHTML += `
    <div class="myMessage-box d-flex align-items-start justify-content-end gap-3">
        <div class="myMessage audio-message">
            <audio controls>
                <source src="${audioURL}" type="audio/webm">
            </audio>
            <span class="time">
                ${time}
            </span>
        </div>
        <figure>
            <img src="${avatar || defaultAvatar}">
        </figure>
    </div>
    `;
    resetRecording();
    scrollToBottom();
}

// ================= إلغاء التسجيل ================= //
if (cancelRecord) {
    cancelRecord.addEventListener("click", () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }

        if (mediaRecorder?.stream) {
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        audioURL = null;
        resetRecording();
    });
}

function resetRecording() {
    if (recordUI) recordUI.classList.add("d-none");
    if (micControl) {
        micControl.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    }
    if (sendBtn) {
        sendBtn.classList.remove("d-none");
    }

    audioChunks = [];
    audioURL = null;
    isRecording = false;
}

// ================= الملفات ================= //
// فتح اختيار الملفات
if (fileBtn && fileInput) {
    fileBtn.addEventListener("click", () => {
        fileInput.click();
    });
}

// اختيار صور وفيديوهات
if (fileInput) {
    fileInput.addEventListener("change", function () {
        const files = Array.from(this.files);
        if (!files.length) return;

        selectedFiles = [
            ...selectedFiles,
            ...files
        ];

        renderPreview();
    });
}

// عرض المعاينة
function renderPreview() {
    filePreview.innerHTML = "";
    selectedFiles.forEach((file, index) => {
        const url = URL.createObjectURL(file);
        filePreview.innerHTML += `
        <div class="preview-item">
            <button 
            class="remove-file" 
            onclick="removeFile(${index})">
                <i class="fa-solid fa-xmark"></i>
            </button>
            ${file.type.startsWith("image")
                ?
                `<img src="${url}">`
                :
                `<video src="${url}" controls></video>`
            }
        </div>
        `;
    });

    if (selectedFiles.length) {
        filePreview.classList.add("active");
    }
}

// حذف ملف
function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderPreview();
    if (selectedFiles.length === 0) {
        fileInput.value = "";
        filePreview.classList.remove("active");
    }
}

//! ================= Open Chat Details ================= //
const conversationCards = document.querySelectorAll(".conversation-list .conversation-card");
const emptyChat = document.querySelector(".empty-chat");
const chatDetails = document.querySelector(".chat-deatails");

conversationCards.forEach(card => {
    card.addEventListener("click", () => {
        conversationCards.forEach(item => {
            item.classList.remove("active");
        });
        card.classList.add("active");
        emptyChat.classList.add("d-none");
        chatDetails.classList.remove("d-none");
    });

    const actions = card.querySelector(".actions");
    if(actions){
        actions.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
});