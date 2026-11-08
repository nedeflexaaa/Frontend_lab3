const initialProjects = [
    { id: "PRJ-01", name: "Smart City Hub", country: "Україна", teamSize: 8, durationMonths: 14, cost: 220 },
    { id: "PRJ-02", name: "HealthLink AI", country: "Німеччина", teamSize: 12, durationMonths: 18, cost: 260 },
    { id: "PRJ-03", name: "FinGuard", country: "Велика Британія", teamSize: 14, durationMonths: 20, cost: 500 },
    { id: "PRJ-04", name: "RetailPulse", country: "Велика Британія", teamSize: 13, durationMonths: 16, cost: 200 },
    { id: "PRJ-05", name: "EduWave", country: "США", teamSize: 10, durationMonths: 12, cost: 150 },
    { id: "PRJ-06", name: "AgroSense", country: "Канада", teamSize: 7, durationMonths: 10, cost: 170 },
    { id: "PRJ-07", name: "GreenGrid", country: "Бразилія", teamSize: 9, durationMonths: 16, cost: 210 },
    { id: "PRJ-08", name: "MobilityOne", country: "Японія", teamSize: 11, durationMonths: 15, cost: 350 },
    { id: "PRJ-09", name: "AquaTrack", country: "Індія", teamSize: 6, durationMonths: 8, cost: 95 },
    { id: "PRJ-10", name: "MediTrack", country: "Індія", teamSize: 6, durationMonths: 11, cost: 110 }
];

const initialUsers = [
    ["Шевченко", "Олена", 42, "вища", 120, "2026-10-12", "10:15"],
    ["Коваль", "Іван", 38, "вища", 90, "2026-02-03", "14:40"],
    ["Бондар", "Марія", 51, "середня", 150, "2026-03-18", "09:05"],
    ["Ткаченко", "Петро", 63, "вища", 210, "2026-07-18", "11:20"],
    ["Мельник", "Оксана", 58, "вища", 180, "2026-08-02", "16:10"],
    ["Кравчук", "Андрій", 29, "вища", 75, "2026-11-05", "18:30"],
    ["Лисенко", "Наталія", 60, "вища", 320, "2026-06-14", "12:00"],
    ["Гриценко", "Сергій", 55, "середня", 60, "2026-12-01", "08:50"],
    ["Романенко", "Ірина", 34, "вища", 240, "2026-03-09", "15:25"],
    ["Павленко", "Олег", 67, "середня", 100, "2026-01-20", "09:45"]
];

class UserAccount {
    constructor(surname, name, age, education, detailsLength, date, time) {
        this.surname = surname;
        this.name = name;
        this.age = Number(age);
        this.education = education;
        this.detailsLength = Number(detailsLength);
        this.date = date;
        this.time = time;
        this.contactedAt = new Date(`${date}T${time}:00`);
    }

    get fullName() {
        return `${this.surname} ${this.name}`;
    }

    get birthYear() {
        return new Date().getFullYear() - this.age;
    }

    get season() {
        switch (this.contactedAt.getMonth()) {
            case 11:
            case 0:
            case 1:
                return "зима";
            case 2:
            case 3:
            case 4:
                return "весна";
            case 5:
            case 6:
            case 7:
                return "літо";
            default:
                return "осінь";
        }
    }

    get category() {
        if (this.age >= 35 && this.age <= 55 && ["осінь", "зима", "весна"].includes(this.season)) {
            return "Бізнес-активні середнього віку";
        }
        if (this.season === "літо") {
            return "Бізнес-пасивні похилого";
        }
        return "Інші";
    }

    get formattedDate() {
        return this.contactedAt.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    get workingHours() {
        const minutes = this.contactedAt.getHours() * 60 + this.contactedAt.getMinutes();
        return minutes >= 540 && minutes <= 1080;
    }
}

class UserDirectory {
    constructor(accounts) {
        this.accounts = accounts;
    }

    filterByMonthAndTime(month, from, to) {
        return this.accounts.filter((account) => {
            const sameMonth = account.contactedAt.getMonth() === Number(month);
            return sameMonth && account.time >= from && account.time <= to;
        });
    }

    getMaxDetailsUser() {
        return this.accounts.reduce((maximum, account) => {
            return account.detailsLength > maximum.detailsLength ? account : maximum;
        }, this.accounts[0]);
    }

    getCategoryCounts() {
        return this.accounts.reduce((counts, account) => {
            counts[account.category] = (counts[account.category] || 0) + 1;
            return counts;
        }, {});
    }

    sortedAlphabetically() {
        return [...this.accounts].sort((first, second) => {
            return first.fullName.localeCompare(second.fullName, "uk");
        });
    }
}

const monthNames = Array.from({ length: 12 }, (_, index) => {
    return new Intl.DateTimeFormat("uk-UA", { month: "long" }).format(new Date(2026, index, 1));
});

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const formatMoney = function (value) {
    return `${Number(value).toLocaleString("uk-UA", { maximumFractionDigits: 2 })} тис. $`;
};

const escapeHtml = (value) => {
    const symbols = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(value).replace(/[&<>"']/g, (symbol) => symbols[symbol]);
};

function getContinent(country) {
    switch (country) {
        case "Україна":
        case "Німеччина":
        case "Велика Британія":
            return "Європа";
        case "США":
        case "Канада":
            return "Північна Америка";
        case "Бразилія":
            return "Південна Америка";
        case "Японія":
        case "Індія":
            return "Азія";
        default:
            return "Не визначено";
    }
}

const compareProjects = (first, second) => {
    return first.country.localeCompare(second.country, "uk") || first.name.localeCompare(second.name, "uk");
};

function sortProjectsByCountry(list) {
    return [...list].sort(compareProjects);
}

function groupProjectsByTeam(list) {
    const groups = new Map();
    for (const project of list) {
        const key = `${project.country} / ${project.teamSize}`;
        if (!groups.has(key)) {
            groups.set(key, { country: project.country, teamSize: project.teamSize, items: [] });
        }
        groups.get(key).items.push(project);
    }
    return [...groups.values()].map((group) => {
        const total = group.items.reduce((sum, project) => sum + project.cost, 0);
        return {
            ...group,
            average: Math.round((total / group.items.length) * 100) / 100
        };
    });
}

function calculateNewCosts(list) {
    return list.map((project) => {
        const others = list.filter((item) => item.id !== project.id);
        const country = getContinent(project.country);
        const sameCountryLower = others.some((item) => {
            return item.country === project.country && item.cost < project.cost;
        });
        const sameContinentLower = others.some((item) => {
            return item.country !== project.country &&
                getContinent(item.country) === country &&
                item.teamSize > project.teamSize &&
                item.cost < project.cost;
        });
        const otherContinentLower = others.some((item) => {
            return getContinent(item.country) !== country &&
                item.teamSize > project.teamSize &&
                item.cost < project.cost;
        });
        const otherContinentHigher = others.some((item) => {
            return getContinent(item.country) !== country &&
                item.teamSize > project.teamSize &&
                item.cost > project.cost;
        });
        let multiplier = 1;
        let rule = "без змін";
        if (sameCountryLower) {
            multiplier = 0.8;
            rule = "та ж країна, менша вартість";
        } else if (sameContinentLower) {
            multiplier = 1.4;
            rule = "той самий континент, більша команда, менша вартість";
        } else if (otherContinentLower) {
            multiplier = 1.6;
            rule = "різні континенти, більша команда, менша вартість";
        } else if (otherContinentHigher) {
            multiplier = 2;
            rule = "різні континенти, більша команда, більша вартість";
        }
        return {
            ...project,
            oldCost: project.cost,
            multiplier,
            rule,
            newCost: Math.round(project.cost * multiplier * 100) / 100
        };
    });
}

function nextProjectId() {
    let number = projects.length + 1;
    let id = `PRJ-${String(number).padStart(2, "0")}`;
    while (projects.some((project) => project.id === id)) {
        number += 1;
        id = `PRJ-${String(number).padStart(2, "0")}`;
    }
    return id;
}

let projects = initialProjects.map((project) => ({ ...project }));
let users = initialUsers.map((data) => new UserAccount(...data));
let directory = new UserDirectory(users);
let costResults = calculateNewCosts(projects);

const projectsTable = document.querySelector("#projectsTable");
const teamAverages = document.querySelector("#teamAverages");
const costTable = document.querySelector("#costTable");
const maxTeamValue = document.querySelector("#maxTeamValue");
const maxTeamNote = document.querySelector("#maxTeamNote");
const maxTeamId = document.querySelector("#maxTeamId");
const maxTeamName = document.querySelector("#maxTeamName");
const teamAverageValue = document.querySelector("#teamAverageValue");
const teamAverageNote = document.querySelector("#teamAverageNote");
const projectCount = document.querySelector("#projectCount");
const projectForm = document.querySelector("#projectForm");
const projectStatus = document.querySelector("#projectStatus");
const monthFilter = document.querySelector("#monthFilter");
const timeFrom = document.querySelector("#timeFrom");
const timeTo = document.querySelector("#timeTo");
const filterPeriod = document.querySelector("#filterPeriod");
const filteredUsers = document.querySelector("#filteredUsers");
const filteredCaption = document.querySelector("#filteredCaption");
const sortedUsers = document.querySelector("#sortedUsers");
const classTable = document.querySelector("#classTable");
const maxDetailsValue = document.querySelector("#maxDetailsValue");
const maxDetailsNote = document.querySelector("#maxDetailsNote");
const activeCount = document.querySelector("#activeCount");
const passiveCount = document.querySelector("#passiveCount");
const otherCount = document.querySelector("#otherCount");

function renderProjects() {
    const sorted = sortProjectsByCountry(projects);
    const maxTeam = Math.max(...projects.map((project) => project.teamSize));
    const maxProject = projects.find((project) => project.teamSize === maxTeam);
    const teamGroups = groupProjectsByTeam(sorted);
    const repeatedGroup = teamGroups.find((group) => group.items.length > 1) || teamGroups[0];

    maxTeamValue.textContent = `${maxTeam} осіб`;
    maxTeamNote.textContent = `${maxProject.name} · ${maxProject.country}`;
    maxTeamId.textContent = maxProject.id;
    maxTeamName.textContent = maxProject.name;
    teamAverageValue.textContent = formatMoney(repeatedGroup.average);
    teamAverageNote.textContent = `${repeatedGroup.country} · ${repeatedGroup.teamSize} осіб · ${repeatedGroup.items.length} проєкти`;
    projectCount.textContent = String(projects.length);

    projectsTable.innerHTML = sorted.map((project) => {
        return `<tr>
            <td><strong>${escapeHtml(project.id)}</strong></td>
            <td>${escapeHtml(project.name)}</td>
            <td>${escapeHtml(project.country)}</td>
            <td>${escapeHtml(getContinent(project.country))}</td>
            <td>${escapeHtml(project.teamSize)}</td>
            <td>${escapeHtml(project.durationMonths)} міс.</td>
            <td>${formatMoney(project.cost)}</td>
        </tr>`;
    }).join("");

    teamAverages.innerHTML = teamGroups.map((group) => {
        return `<tr>
            <td>${escapeHtml(group.country)}</td>
            <td>${escapeHtml(group.teamSize)} осіб</td>
            <td>${group.items.length}</td>
            <td>${formatMoney(group.average)}</td>
        </tr>`;
    }).join("");

    renderCosts();
}

function renderCosts() {
    costResults = calculateNewCosts(projects);
    const withNames = sortProjectsByCountry(costResults);
    costTable.innerHTML = withNames.map((project) => {
        return `<tr>
            <td>${escapeHtml(project.name)}</td>
            <td>${formatMoney(project.oldCost)}</td>
            <td><span class="badge">${project.multiplier}×</span></td>
            <td><strong>${formatMoney(project.newCost)}</strong></td>
        </tr>`;
    }).join("");
}

function badgeClass(category) {
    if (category === "Бізнес-активні середнього віку") {
        return "badge badge-active";
    }
    if (category === "Бізнес-пасивні похилого") {
        return "badge badge-passive";
    }
    return "badge badge-other";
}

function renderUsers() {
    const month = Number(monthFilter.value);
    const from = timeFrom.value || "00:00";
    const to = timeTo.value || "23:59";
    const selected = directory.filterByMonthAndTime(month, from, to);
    const maximum = directory.getMaxDetailsUser();
    const counts = directory.getCategoryCounts();

    filterPeriod.textContent = `${capitalize(monthNames[month])} · ${from}–${to}`;
    filteredCaption.textContent = `Звернення: ${monthNames[month]}, ${from}–${to} (${selected.length})`;
    filteredUsers.innerHTML = selected.length
        ? selected.map((user) => {
            return `<tr>
                <td>${escapeHtml(user.surname)}</td>
                <td>${escapeHtml(user.name)}</td>
                <td>${user.age}</td>
                <td>${escapeHtml(user.education)}</td>
                <td>${user.detailsLength}</td>
                <td>${escapeHtml(user.formattedDate)}</td>
                <td>${escapeHtml(user.time)}</td>
                <td><span class="${badgeClass(user.category)}">${escapeHtml(user.category)}</span></td>
            </tr>`;
        }).join("")
        : `<tr><td colspan="8">За вибраний місяць і період часу звернень немає.</td></tr>`;

    maxDetailsValue.textContent = `${maximum.detailsLength} символів`;
    maxDetailsNote.textContent = `${maximum.fullName} · ${maximum.age} років · ${maximum.education} освіта`;
    activeCount.textContent = String(counts["Бізнес-активні середнього віку"] || 0);
    passiveCount.textContent = String(counts["Бізнес-пасивні похилого"] || 0);
    otherCount.textContent = String(counts["Інші"] || 0);

    sortedUsers.innerHTML = directory.sortedAlphabetically().map((user) => {
        return `<tr>
            <td>${escapeHtml(user.fullName)}</td>
            <td>${user.age}</td>
            <td>${user.birthYear}</td>
            <td>${escapeHtml(user.education)}</td>
        </tr>`;
    }).join("");

    classTable.innerHTML = [
        ["Бізнес-активні середнього віку", counts["Бізнес-активні середнього віку"] || 0],
        ["Бізнес-пасивні похилого", counts["Бізнес-пасивні похилого"] || 0],
        ["Інші", counts["Інші"] || 0]
    ].map(([name, count]) => {
        return `<tr><td>${escapeHtml(name)}</td><td>${count}</td></tr>`;
    }).join("");
}

function typeExamples() {
    const values = [
        ["string", "JavaScript"],
        ["number", 42.5],
        ["boolean", true],
        ["undefined", undefined],
        ["symbol", Symbol("id")],
        ["bigint", 10n],
        ["object", { language: "JS" }],
        ["array", [1, 2, 3]],
        ["function", function example() {}],
        ["date", new Date(2026, 0, 1)],
        ["null", null]
    ];
    return values.map(([label, value]) => `${label}: ${typeof value}`);
}

function conversionExamples() {
    return [
        `Number("42.5") → ${Number("42.5")}`,
        `String(2026) → ${String(2026)}`,
        `Boolean(0) → ${Boolean(0)}`,
        `parseInt("15px", 10) → ${parseInt("15px", 10)}`,
        `parseFloat("3.14 kg") → ${parseFloat("3.14 kg")}`,
        `Number.isNaN(Number("abc")) → ${Number.isNaN(Number("abc"))}`
    ];
}

function operatorExamples() {
    let total = 10;
    total += 5;
    const afterAdd = total;
    total *= 2;
    const afterMultiply = total;
    total -= 4;
    const afterSubtract = total;
    total /= 2;
    const afterDivide = total;
    return [
        `10 + 5 = ${10 + 5}`,
        `10 - 4 = ${10 - 4}`,
        `10 * 3 = ${10 * 3}`,
        `10 / 4 = ${10 / 4}`,
        `10 % 3 = ${10 % 3}`,
        `2 ** 5 = ${2 ** 5}`,
        `total += 5 → ${afterAdd}`,
        `total *= 2 → ${afterMultiply}`,
        `total -= 4 → ${afterSubtract}`,
        `total /= 2 → ${afterDivide}`,
        `5 === 5 → ${5 === 5}`,
        `5 !== "5" → ${5 !== "5"}`,
        `3 < 4 → ${3 < 4}`,
        `4 >= 4 → ${4 >= 4}`,
        `"apple" < "banana" → ${"apple" < "banana"}`
    ];
}

function arrayExamples() {
    const values = [5, 2, 8, 1, 9, 3];
    const pushed = [...values];
    pushed.push(7);
    const sorted = [...values].sort((first, second) => first - second);
    const filtered = values.filter((value) => value > 4);
    const mapped = values.map((value) => value * 2);
    const reduced = values.reduce((sum, value) => sum + value, 0);
    const found = values.find((value) => value > 7);
    const some = values.some((value) => value % 2 === 0);
    const every = values.every((value) => value > 0);
    return [
        `push(7) → [${pushed.join(", ")}]`,
        `sort((a, b) => a - b) → [${sorted.join(", ")}]`,
        `filter(value > 4) → [${filtered.join(", ")}]`,
        `map(value * 2) → [${mapped.join(", ")}]`,
        `reduce(sum) → ${reduced}`,
        `find(value > 7) → ${found}`,
        `some(парне) → ${some}`,
        `every(> 0) → ${every}`,
        `join(" — ") → ${values.join(" — ")}`
    ];
}

function dateMathStringExamples() {
    const date = new Date(2026, 10, 6, 14, 35);
    return [
        `Date.toLocaleDateString("uk-UA") → ${date.toLocaleDateString("uk-UA")}`,
        `Date.getFullYear() → ${date.getFullYear()}`,
        `Date.getMonth() + 1 → ${date.getMonth() + 1}`,
        `Date.getDate() → ${date.getDate()}`,
        `Math.max(3, 7, 2) → ${Math.max(3, 7, 2)}`,
        `Math.min(3, 7, 2) → ${Math.min(3, 7, 2)}`,
        `Math.round(4.6) → ${Math.round(4.6)}`,
        `Math.floor(4.9) → ${Math.floor(4.9)}`,
        `"  JavaScript  ".trim() → "${"  JavaScript  ".trim()}"`,
        `"javascript".toUpperCase() → "${"javascript".toUpperCase()}"`,
        `"a,b,c".split(",") → [${"a,b,c".split(",").join(", ")}]`,
        `"Frontend".includes("end") → ${"Frontend".includes("end")}`,
        `"lab".padStart(5, "0") → "${"lab".padStart(5, "0")}"`
    ];
}

function implicitExamples() {
    return [
        `"5" + 2 → ${"5" + 2}`,
        `"5" - 2 → ${"5" - 2}`,
        `"5" * "2" → ${"5" * "2"}`,
        `"0" == false → ${"0" == false}`,
        `!"" → ${!""}`,
        `null + 1 → ${null + 1}`,
        `[] + {} → ${[] + {}}`
    ];
}

function hoistingExamples() {
    const lines = [];
    lines.push(`typeof beforeVar → ${typeof beforeVar}`);
    var beforeVar = 5;
    lines.push(`beforeVar after assignment → ${beforeVar}`);
    lines.push(`function before declaration → ${declaredBefore()}`);
    function declaredBefore() {
        return "доступна";
    }
    try {
        lines.push(`typeof beforeLet → ${typeof beforeLet}`);
    } catch (error) {
        lines.push(`beforeLet → ${error.name}`);
    }
    let beforeLet = 10;
    lines.push(`beforeLet after assignment → ${beforeLet}`);
    if (true) {
        var functionScoped = "var видно після блоку";
        let blockScoped = "let видно тільки в блоці";
        lines.push(blockScoped);
    }
    lines.push(functionScoped);
    try {
        lines.push(blockScoped);
    } catch (error) {
        lines.push(`blockScoped після блоку → ${error.name}`);
    }
    return lines;
}

function renderDemo() {
    document.querySelector("#demoTypes").textContent = typeExamples().join("\n");
    document.querySelector("#demoConversions").textContent = conversionExamples().join("\n");
    document.querySelector("#demoOperators").textContent = operatorExamples().join("\n");
    document.querySelector("#demoArray").textContent = arrayExamples().join("\n");
    document.querySelector("#demoDateMathString").textContent = dateMathStringExamples().join("\n");
    document.querySelector("#demoImplicit").textContent = implicitExamples().join("\n");
    document.querySelector("#demoHoisting").textContent = hoistingExamples().join("\n");
}

function initMonths() {
    monthFilter.innerHTML = monthNames.map((name, index) => {
        return `<option value="${index}">${capitalize(name)}</option>`;
    }).join("");
    monthFilter.value = "2";
}

document.querySelector("#recalcCosts").addEventListener("click", () => {
    renderCosts();
});

document.querySelector("#resetProjects").addEventListener("click", () => {
    projects = initialProjects.map((project) => ({ ...project }));
    costResults = calculateNewCosts(projects);
    projectForm.reset();
    projectStatus.textContent = "";
    projectStatus.className = "form-status";
    renderProjects();
});

document.querySelector("#filterUsers").addEventListener("click", () => {
    renderUsers();
});

document.querySelector("#resetUsers").addEventListener("click", () => {
    monthFilter.value = "2";
    timeFrom.value = "09:00";
    timeTo.value = "18:00";
    renderUsers();
});

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(projectForm);
    const values = ["id", "name", "country", "teamSize", "durationMonths", "cost"].map((name) => {
        return String(data.get(name) || "").trim();
    });
    const [id, name, country, teamSize, durationMonths, cost] = values;
    const complete = values.every((value) => value !== "");
    const nextProject = {
        id: id || nextProjectId(),
        name: name || "Без назви",
        country: country || "Не вказано",
        teamSize: Number(teamSize) || 0,
        durationMonths: Number(durationMonths) || 0,
        cost: Number(cost) || 0
    };

    if (complete) {
        const index = projects.findIndex((project) => project.cost > nextProject.cost);
        if (index === -1) {
            projects.push(nextProject);
        } else {
            projects.splice(index, 0, nextProject);
        }
        projectStatus.textContent = "Повний запис вставлено за зростанням вартості.";
        projectStatus.className = "form-status is-success";
    } else {
        projects.push(nextProject);
        projectStatus.textContent = "Неповний запис додано в кінець списку.";
        projectStatus.className = "form-status is-warning";
    }

    projectForm.reset();
    renderProjects();
});

monthFilter.innerHTML = "";
timeFrom.value = "09:00";
timeTo.value = "18:00";
initMonths();
renderProjects();
renderUsers();
renderDemo();