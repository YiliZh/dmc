import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

function Home() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching meetings...");  // Debug log

        fetch("http://localhost:3005/meetings")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Meetings data:", data);  // Debug log
                if (Array.isArray(data)) {
                    setMeetings(data);
                } else {
                    console.error("Invalid data format:", data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching meetings:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/meeting/${id}`);
    };

    if (loading) {
        return <Typography variant="h5">Loading meetings...</Typography>;
    }

    if (error) {
        return <Typography variant="h5" color="error">{`Error: ${error}`}</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Meeting List
            </Typography>
            {meetings.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No meetings found.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map((meeting) => (
                                <TableRow
                                    key={meeting.id}
                                    hover
                                    onClick={() => handleRowClick(meeting.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TableCell>{meeting.firstName}</TableCell>
                                    <TableCell>{meeting.lastName}</TableCell>
                                    <TableCell>{meeting.email}</TableCell>
                                    <TableCell>{meeting.date}</TableCell>
                                    <TableCell>{meeting.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default Home;
