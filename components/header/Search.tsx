import { Button } from "../ui/button";
import { SearchIcon } from "../icons/Icons";

export function Search() {
    return (
        <Button className="bg-transparent text-bisyou-font hover:text-bisyou-green hover:bg-transparent">
            <SearchIcon size={25} />
        </Button>
    );
}
