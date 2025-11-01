import React, { useState } from "react";
import { Bus } from "../types/types";
import { createBus } from "../requests/Api";

interface BusFormProps {
    onSubmit: () => void;
}

const defaultBus: Bus = {
    id: 0,
    name: "",
    rows: 0,
    columns: 0,
    seatsPerColumn: 0
}

export const BusForm = ({ onSubmit }: BusFormProps) => {
    const [bus, setBus] = useState<Bus>(defaultBus);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createBus(bus).then(() => {
            setBus(defaultBus);
            onSubmit();
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={bus.name} onChange={(e) => setBus({ ...bus, name: e.target.value })} />
            <input type="number" placeholder="Rows" value={bus.rows} onChange={(e) => setBus({ ...bus, rows: parseInt(e.target.value) })} />
            <input type="number" placeholder="Columns" value={bus.columns} onChange={(e) => setBus({ ...bus, columns: parseInt(e.target.value) })} />
            <input type="number" placeholder="Seats per column" value={bus.seatsPerColumn} onChange={(e) => setBus({ ...bus, seatsPerColumn: parseInt(e.target.value) })} />
            <button type="submit">Create Bus</button>
        </form>
    );
}