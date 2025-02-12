import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

function MeetingDetails() {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3005/meetings/${id}`)
            .then((response) => response.json())
            .then((data) => setMeeting(data))
            .catch((error) => console.error("Error fetching meeting:", error));
    }, [id]);

    if (!meeting) {
        return <Typography variant="h5">Loading meeting details...</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Meeting Details
                </Typography>
                <Typography variant="h6">
                    Name: {meeting.firstName} {meeting.lastName}
                </Typography>
                <Typography>Email: {meeting.email}</Typography>
                <Typography>Date: {meeting.date}</Typography>
                <Typography>Time: {meeting.time}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/")}>
                    Back to Home
                </Button>
            </CardContent>
        </Card>
    );
}

export default MeetingDetails;
