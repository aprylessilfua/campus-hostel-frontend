// admin.js

// Fetch all applications
function getAllApplications() {
    fetch(`${apiUrl}/applications`)
        .then(response => response.json())
        .then(data => {
            const applicationList = document.getElementById('applicationList');
            applicationList.innerHTML = ''; // Clear the list before adding new ones

            data.applications.forEach(application => {
                const applicationDiv = document.createElement('div');
                applicationDiv.innerHTML = `
                    <h3>Application #${application.id}</h3>
                    <p>Student: ${application.user.full_name}</p>
                    <p>Room: ${application.room_number}</p>
                    <p>Status: ${application.status}</p>
                    <button onclick="approveApplication(${application.id})">Approve</button>
                    <button onclick="rejectApplication(${application.id})">Reject</button>
                `;
                applicationList.appendChild(applicationDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Approve an application
function approveApplication(applicationId) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in first!');
        return;
    }

    fetch(`${apiUrl}/applications/approve/${applicationId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Application approved!');
            getAllApplications(); // Refresh the list
        } else {
            alert('Failed to approve application.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Reject an application
function rejectApplication(applicationId) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in first!');
        return;
    }

    fetch(`${apiUrl}/applications/reject/${applicationId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Application rejected!');
            getAllApplications(); // Refresh the list
        } else {
            alert('Failed to reject application.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Fetch all rooms and display them
function getAllRooms() {
    fetch(`${apiUrl}/rooms`)
        .then(response => response.json())
        .then(data => {
            const roomList = document.getElementById('roomList');
            roomList.innerHTML = ''; // Clear the list before adding new ones

            data.rooms.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.innerHTML = `
                    <h3>Room #${room.room_number}</h3>
                    <p>Hostel: ${room.hostel_name}</p>
                    <p>Description: ${room.description}</p>
                    <p>Occupancy: ${room.occupancy_limit}</p>
                `;
                roomList.appendChild(roomDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Event listener to fetch all data on page load
document.addEventListener('DOMContentLoaded', () => {
    getAllApplications(); // Load all applications when the page loads
    getAllRooms(); // Load all rooms when the page loads
});
