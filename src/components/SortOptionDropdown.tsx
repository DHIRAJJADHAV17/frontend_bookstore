import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Price: high to low",
    value: "price_desc", // value corresponds to price descending
  },
  {
    label: "Price: low to high",
    value: "price_asc", // value corresponds to price ascending
  },
  {
    label: "Publish date: old to new",
    value: "publish_desc", // value for publishing date ascending
  },
  {
    label: "Publish date: new to old",
    value: "publish_asc", // value for publishing date descending
  },
  {
    label: "Rating: high to low",
    value: "rating_desc", // value corresponds to rating descending
  },
  {
    label: "Rating: low to high",
    value: "rating_asc", // value corresponds to rating ascending
  },
];
const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
