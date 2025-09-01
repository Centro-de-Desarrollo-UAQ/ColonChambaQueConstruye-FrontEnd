import { Button } from "@/components/ui/button";
import { SortVertical } from "@solar-icons/react";

interface SortButtonProps {
  column: {
    toggleSorting: (isAsc: boolean) => void;
    getIsSorted: () => "asc" | "desc" | false;
  };
  name: string;
}

export default function SortButton({ column, name }: SortButtonProps) {
  return (
    <Button
    variant="ghost"
    color="brand"
    size="sm"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name}
      <SortVertical />
    </Button>
  );
}