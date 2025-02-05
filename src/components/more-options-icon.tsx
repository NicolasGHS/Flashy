import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Ellipsis, Pen, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MoreOptionsIcon = () => {

  const params = useParams();
  const setId = params.id;
  console.log("SetId: ", setId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/sets/${setId}/edit`} passHref>
            <Pencil />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptionsIcon;
