function displaySetup(title) {
    document.getElementById('quizTitle').innerText = title;
    document.getElementById('ganttSection').style.display = 'block';
    document.getElementById('tableSection').style.display = 'block';
}

function renderGantt(data) {
    const chart = document.getElementById('ganttChart');
    chart.innerHTML = '';
    let start = 0;
    data.forEach(p => {
        const block = document.createElement('div');
        block.className = 'gantt-block';
        block.style.flex = p.bt;
        block.innerHTML = `P${p.id}<span class="gantt-time-start">${start}</span><span class="gantt-time-end">${p.ct}</span>`;
        start = p.ct;
        chart.appendChild(block);
    });
}

async function fetchQuiz1(type) {
    displaySetup(`Quiz 1: ${type} Scheduling (Fetched from Server)`);
    const res = await fetch('/api/quiz1');
    let processes = await res.json();
    
    if(type === 'SJF') {
        processes.sort((a, b) => a.bt - b.bt);
    }

    let currentTime = 0, totalWT = 0, result = [];
    processes.forEach(p => {
        let wt = currentTime;
        let ct = currentTime + p.bt;
        totalWT += wt;
        result.push({ id: p.id, bt: p.bt, ct, tat: ct, wt });
        currentTime = ct;
    });

    renderTable(['Process', 'Burst Time', 'Completion Time', 'Turnaround Time', 'Waiting Time'], result);
    renderGantt(result);
    document.getElementById('statsSection').innerText = `💡 Average Waiting Time = ${(totalWT / result.length).toFixed(2)}`;
}

async function fetchQuiz2() {
    displaySetup("Quiz 2: Non-Preemptive Priority Scheduling (Fetched from Server)");
    const res = await fetch('/api/quiz2');
    let processes = await res.json();
    
    processes.sort((a, b) => a.priority - b.priority);

    let currentTime = 0, totalWT = 0, totalTAT = 0, result = [];
    processes.forEach(p => {
        let wt = currentTime;
        let ct = currentTime + p.bt;
        let tat = wt + p.bt;
        totalWT += wt;
        totalTAT += tat;
        result.push({ id: p.id, bt: p.bt, priority: p.priority, ct, tat, wt });
        currentTime = ct;
    });

    renderTable(['Process', 'Burst Time', 'Priority', 'Completion Time', 'Turnaround Time', 'Waiting Time'], result);
    renderGantt(result);
    document.getElementById('statsSection').innerHTML = `💡 Average Waiting Time = ${(totalWT / result.length).toFixed(2)}<br>🎯 Average Turnaround Time = ${(totalTAT / result.length).toFixed(2)}`;
}

function renderTable(headers, rows) {
    const thead = document.getElementById('tableHead');
    const tbody = document.getElementById('tableBody');
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    tbody.innerHTML = rows.map(r => `
        <tr>
            <td><strong>P${r.id}</strong></td>
            <td>${r.bt}</td>
            ${r.priority !== undefined ? `<td>${r.priority}</td>` : ''}
            <td>${r.ct}</td>
            <td>${r.tat}</td>
            <td>${r.wt}</td>
        </tr>
    `).join('');
}
