
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vegetable } from '@/lib/types';

interface VegetableCardProps {
  vegetable: Vegetable;
  isEditable?: boolean;
  onEdit?: (id: string) => void;
}

const VegetableCard: React.FC<VegetableCardProps> = ({ 
  vegetable, 
  isEditable = false, 
  onEdit 
}) => {
  const { id, name, price, unit, image, description, inStock } = vegetable;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <div className="text-lg font-bold text-mboga-700 mb-2">
          Tshs {price} <span className="text-sm font-medium text-gray-600">per {unit}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        {isEditable ? (
          <Button 
            onClick={() => onEdit && onEdit(id)} 
            variant="outline" 
            className="w-full"
          >
            Edit Item
          </Button>
        ) : (
          <Link to={`/product/${id}`} className="w-full">
            <Button className="w-full bg-mboga-500 hover:bg-mboga-600">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default VegetableCard;
