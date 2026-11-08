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