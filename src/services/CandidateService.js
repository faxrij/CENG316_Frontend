import { API_URL } from './../config';


export const withdrawCandidate = async (userName, token) => {
  try {
    const response = await fetch(`${API_URL}/candidate/${userName}/withdraw`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
