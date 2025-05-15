import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textArea";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/ui/comboBox";
import { FieldValues } from "react-hook-form";
import { FormFieldProps } from "@/interfaces";

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  htmlFor,
  type = "text",
  placeholder,
  maxChars,
  disabled = false,
  icon,
  iconPosition = "right",
  width,
  className,
}: FormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {/* Label superior */}
          {label && (
            <FormLabel htmlFor={htmlFor}>
              {label}
            </FormLabel>
          )}

          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            ) : type === "combobox" ? (
              <ComboboxDemo width={width} {...field} />
            ) : (
              <Input
                type={type}
                id={htmlFor}
                icon={icon}
                iconPosition={iconPosition}
                maxLength={maxChars}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>

          {/* Label de descripción */}
          {description && (
            <Label htmlFor={htmlFor} variant="description">
              {description}
            </Label>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}