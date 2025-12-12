let clinics = [];
const clinicContainer = document.getElementById("clinicContainer");
const searchInput = document.getElementById("searchInput");
const areaCheckboxes = document.querySelectorAll(".area-checkbox");
const placeholderImage = "/Assets/erik-mclean--4JVGXz1x8g-unsplash.jpg";
const clearIcon = document.querySelector('.clear-icon');

// -----------------------
// Fetch JSON data
// -----------------------
async function loadClinics() {
    try {
        const response = await fetch("/Data/ClinicData.json");
        clinics = await response.json();
        filterClinics();  // Display all on load
    } catch (error) {
        console.error("Error loading clinic data:", error);
    }
}

// -----------------------
// Display clinics
// -----------------------
function displayClinics(list, query = "") {
    clinicContainer.innerHTML = ""; 

    if (list.length === 0) {
        if (query) {
            clinicContainer.innerHTML = `<p>No clinics "${query}" found.</p>`;
        } else {
            clinicContainer.innerHTML = `<p>No clinics found.</p>`;
        }
        return;
    }

    list.forEach(clinic => {
        const clinicDiv = document.createElement("div");
        clinicDiv.classList.add("clinic-item");

        clinicDiv.innerHTML = `
            <img src="${clinic.image || placeholderImage}" alt="${clinic.name}">
            <div class="clinic-details">
                <h2>${clinic.website ? `<a href="${clinic.website}" target="_blank">${clinic.name}</a>` : clinic.name}</h2>
                <p><strong>Address:</strong> ${clinic.address}</p>
                <p><strong>Contact:</strong> ${clinic.contact}</p>
                <p><strong>Doctors:</strong> ${clinic.doctor}</p>
            </div>
        `;

        clinicContainer.appendChild(clinicDiv);
    });
}

// -----------------------
// Filter
// -----------------------
function filterClinics() {
    const query = searchInput.value.trim().toLowerCase();

    const selectedAreas = [...areaCheckboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const filtered = clinics.filter(clinic => {
        const matchesSearch =
            clinic.name.toLowerCase().includes(query) ||
            clinic.address.toLowerCase().includes(query) ||
            clinic.doctor.toLowerCase().includes(query);

        const matchesArea =
            selectedAreas.length === 0 || selectedAreas.includes(clinic.area);

        return matchesSearch && matchesArea;
    });

    displayClinics(filtered, query);
}

// -----------------------
// Event listeners
// -----------------------

// Filter clinics whenever user types
searchInput.addEventListener('input', filterClinics);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterClinics(); 
        searchInput.value = '';
    }
});

// Clear input on clear icon click
clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    filterClinics(); // will show all clinics now
});

// Area checkbox filters
areaCheckboxes.forEach(cb => cb.addEventListener("change", filterClinics));

// -----------------------
// Initialize
// -----------------------
loadClinics();
