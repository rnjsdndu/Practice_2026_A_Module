const $ = e => document.querySelector(e);
const $$ = e => [...document.querySelectorAll(e)];

const canvas = $('#canvas');
const ctx = canvas.getContext('2d');
const legend = $('#legend');
const labelInput = $('#labelInput');
const valueInput = $('#valueInput');
const addBtn = $$('button')[0];
const clearBtn = $$('button')[1];

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e2'];

let data = [
    { label: 'A', value: 50 },
    { label: 'B', value: 25 },
    { label: 'C', value: 25 }
];

function init() {
    drawPieChart();
    bindEvents();
}

function drawPieChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    if (total === 0) {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.fillText('데이터를 추가하세요', canvas.width / 2, canvas.height / 2);
        updateLegend(0);
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    
    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        const percentage = (item.value / total) * 100;
        if (percentage >= 5) {
            const textAngle = currentAngle + sliceAngle / 2;
            const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
            const textY = centerY + Math.sin(textAngle) * (radius * 0.7);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percentage.toFixed(1) + '%', textX, textY);
        }
        
        currentAngle += sliceAngle;
    });

    updateLegend(total);
}

function updateLegend(total) {
    if (total === 0) {
        legend.innerHTML = '';
        return;
    }

    legend.innerHTML = '';
    
    data.forEach((item, index) => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${colors[index % colors.length]}"></div>
            <span>${item.label} (${percentage}%)</span>
        `;
        legend.appendChild(legendItem);
    });
}

function addData() {
    const label = labelInput.value.trim();
    const value = parseFloat(valueInput.value);
    
    if (!label || !value || value <= 0) {
        alert('항목명과 양수 값을 입력하세요');
        return;
    }
    
    data.push({ label, value });
    drawPieChart();
    
    labelInput.value = '';
    valueInput.value = '';
    labelInput.focus();
}

function clearData() {
    data = [];
    drawPieChart();
}

function bindEvents() {
    addBtn.addEventListener('click', addData);
    clearBtn.addEventListener('click', clearData);
    
    valueInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addData();
    });
}

init();