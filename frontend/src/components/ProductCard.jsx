import { Link } from 'react-router-dom';
import RainbowButton from './RainbowButton';

export default function ProductCard({ product }) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="aspect-[3/4] overflow-hidden bg-muted flex-shrink-0 relative">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          PDF ÜRÜN
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{product.category}</div>
        <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">{product.title}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="text-2xl font-bold leading-none text-card-foreground">{product.price.toFixed(2)} ₺</span>
          <RainbowButton 
            as="Link"
            to={`/product/${product.id}`}
            innerClassName="px-5 py-2.5"
          >
            İncele
          </RainbowButton>
        </div>
      </div>
    </div>
  );
}
