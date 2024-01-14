import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { TTodoFilter } from "@/redux/features/todoSlice";
import { Dispatch } from "react";

type TTodofilterProps = {
  priority: TTodoFilter;
  setPriority: Dispatch<React.SetStateAction<TTodoFilter>>;
};

const TodoFilter = ({ priority, setPriority }: TTodofilterProps) => {
  // ! for local redux state
  // const { filter } = useAppSelector((state) => state.todos);
  // const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary-gradient text-xl font-semibold">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => setPriority(value as TTodoFilter)}
        >
          <DropdownMenuRadioItem value="ALL">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="HIGH">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MEDIUM">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="LOW">Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
