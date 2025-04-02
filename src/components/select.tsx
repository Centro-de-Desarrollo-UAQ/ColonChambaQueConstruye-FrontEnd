import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  maxHeight?: string;
}

export default function CustomSelect({
  options,
  placeholder = "Select",
  value,
  disabled = false,
  onChange,
  className = "bg-uaq-default-100 font-[700] px-4 py-3",
  maxHeight = "250px",
}: CustomSelectProps) {
  const handleChange = (value: string) => {
    if (onChange && !disabled) {
      onChange(value); 
    }
  };

  return (
    <Select 
      onValueChange={handleChange} 
      value={value}
      disabled={disabled}
    >
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent 
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        <SelectScrollUpButton />
        <SelectGroup>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}