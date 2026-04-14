const tabs = document.querySelectorAll('.nav-link');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.getAttribute('data-target');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
}

const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let y = currentYear; y <= currentYear + 10; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
}

document.getElementById("saveTask").addEventListener("click", () => {
    const taskName = document.querySelector("input[aria-label='Sizing example input']").value;
    const taskSubject = document.querySelectorAll("input[aria-label='Sizing example input']")[1].value;
    const statusSelect = document.getElementById("inputGroupSelect01");
    const statusText = statusSelect.options[statusSelect.selectedIndex].text;
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").options[document.getElementById("month").selectedIndex].text;
    const year = document.getElementById("year").value;

    if (!taskName || !taskSubject || !day || !month || !year || statusSelect.value === "") {
        alert("Lengkapi semua field sebelum menyimpan!");
        return;
    }

    const deadline = `${day} ${month} ${year}`;

    const tableBody = document.querySelector("#all-tasks tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${tableBody.rows.length + 1}</td>
    <td>${taskName}</td>
    <td>${taskSubject}</td>
    <td>${statusText}</td>
    <td>${deadline}</td>
    <td><button class="btn-delete">Delete</button></td>
`;
    tableBody.appendChild(newRow);

if (statusText === "Not Done") {
    document.querySelector("#by-status .card:nth-child(1) .list-group")
        .innerHTML += `<li class="list-group-item">${taskName}</li>`;
} else if (statusText === "On Progress") {
    document.querySelector("#by-status .card:nth-child(2) .list-group")
        .innerHTML += `<li class="list-group-item">${taskName}</li>`;
} else if (statusText === "Done") {
    document.querySelector("#by-status .card:nth-child(3) .list-group")
        .innerHTML += `<li class="list-group-item">${taskName}</li>`;
}

    const byDateContainer = document.querySelector("#by-date");
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-header">${deadline}</div>
        <ul class="list-group">
            <li class="list-group-item">${taskName}</li>
        </ul>
    `;
    byDateContainer.appendChild(card);

    alert("Task berhasil disimpan!");
});
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const row = e.target.closest("tr");
        const taskName = row.children[1].textContent;

        row.remove();

        document.querySelectorAll("#by-status .list-group-item").forEach(item => {
            if (item.textContent.includes(taskName)) {
                item.remove();
            }
        });

        document.querySelectorAll("#by-date .list-group-item").forEach(item => {
            if (item.textContent.includes(taskName)) {
                item.remove();
            }
        });
    }
});
