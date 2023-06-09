class ElectionService {
	async createElection(electionData) {
		try {
			const { name, startDate, endDate, departmentId } = electionData;
			const formattedData = {
				name,
				startDate: new Date(startDate).toISOString(),
				endDate: new Date(endDate).toISOString(),
				departmentId,
			};

			const response = await fetch(
				"http://164.90.217.39:5000/api/election/department",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formattedData),
				}
			);

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
			let apiUrl = "";

			if (localStorage.getItem("userRole") === "Admin") {
				apiUrl = "http://164.90.217.39:5000/api/election/department";
			} else {
				const departmentName = localStorage.getItem("departmentName");
				apiUrl = `http://164.90.217.39:5000/api/election/department/${encodeURIComponent(
					departmentName
				)}`;
			}

			const token = localStorage.getItem("token");

			const response = await fetch(apiUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			const formattedData = data.data.map((election) => {
				const startDate = new Date(election.startDate).toLocaleDateString();
				const endDate = new Date(election.endDate).toLocaleDateString();

				return {
					...election,
					startDate,
					endDate,
				};
			});
			console.log(formattedData);
			return formattedData;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to fetch elections data.");
		}
	}
}

export default ElectionService;
