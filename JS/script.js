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

// 初始化病患列表
patients.forEach(patient => {
  const listItem = document.createElement('li');
  listItem.textContent = `病患 ${patient.number}`;
  patientList.appendChild(listItem);
});

function callNextPatient() {
  if (currentPatientIndex < patients.length) {
      let nextPatient;
      let nextPatientIndex = -1;

      // 優先呼叫VIP病患
      for (let i = currentPatientIndex; i < patients.length; i++) {
          if (patients[i].type === 'vip') {
              nextPatient = patients[i];
              nextPatientIndex = i;
              break;
          }
      }

      // 其次呼叫敬老病患
      if (!nextPatient) {
          for (let i = currentPatientIndex; i < patients.length; i++) {
              if (patients[i].type === 'elderly') {
                  nextPatient = patients[i];
                  nextPatientIndex = i;
                  break;
              }
          }
      }

      // 最後呼叫一般病患
      if (!nextPatient) {
          nextPatient = patients[currentPatientIndex];
          nextPatientIndex = currentPatientIndex;
      }

      if (nextPatient) {
          // 移除先前呼叫病患的紅色標記
          const previousListItem = patientList.querySelector('.current-call');
          if (previousListItem) {
              previousListItem.classList.remove('current-call');
          }

          const nextListItem = patientList.childNodes[nextPatientIndex];

          // 增加當前呼叫的紅色標記
          if (nextListItem && nextListItem.nodeName === 'LI' && nextListItem.classList) {
              nextListItem.classList.add('current-call');
          }

          displayNumber.textContent = `呼叫病患 ${nextPatient.number}`;
          currentPatientIndex = nextPatientIndex + 1;
      }
  } else {
      displayNumber.textContent = '所有病患已呼叫完畢';
  }
}

function addPatient(event) {
  event.preventDefault();
  const newPatientNumber = document.getElementById('patient-number').value.trim();
  if (newPatientNumber !== '' && !patients.some(patient => patient.number === newPatientNumber)) {
      patients.push({ number: newPatientNumber, type: 'regular' });
      const newListItem = document.createElement('li');
      newListItem.textContent = `病患 ${newPatientNumber}`;
      patientList.appendChild(newListItem);
      document.getElementById('patient-number').value = '';
      alert(`病患 ${newPatientNumber} 已新增`);
  } else {
      alert('請輸入有效的病患編號或編號已存在');
  }
}

function insertVipPatient(event) {
  event.preventDefault();
  const vipNumber = document.getElementById('patient-number').value.trim();
  if (vipNumber !== '' && !patients.some(patient => patient.number === vipNumber)) {
      patients.splice(currentPatientIndex, 0, { number: vipNumber, type: 'vip' });
      const newListItem = document.createElement('li');
      newListItem.textContent = `病患 ${vipNumber} (VIP)`;
      patientList.insertBefore(newListItem, patientList.childNodes[currentPatientIndex]);
      document.getElementById('patient-number').value = '';
      alert(`VIP病患 ${vipNumber} 已插入`);
  } else {
      alert('請輸入有效的VIP病患編號或編號已存在');
  }
}

function insertElderlyPatient(event) {
  event.preventDefault();
  const elderlyNumber = document.getElementById('patient-number').value.trim();
  if (elderlyNumber !== '' && !patients.some(patient => patient.number === elderlyNumber)) {
      let insertIndex = currentPatientIndex;
      while (insertIndex < patients.length && patients[insertIndex].type === 'vip') {
          insertIndex++;
      }

      patients.splice(insertIndex, 0, { number: elderlyNumber, type: 'elderly' });
      const newListItem = document.createElement('li');
      newListItem.textContent = `病患 ${elderlyNumber} (敬老)`;
      patientList.insertBefore(newListItem, patientList.childNodes[insertIndex]);
      document.getElementById('patient-number').value = '';
      alert(`敬老病患 ${elderlyNumber} 已插入`);
  } else {
      alert('請輸入有效的敬老病患編號或編號已存在');
  }
}

function choosePatient(event) {
  event.preventDefault();
  const selectedNumber = document.getElementById('selected-number').value.trim();
  const selectedIndex = patients.findIndex(patient => patient.number === selectedNumber);
  if (selectedIndex !== -1) {
      currentPatientIndex = selectedIndex;
      displayNumber.textContent = `選擇病患 ${selectedNumber}`;
      // 更新紅色標記
      const previousListItem = patientList.querySelector('.current-call');
      if (previousListItem) {
          previousListItem.classList.remove('current-call');
      }
      const currentListItem = patientList.childNodes[currentPatientIndex];
      if (currentListItem && currentListItem.nodeName === 'LI' && currentListItem.classList) {
          currentListItem.classList.add('current-call');
      }
    } else {
        alert('找不到該病患編號！');
    }
    document.getElementById('selected-number').value = '';
  }
