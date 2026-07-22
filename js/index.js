
//! =============== Close & Open Sidebar-Responsive =============== //
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if(menuIcon && sidebar){
        menuIcon.addEventListener("click", function(){
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
document.querySelectorAll(".platform-box.close").forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

document.querySelectorAll(".dots-dropdown-menu").forEach(menu => {
    const dots = menu.querySelector(".dots-menu");
    const dropdown = menu.querySelector(".dropdown");

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

//! =============== Custom Select =============== //
document.querySelectorAll(".custom-select").forEach(select => {
    const selected = select.querySelector(".select-selected");
    const items = select.querySelectorAll(".select-items .select-item");

    selected.onclick = (e) => {
        e.stopPropagation();

        document.querySelectorAll(".custom-select").forEach(item => {
            if (item !== select) {
                item.classList.remove("active");
            }
        });

        select.classList.toggle("active");
    };

    items.forEach(item => {
        item.onclick = () => {
            selected.childNodes[0].textContent = item.textContent;
            select.classList.remove("active");
        };
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach(select => {
        select.classList.remove("active");
    });
});