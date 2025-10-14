import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Category } from './CatalogData';
import CatalogContentRenderer from './CatalogContentRenderer';
import CatalogContactCard from './CatalogContactCard';

interface CatalogTabContentProps {
  category: Category;
}

const CatalogTabContent = ({ category }: CatalogTabContentProps) => {
  return (
    <TabsContent value={category.id}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Icon name={category.icon} className="text-primary" size={32} />
            <div>
              <CardTitle className="text-2xl md:text-3xl">{category.name}</CardTitle>
              <CardDescription className="text-base">{category.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {category.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <CatalogContentRenderer content={category.content} />
        </CardContent>
      </Card>

      <CatalogContactCard />
    </TabsContent>
  );
};

export default CatalogTabContent;
