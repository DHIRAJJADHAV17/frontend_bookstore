// PriceRangeFilter.tsx
import { Input } from "@/components/ui/input";
import React from "react";

type PriceRangeFilterProps = {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
};

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium">Price Range</h4>

      <div className="flex space-x-4">
        <Input
          type="number"
          value={minPrice}
          onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
          placeholder="Min"
          className="w-full"
        />
        <Input
          type="number"
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
          placeholder="Max"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
