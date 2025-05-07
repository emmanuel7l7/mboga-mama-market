
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Vegetable } from '@/lib/types';
import { Plus, X } from 'lucide-react';

interface AddEditVegetableProps {
  vegetable?: Vegetable;
  onSave: (vegetable: Partial<Vegetable>) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const AddEditVegetable: React.FC<AddEditVegetableProps> = ({ 
  vegetable, 
  onSave, 
  onCancel,
  isNew = false
}) => {
  const [form, setForm] = useState<Partial<Vegetable>>(
    vegetable || {
      name: '',
      price: 0,
      unit: 'kg',
      image: 'https://source.unsplash.com/1576097942317-a4e69a4f7cf9',
      description: '',
      inStock: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setForm({ ...form, price: isNaN(value) ? 0 : value });
  };

  const handleStockChange = (checked: boolean) => {
    setForm({ ...form, inStock: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{isNew ? 'Add New Vegetable' : 'Edit Vegetable'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Vegetable Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Fresh Spinach"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handlePriceChange}
                placeholder="0"
                min="0"
                step="any"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="e.g. kg, bunch"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />
            {form.image && (
              <div className="mt-2 h-32 w-32 overflow-hidden rounded-md mx-auto">
                <img 
                  src={form.image} 
                  alt="Vegetable preview" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/200x200/EEE/31343C?text=No+Image';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe this vegetable..."
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={form.inStock}
              onCheckedChange={handleStockChange}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-mboga-500 hover:bg-mboga-600">
            {isNew ? (
              <>
                <Plus className="mr-1 h-4 w-4" /> Add Vegetable
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddEditVegetable;
