import axios from "axios";

const api = axios.create({
    baseURL: "https://nyaysahayak-z9gg.onrender.com"
});

export async function searchLaw(query) {
    const response = await api.get("/search", {
        params: {
            q: query
        }
    });

    return response.data;
}