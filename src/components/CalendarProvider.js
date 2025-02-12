class CalendarProvider {
    async returnPromise(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return [response.status, data];
        } catch (error) {
            console.error("API error:", error);
            return [500, null]; // Return error status and null data
        }
    }

    // Fetch all meetings
    getAll() {
        return this.returnPromise("http://localhost:3005/meetings");
    }

    // Fetch a single meeting by ID
    getById(id) {
        return this.returnPromise(`http://localhost:3005/meetings/${id}`);
    }

    // Search meetings dynamically by any field
    get(field, input) {
        const url = `http://localhost:3005/meetings?${field}_like=${input}`;
        return this.returnPromise(url);
    }

    // Add a new meeting
    add(meeting) {
        const options = {
            method: "POST",
            body: JSON.stringify(meeting),
            headers: { "Content-Type": "application/json" },
        };
        return this.returnPromise("http://localhost:3005/meetings", options);
    }

    // Update an existing meeting
    update(id, updatedData) {
        const options = {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: { "Content-Type": "application/json" },
        };
        return this.returnPromise(`http://localhost:3005/meetings/${id}`, options);
    }

    // Delete a meeting
    delete(id) {
        const options = { method: "DELETE" };
        return this.returnPromise(`http://localhost:3005/meetings/${id}`, options);
    }
}

export default CalendarProvider;
