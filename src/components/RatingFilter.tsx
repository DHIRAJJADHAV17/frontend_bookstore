// RatingFilter.tsx
import React from "react";

type RatingFilterProps = {
  rating: number | null;
  onRatingChange: (rating: number | null) => void;
};

const RatingFilter: React.FC<RatingFilterProps> = ({
  rating,
  onRatingChange,
}) => {
  return (
    <div>
      <h4>Rating</h4>
      <select
        value={rating ?? ""}
        onChange={(e) => onRatingChange(Number(e.target.value) || null)}
      >
        <option value="">All Ratings</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>
  );
};

export default RatingFilter;
