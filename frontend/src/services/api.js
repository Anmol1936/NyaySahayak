import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export async function searchLaw(query) {

    const response = await api.get("/search", {
        params: {
            q: query
        }
    });

    return response.data;
}