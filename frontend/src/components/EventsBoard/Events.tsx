import React, { ChangeEvent } from "react";

import { useState, useEffect } from "react";

import '../../css/EventsBoard/Events.css';

import Event from "./Event";
import axios from "axios";

import { Pagination, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type EventType = {
    id: number;
    title: string;
    description: string;
    event_date: string;
    organizer: string;
};

enum SortByEnum {
    title = "title",
    eventDate = "event_date",
    organizer = "organizer"
};

enum OrderByEnum {
    asc = "ascending",
    desc = "descending"
};

const Events = () => {
    
    const [events, setEvents] = useState<EventType[]>([]);
    const [page, setPage] = useState<number>(1); 
    const [paginationCount, setPaginationCount] = useState<number>();
    const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.title);
    const [orderBy, setOrderBy] = useState<OrderByEnum>(OrderByEnum.asc);

    const eventsPerPage: number = 8;

    useEffect(() => {
        axios.get(`http://localhost:8000/events?page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`)
            .then(response => {
                setEvents(response.data.events);
                setPaginationCount(Math.ceil(response.data.total / eventsPerPage));
            });
    }, [page, sortBy, orderBy]);

    const handlePaginationChange = (event: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleSortByChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as SortByEnum);
    };

    const handleOrderByChange = (event: SelectChangeEvent) => {
        setOrderBy(event.target.value as OrderByEnum);
    };

    return (
        <div>
            <div className="sorting_block">
                <FormControl className="sort_by_form_control">
                    <InputLabel id="sort-by-input-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-by-input-label"
                        id="demo-simple-select"
                        value={sortBy}
                        label="Sort by"
                        onChange={handleSortByChange}
                    >
                        <MenuItem value={SortByEnum.title}>Title</MenuItem>
                        <MenuItem value={SortByEnum.eventDate}>Event date</MenuItem>
                        <MenuItem value={SortByEnum.organizer}>Organizer</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="order_by_form_control">
                    <InputLabel id="order-by-input-label">Order by</InputLabel>
                    <Select
                        labelId="order-by-input-label"
                        id="demo-simple-select"
                        value={orderBy}
                        label="Order by"
                        onChange={handleOrderByChange}
                    >
                        <MenuItem value={OrderByEnum.asc}>Ascending</MenuItem>
                        <MenuItem value={OrderByEnum.desc}>Descending</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="events_block">
            {
                events.map(event => <Event {...event} key={event.id}/>)
            }
            </div>
            <div className="events_pagination">
                <Pagination 
                    count={paginationCount} 
                    variant="outlined" 
                    shape="rounded" 
                    onChange={handlePaginationChange}
                />
            </div>
        </div>
    );
};

export default Events;