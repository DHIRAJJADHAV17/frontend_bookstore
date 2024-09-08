import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  tagReviewItem: () => void;
};

const TagItemInput = ({ index, tagReviewItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`tag.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Tags <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={tagReviewItem}
        className="bg-red-500 text-white max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default TagItemInput;
