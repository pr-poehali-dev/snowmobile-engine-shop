interface CatalogContentRendererProps {
  content: string;
}

const CatalogContentRenderer = ({ content }: CatalogContentRendererProps) => {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      {content.split('\n\n').map((paragraph, idx) => {
        if (paragraph.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
        } else if (paragraph.startsWith('### ')) {
          return <h3 key={idx} className="text-xl md:text-2xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
        } else if (paragraph.startsWith('#### ')) {
          return <h4 key={idx} className="text-lg md:text-xl font-bold mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>;
        } else if (paragraph.startsWith('**') && paragraph.includes(':')) {
          return <p key={idx} className="font-bold my-2">{paragraph.replace(/\*\*/g, '')}</p>;
        } else if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(item => item.startsWith('- '));
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 my-4">
              {items.map((item, i) => (
                <li key={i}>{item.replace('- ', '').replace(/\*\*/g, '')}</li>
              ))}
            </ul>
          );
        } else if (paragraph.trim()) {
          return <p key={idx} className="my-4 text-muted-foreground leading-relaxed">{paragraph}</p>;
        }
        return null;
      })}
    </div>
  );
};

export default CatalogContentRenderer;
