import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Vegetable } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: vegetable?.name || '',
    price: vegetable?.price || 0,
    unit: vegetable?.unit || '',
    image: vegetable?.image || '',
    description: vegetable?.description || '',
    inStock: vegetable?.inStock ?? true,
    imageFile: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.image;

      // Upload new image if provided
      if (form.imageFile) {
        imageUrl = await uploadImage(form.imageFile, 'vegetables');
      }

      onSave({
        name: form.name,
        price: Number(form.price),
        unit: form.unit,
        image: imageUrl,
        description: form.description,
        inStock: form.inStock
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

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
                onChange={handleChange}
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
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {form.image && !form.imageFile && (
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
              onCheckedChange={(checked) => setForm(prev => ({ ...prev, inStock: checked }))}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-mboga-500 hover:bg-mboga-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Plus className="mr-1 h-4 w-4" /> Saving...
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
