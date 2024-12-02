import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useKanbanStore } from '@/store/kanban-store';

export const Navbar = () => {
  const searchTerm = useKanbanStore((state) => state.searchTerm);
  const setSearchTerm = useKanbanStore((state) => state.setSearchTerm);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
