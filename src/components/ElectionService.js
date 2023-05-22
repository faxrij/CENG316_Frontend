class ElectionService {
	static async createElection(electionData) {
		try {
			const response = await fetch("https://api.example.com/elections", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(electionData),
			});

			if (response.ok) {
				const createdElection = await response.json();
				return createdElection;
			} else {
				throw new Error("Failed to create election");
			}
		} catch (error) {
			throw new Error(`Error: ${error.message}`);
		}
	}

	async getElections() {
		try {
			const response = await fetch("https://api.example.com/elections");
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to fetch elections data.");
		}
	}

	// Other methods for handling election operations
}

export default ElectionService;
