import { Product } from '@/lib/types';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
//   onAddToCart?: (product: Product) => void;
};

const ProductCard = ({ product }: ProductCardProps) => {
  
  return (
    <div className="group w-70 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:8055/assets/${product.image}`}
          alt={product.name}
         
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-5">

        <h2 className="mb-2 text-lg font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* Price and Stock */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-gray-900">
            ${product.price}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.stock > 0
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </span>
        </div>

        {/* Button */}
        <button
          
          disabled={product.stock <= 0}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;