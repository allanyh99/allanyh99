const patients = ['001', '002', '003', '004', '005'];
let currentPatientIndex = 0;
const patientList = document.getElementById('patient-ul');
const displayNumber = document.getElementById('display-number');

// 初始化病患列表
patients.forEach(patient => {
    const listItem = document.createElement('li');
    listItem.textContent = `病患 ${patient}`;
    patientList.appendChild(listItem);
});

function callNextPatient() {
    if (currentPatientIndex < patients.length) {
        const currentListItem = patientList.childNodes[currentPatientIndex];
        const nextListItem = patientList.childNodes[currentPatientIndex - 1];

        // 增加當前呼叫的紅色標記
        if (currentListItem && currentListItem.nodeName === 'LI' && currentListItem.classList) {
            currentListItem.classList.add('current-call');
        }

        const nextPatient = patients[currentPatientIndex];
        displayNumber.textContent = `呼叫病患 ${nextPatient}`;
        currentPatientIndex++;
    } else {
        displayNumber.textContent = '所有病患已呼叫完畢';
    }
}

function addPatient(event) {
    event.preventDefault();
    const newPatientNumber = document.getElementById('patient-number').value;
    if (newPatientNumber.trim() !== '') {
        patients.push(newPatientNumber);
        const newListItem = document.createElement('li');
        newListItem.textContent = `病患 ${newPatientNumber}`;
        patientList.appendChild(newListItem);
        document.getElementById('patient-number').value = '';
    }
}

function insertVipPatient(event) {
    event.preventDefault();
    const vipNumber = prompt('請輸入VIP病患編號：');
    if (vipNumber && vipNumber.trim() !== '') {
        patients.splice(currentPatientIndex, 0, vipNumber);
        const newListItem = document.createElement('li');
        newListItem.textContent = `病患 ${vipNumber} (VIP)`;
        patientList.insertBefore(newListItem, patientList.childNodes[currentPatientIndex]);
    }
}

function choosePatient(event) {
    event.preventDefault();
    const selectedNumber = document.getElementById('selected-number').value;
    const selectedIndex = patients.indexOf(selectedNumber);
    if (selectedIndex !== -1) {
        currentPatientIndex = selectedIndex;
        displayNumber.textContent = `選擇病患 ${selectedNumber}`;
    } else {
        alert('找不到該病患編號！');
    }
    document.getElementById('selected-number').value = '';
}
