// 初始化病患列表，包含類型資訊
const patients = [
    { number: '001', type: 'regular' },
    { number: '002', type: 'regular' },
    { number: '003', type: 'regular' },
    { number: '004', type: 'regular' },
    { number: '005', type: 'regular' }
];

let currentPatientIndex = 0;
const patientList = document.getElementById('patient-ul');
const displayNumber = document.getElementById('display-number');

// 初始化病患列表顯示
function initializePatientList() {
    patientList.innerHTML = ''; // 清空列表
    patients.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.textContent = `病患 ${patient.number} (${patient.type})`;
        patientList.appendChild(listItem);
    });
}

// 呼叫下一位病患
function callNextPatient() {
    if (currentPatientIndex < patients.length) {
        // 根據類型排序：VIP > 敬老 > 一般
        const sortedPatients = patients.slice(currentPatientIndex).sort((a, b) => {
            const priority = { 'vip': 1, 'elderly': 2, 'regular': 3 };
            return priority[a.type] - priority[b.type];
        });

        const nextPatient = sortedPatients[0];
        displayNumber.textContent = `呼叫病患 ${nextPatient.number} (${nextPatient.type})`;

        // 更新當前病患索引
        currentPatientIndex = patients.findIndex(patient => patient.number === nextPatient.number) + 1;

        // 更新列表顯示
        initializePatientList();
        const currentListItem = patientList.childNodes[currentPatientIndex - 1];
        if (currentListItem && currentListItem.nodeName === 'LI' && currentListItem.classList) {
            currentListItem.classList.add('current-call');
        }
    } else {
        displayNumber.textContent = '所有病患已呼叫完畢';
    }
}

// 新增一般病患
function addPatient(event) {
    event.preventDefault();
    const newPatientNumber = document.getElementById('patient-number').value.trim();
    if (newPatientNumber !== '' && !patients.some(patient => patient.number === newPatientNumber)) {
        patients.push({ number: newPatientNumber, type: 'regular' });
        initializePatientList();
        document.getElementById('patient-number').value = '';
    } else {
        alert('請輸入有效的病患編號或編號已存在');
    }
}

// 插入 VIP 病患
function insertVipPatient(event) {
    event.preventDefault();
    const vipNumber = document.getElementById('patient-number').value.trim();
    if (vipNumber !== '' && !patients.some(patient => patient.number === vipNumber)) {
        patients.splice(currentPatientIndex, 0, { number: vipNumber, type: 'vip' });
        initializePatientList();
        document.getElementById('patient-number').value = '';
    } else {
        alert('請輸入有效的 VIP 病患編號或編號已存在');
    }
}

// 插入敬老病患
function insertElderlyPatient(event) {
    event.preventDefault();
    const elderlyNumber = document.getElementById('patient-number').value.trim();
    if (elderlyNumber !== '' && !patients.some(patient => patient.number === elderlyNumber)) {
        // 插入到當前索引位置
        patients.splice(currentPatientIndex, 0, { number: elderlyNumber, type: 'elderly' });
        initializePatientList();
        document.getElementById('patient-number').value = '';
    } else {
        alert('請輸入有效的敬老病患編號或編號已存在');
    }
}

// 選擇特定病患
function choosePatient(event) {
    event.preventDefault();
    const selectedNumber = document.getElementById('selected-number').value.trim();
    const selectedIndex = patients.findIndex(patient => patient.number === selectedNumber);
    if (selectedIndex !== -1) {
        currentPatientIndex = selectedIndex;
        displayNumber.textContent = `選擇病患 ${selectedNumber} (${patients[selectedIndex].type})`;
        initializePatientList();
    } else {
        alert('找不到該病患編號！');
    }
    document.getElementById('selected-number').value = '';
}

// 初始化病患列表顯示
initializePatientList();
