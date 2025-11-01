import { Bus } from "../types/types";

const API_URL = " http://localhost:5056/api/";

export const getBuses = async () => {
    const response = await fetch(`${API_URL}buses`);
    return response.json();
};

export const createBus = async (bus: Bus) => {
    const response = await fetch(`${API_URL}buses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bus),
    });
    return response.json();
};
