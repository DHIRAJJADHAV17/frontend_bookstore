import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "./ui/form";
import { Button } from "./ui/button";
import TagItemInput from "./TagItemInput";

const TagSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tag",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Tags</h2>
        <FormDescription>Add your Tags</FormDescription>
      </div>
      <FormField
        control={control}
        name="tag"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <TagItemInput
                key={index}
                index={index}
                tagReviewItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="text-white"
        onClick={() => append({ name: "" })}
      >
        Add Tag
      </Button>
    </div>
  );
};

export default TagSection;
