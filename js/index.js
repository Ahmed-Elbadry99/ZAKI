
//! =============== Notification (Topbar) =============== //
const notification = document.querySelector(".notification-wrapper");
const dropdown = document.querySelector(".notifications-dropdown");


if(notification){
notification.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("active");
});

dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
});

document.addEventListener("click", function () {
    dropdown.classList.remove("active");
});


}
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

//! =============== Sidebar (Hover) =============== //
const links = document.querySelectorAll('.sidebar .links li a');
const tooltip = document.querySelector('.sidebar .tooltip');
const arrow = document.querySelector('.sidebar .arrow');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const rect = link.getBoundingClientRect();

        // Tooltip
        tooltip.textContent = link.dataset.name;
        tooltip.style.top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2 + 'px';
        tooltip.style.left = rect.right + 15 + 'px';
        tooltip.style.opacity = 1;

        // Arrow
        arrow.style.top = rect.top + rect.height / 2 - 7 + 'px'; // 7px = نصف ارتفاع السهم
        arrow.style.left = rect.right + 'px';
        arrow.style.opacity = 1;
    });

    link.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
        arrow.style.opacity = 0;
    });
});



// //! =============== Active-Link (Side-Bar) =============== //
// const indicator = document.querySelector('.sidebar .active-indicator');
const navItems = document.querySelectorAll('.sidebar ul.links li');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';


// function moveIndicator(li){
//     const rect = li.getBoundingClientRect();
//     indicator.style.top = rect.top + rect.height / 2 - 15 + 'px';
//     indicator.style.opacity = 1;
// }


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




//! =============== Show-Password (Form-Input) =============== //
const icons = document.querySelectorAll('.show-pass');

icons.forEach(function(icon) {
    icon.addEventListener('click', function() {
    const input = icon.previousElementSibling; // (input) بتجيب العنصر اللى قبله

        if (input.type == "password") {
            input.type = "text";
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
        else {
            input.type = "password";
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

//! Verify-Code
const inputs = document.querySelectorAll(".verify-input-container .verify-input");
const firstInput = document.querySelector(".verify-input.firstInput");

    // Inupt يعمل فوكس ع أول
    firstInput?.focus();

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, ""); // يكتب ارقام بس

            // لما أكتب رقم ف الدايرةالمؤشر يروح تلقائي ع اللي بعده
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus(); // اللى بعده input يروح ع ال
            }
        });

        // فاضى يرجع ع اللي قبلها input وال Backspace لو ضغطت
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value === "" && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

//! Verify-Code (Counter)
const timerElement = document.getElementById("timer");

if (timerElement) {
    let timeLeft = parseInt(timerElement.textContent);

    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = "00";
            return;
        }

        timeLeft--;
        timerElement.textContent = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
    }, 1000);
}

//! =============== Upload-Image (My-Profile) =============== //
const labels = document.querySelectorAll(".image-profile");

labels.forEach(label => {
    const input = label.querySelector("input[type='file']");
    const img = label.querySelector("img");
    const fileName = label.querySelector(".file-name");

    input.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const textBox = label.querySelector(".text");
        if (textBox) textBox.style.display = "none";

        if (file.type.startsWith("image/")) {
            if (fileName) fileName.textContent = "";
            img.style.display = "block";

            const reader = new FileReader();
            reader.onload = e => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        else if (file.type === "application/pdf") {
            img.style.display = "none";
            if (fileName) fileName.textContent = file.name;
        }

        else {
            alert("الملف غير مدعوم");
            input.value = "";
        }
    });
});

//! =============== locked-BTN (Rebate) =============== //
const buttons = document.querySelectorAll(".locked-btn");

buttons.forEach((btn) => {
    btn.innerHTML = `
        <i class="fa-solid fa-lock"></i>
        Achieve Target to Unlock
    `;
});

//! =============== Banner =============== //
$(document).ready(function(){
    $(".content-data .banner .owl-carousel").owlCarousel({
        loop: true,
        items: 1,
        autoplay:true,
        autoplayTimeout: 2000,
        autoplayHoverPause:false,
        dots: true,
        nav: false,
        // rtl: true,
        margin: 30,
    });
});






//! =============== Link My-Activity (Home Page) =============== //
// document.addEventListener("DOMContentLoaded", function () {
//     const hash = window.location.hash;

//     if (hash === "#pills-my-activity") {
//         const tabTrigger = document.querySelector(
//             '[data-bs-target="#pills-my-activity"]'
//         );

//         if (tabTrigger) {
//             const tab = new bootstrap.Tab(tabTrigger);
//             tab.show();
//         }
//     }
// });



// last sec header word after
document.addEventListener("DOMContentLoaded", () => {
    const h2 = document.querySelector(".sec-header .page-header h2");
    if (!h2) return;

    const dataName = h2.getAttribute("data-name");
    if (!dataName || dataName.trim() === "") return;

    const text = h2.textContent.trim();
    const words = text.split(" ");

    const lastWord = words.pop();
    h2.textContent = words.join(" ") + " ";

    // span لآخر كلمة
    const span = document.createElement("span");
    span.className = "title-badge-wrapper";
    span.textContent = lastWord + " ";

    // div للخلفية
    const divWrapper = document.createElement("div");
    divWrapper.className = "after-wrapper";

    // p للكلمة اللي هياخد اللون
    const p = document.createElement("p");
    p.textContent = dataName;
    p.className = "after-text";

    divWrapper.appendChild(p);
    span.appendChild(divWrapper);
    h2.appendChild(span);
});



