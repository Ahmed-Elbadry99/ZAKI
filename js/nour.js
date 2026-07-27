


function toggleDropdown(id) {
    const dd = document.getElementById(id);
    const isOpen = dd.classList.contains('open');
    document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) { dd.classList.add('open'); }
}

function selectDateOption(btn, label) {
    const menu = btn.closest('.dropdown-menu');
    menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('dateFilterLabel').textContent = label;
    document.getElementById('customDate').value = '';
    document.getElementById('dateDropdown').classList.remove('open');
    // filterByDate(label)
}

function selectCustomDate(value) {
    if (!value) return;
    const menu = document.querySelector('#dateDropdown .dropdown-menu');
    menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    const formatted = new Date(value).toLocaleDateString('ar-EG');
    document.getElementById('dateFilterLabel').textContent = formatted;
    document.getElementById('dateDropdown').classList.remove('open');
    // filterByDate(value)
}

if(document.getElementById('dateDropdown')){
  document.getElementById('dateDropdown').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDateDropdown();
    }
  });
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    }
});


function toggleRowDropdown(btn) {
    const dd = btn.closest('.dropdown');
    const isOpen = dd.classList.contains('open');
    document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) { dd.classList.add('open'); }
}

function handleRowAction(btn, action) {
    const dd = btn.closest('.dropdown');
    dd.classList.remove('open');
}


document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    }
});

function selectStatusOption(btn, label) {
    const menu = btn.closest('.dropdown-menu');
    menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('statusFilterLabel').textContent = label;
    document.getElementById('statusDropdown').classList.remove('open');
}

function selectOfficerOption(btn, label) {
    const menu = btn.closest('.dropdown-menu');
    menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('officerFilterLabel').textContent = label;
    document.getElementById('officerDropdown').classList.remove('open');
}

function selectRowOfficer(btn, name) {
    const dd = btn.closest('.dropdown');
    const label = dd.querySelector('.officer-name');

    dd.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    label.textContent = name;
    dd.classList.remove('open');
}

function selectRowStatus(btn, label, statusClass) {
    const dd = btn.closest('.dropdown');
    const statusBtn = dd.querySelector('.status-btn');
    const labelSpan = dd.querySelector('.status-label');

    dd.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    labelSpan.textContent = label;

    statusBtn.classList.remove('new', 'processing', 'possible');
    statusBtn.classList.add(statusClass);

    dd.classList.remove('open');
}


function openAddClientModal() {
    document.getElementById('addClientOverlay').classList.add('open');
}

function closeAddClientModal() {
    document.getElementById('addClientOverlay').classList.remove('open');
}

function selectModalOption(dropdownId, labelId, btn, value) {
    const menu = btn.closest('.dropdown-menu');
    menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById(labelId).textContent = value;
    document.getElementById(dropdownId).classList.remove('open');
}

function submitAddClient() {
    const data = {
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        summary: document.getElementById('clientSummary').value,
        status: document.getElementById('modalStatusLabel').textContent,
        officer: document.getElementById('modalOfficerLabel').textContent,
    };


    closeAddClientModal();
}

if(document.getElementById('addClientOverlay')){
  document.getElementById('addClientOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
      closeAddClientModal();
    }
  });
}

function openEditColumnsModal() {
    document.getElementById('editColumnsOverlay').classList.add('open');
}

function closeEditColumnsModal() {
    document.getElementById('editColumnsOverlay').classList.remove('open');
}

function saveColumnsChanges() {
    const columns = Array.from(document.querySelectorAll('.column-name'))
        .map(el => el.textContent);

    closeEditColumnsModal();
}

if(document.getElementById('editColumnsOverlay')){
  document.getElementById('editColumnsOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeEditColumnsModal();
    }
  });
}

function handleMoreAction(btn, action) {
    const dd = btn.closest('.dropdown');
    dd.classList.remove('open');
    if (action === 'تعديل الأعمدة') {
        openEditColumnsModal();
    }
}

function openAddColumnModal() {
    document.getElementById('addColumnOverlay').classList.add('open');
}

function closeAddColumnModal() {
    document.getElementById('addColumnOverlay').classList.remove('open');
    // تصفير الحقول لما تقفل
    document.getElementById('columnName').value = '';
    document.getElementById('columnKey').value = '';
    document.getElementById('columnDesc').value = '';
    document.getElementById('columnRequired').checked = false;
    document.getElementById('columnTypeLabel').textContent = 'نوع العمود';
}

// function submitNewColumn() {
//     const data = {
//         name: document.getElementById('columnName').value,
//         type: document.getElementById('columnTypeLabel').textContent,
//         key: document.getElementById('columnKey').value,
//         description: document.getElementById('columnDesc').value,
//         required: document.getElementById('columnRequired').checked,
//     };

//     if (!data.name.trim()) {
//         alert('من فضلك اكتب اسم العمود');
//         return;
//     }


//     closeAddColumnModal();
// }

if(document.getElementById('addColumnOverlay')){
  document.getElementById('addColumnOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeAddColumnModal();
      }
  });
}


function openEditStatusesModal(){
  document.getElementById('editStatusesOverlay').classList.add('open');
}

function closeEditStatusesModal(){
  document.getElementById('editStatusesOverlay').classList.remove('open');
}

// function deleteRow(icon){
//   const row = icon.closest('.column-row');
//   row.remove(); 
// }

function saveStatusesChanges(){
  const statuses = Array.from(document.querySelectorAll('#statusRows .column-row')).map(row => {
    const span = row.querySelector('.column-name');
    const input = row.querySelector('input');
    return span ? span.textContent : input.value;
  });

  closeEditStatusesModal();
}

if(document.getElementById('editStatusesOverlay')){
  document.getElementById('editStatusesOverlay').addEventListener('click', function(e){
    if(e.target === this){
      closeEditStatusesModal();
    }
  });
}

function openAddStatusModal() {
    document.getElementById('addStatusOverlay').classList.add('open');
}

function closeAddStatusModal() {
    document.getElementById('addStatusOverlay').classList.remove('open');
    document.getElementById('newStatusName').value = '';
    document.getElementById('newStatusKey').value = '';
    document.getElementById('newStatusColor').value = '#f4b400';
}

function submitNewStatus() {
    const name = document.getElementById('newStatusName').value.trim();
    const color = document.getElementById('newStatusColor').value;
    const key = document.getElementById('newStatusKey').value.trim();

    // if (!name) {
    //     alert('من فضلك اكتب اسم الحالة');
    //     return;
    // }

    const data = { name, color, key };

    closeAddStatusModal();
}

if(document.getElementById('addStatusOverlay')){
  document.getElementById('addStatusOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeAddStatusModal();
      }
  });
}

function openAddStatusOptionModal() {
    document.getElementById('addStatusOptionOverlay').classList.add('open');
}

function closeAddStatusOptionModal() {
    document.getElementById('addStatusOptionOverlay').classList.remove('open');
    document.getElementById('statusOptionName').value = '';
    document.getElementById('statusOptionKey').value = '';
    document.getElementById('statusOptionColor').value = '#f4b400';
}

function submitStatusOption() {
    const name = document.getElementById('statusOptionName').value.trim();
    const color = document.getElementById('statusOptionColor').value;
    const key = document.getElementById('statusOptionKey').value.trim();

    // if (!name) {
    //     alert('من فضلك اكتب اسم الحالة');
    //     return;
    // }

    const data = { name, color, key };
    closeAddStatusOptionModal();
}

if(document.getElementById('addStatusOptionOverlay')){
  document.getElementById('addStatusOptionOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeAddStatusOptionModal();
      }
  });
}

function openAiInstructionsModal(){
  document.getElementById('aiInstructionsOverlay').classList.add('open');
}

function closeAiInstructionsModal(){
  document.getElementById('aiInstructionsOverlay').classList.remove('open');
}

function saveAiInstructions(){
  const instructions = document.getElementById('aiInstructionsText').value.trim();

//   if(!instructions){
//     alert('من فضلك اكتب التعليمات');
//     return;
//   }

  closeAiInstructionsModal();
}

if(document.getElementById('aiInstructionsOverlay')){
  document.getElementById('aiInstructionsOverlay').addEventListener('click', function(e){
    if(e.target === this){
      closeAiInstructionsModal();
    }
  });
}


// update role modal
function openModal(id) {
    document.getElementById(id)?.classList.add('open');
}

function closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
}

function openUpdateRoleModal() {
    openModal('updateClientRoleOverlay');
}

function closeUpdateRoleModal() {
    closeModal('updateClientRoleOverlay');
}

function submitUpdateRole() {
    const role = document.getElementById('modalStatusLabel')?.textContent;
    console.log(role);
    closeUpdateRoleModal();
}

// إقفال المودال لو دوست في الخلفية السودا حوالين الكارت
if(document.getElementById('updateClientRoleOverlay')){
document.getElementById('updateClientRoleOverlay')?.addEventListener('click', function (e) {
    if (e.target === this) {
            closeUpdateRoleModal();
        }
    });
}



function openChangePlanModal() {
    document.getElementById('changePlanOverlay').classList.add('open');
}
function closeChangePlanModal() {
    document.getElementById('changePlanOverlay').classList.remove('open');
}
function selectPlan(planName) {
    console.log('ترقية إلى:', planName);
    closeChangePlanModal();
}
if(document.getElementById('changePlanOverlay')){
  document.getElementById('changePlanOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeChangePlanModal();
  });
}


function openCancelSubModal() {
    document.getElementById('cancelSubOverlay').classList.add('open');
}
function closeCancelSubModal() {
    document.getElementById('cancelSubOverlay').classList.remove('open');
}
function confirmCancelSub() {
    const selected = document.querySelector('input[name="cancelOption"]:checked')?.value;

    // cancelSubscriptionAPI(selected)
    console.log('إلغاء الاشتراك:', selected);

    closeCancelSubModal();
}

if(document.getElementById('cancelSubOverlay')){
  document.getElementById('cancelSubOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeCancelSubModal();
  });
}


// إعدادات مشتركة للشكل والألوان عشان تبقى متسقة في كل الشارتس
Chart.defaults.font.family = "Cairo, sans-serif";
Chart.defaults.color = "#8b93a8";

const gridColor = "rgba(255,255,255,0.05)";

/* 1) رسائل الذكاء الاصطناعي — Bar Chart */
new Chart(document.getElementById('aiMessagesChart'), {
  type: 'bar',
  data: {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [{
      data: [55, 40, 55, 55, 75, 55, 40, 55, 55, 75],
      backgroundColor: '#2E9CE0',
      borderRadius: 6,
      barThickness: 50,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: gridColor }, ticks: { stepSize: 25 } }
    }
  }
});

/* 2) عدد المحادثات — Line/Area Chart */
new Chart(document.getElementById('conversationsChart'), {
  type: 'line',
  data: {
    labels: ['', '', '', '', '', '', '', ''],
    datasets: [{
      data: [20, 45, 15, 60, 30, 70, 35, 55],
      borderColor: '#2E9CE0',
      backgroundColor: 'rgba(46,156,224,0.25)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#2E9CE0',
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: gridColor } }
    }
  }
});

/* 3) المستخدمين القاضين — Donut Chart */
new Chart(document.getElementById('usersDonutChart'), {
  type: 'doughnut',
  data: {
    labels: ['عدد المستخدمين القاضين', 'عدد المستخدمين السعداء'],
    datasets: [{
      data: [30, 70],
      backgroundColor: ['#00B7FF', '#0a2540'],
      borderWidth: 0,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: { legend: { display: false } }
  }
});

/* 4) العملاء المستخلصين — Horizontal Bar Chart */
new Chart(document.getElementById('clientsBarChart'), {
  type: 'bar',
  data: {
    labels: ['', '', ''],
    datasets: [{
      data: [55, 25, 70],
      backgroundColor: '#2E9CE0',
      borderRadius: 6,
      barThickness: 40,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gridColor } },
      y: { grid: { display: false } }
    }
  }
});


