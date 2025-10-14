import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Category } from './CatalogData';

interface CatalogTabsListProps {
  categories: Category[];
}

const CatalogTabsList = ({ categories }: CatalogTabsListProps) => {
  return (
    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
      {categories.map((cat) => (
        <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
          <Icon name={cat.icon} size={18} />
          <span className="hidden sm:inline">{cat.name}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default CatalogTabsList;
