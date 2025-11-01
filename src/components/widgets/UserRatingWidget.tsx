import React, { useState } from "react";
import { Box, Typography, Textarea, Button, List, ListItem, Card } from "@mui/joy";

const UserRatingWidget = () => {
  const [reviews, setReviews] = useState([
    "Great product! Highly recommend.",
    "Good quality, but shipping was slow.",
  ]);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([newReview, ...reviews]);
      setNewReview("");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography level="h4" mb={2}>Customer Reviews</Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index}>
            <Card variant="outlined" sx={{ p: 2 }}>{review}</Card>
          </ListItem>
        ))}
      </List>
      <Box mt={3}>
        <Textarea
          placeholder="Write a review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          minRows={3}
          sx={{ width: "100%" }}
        />
        <Button onClick={handleAddReview} sx={{ mt: 2 }}>Submit Review</Button>
      </Box>
    </Box>
  );
};

export default UserRatingWidget;

