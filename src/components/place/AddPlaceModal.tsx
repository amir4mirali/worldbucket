'use client';

import { useState } from 'react';
import { IPlace, PlaceType, PlaceStatus, Priority } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { X } from 'lucide-react';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IPlace>) => Promise<void>;
  loading?: boolean;
}

export function AddPlaceModal({ isOpen, onClose, onSubmit, loading }: AddPlaceModalProps) {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    placeType: PlaceType;
    status: PlaceStatus;
    priority: Priority;
  }>({
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
    country: '',
    city: '',
    placeType: 'custom',
    status: 'want_to_visit',
    priority: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      latitude: 0,
      longitude: 0,
      country: '',
      city: '',
      placeType: 'custom',
      status: 'want_to_visit',
      priority: 'medium',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <Card className="w-full max-w-md my-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Add Place</CardTitle>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Place Name</label>
              <Input
                placeholder="e.g., Eiffel Tower"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Latitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="0.0"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Longitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="0.0"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Input
                placeholder="e.g., France"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Input
                placeholder="e.g., Paris"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Add notes about this place..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select
                  options={[
                    { value: 'city', label: 'City' },
                    { value: 'restaurant', label: 'Restaurant' },
                    { value: 'landmark', label: 'Landmark' },
                    { value: 'hidden_spot', label: 'Hidden Spot' },
                    { value: 'custom', label: 'Custom' },
                  ]}
                  value={formData.placeType}
                  onChange={(e) => setFormData({ ...formData, placeType: e.target.value as PlaceType })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select
                  options={[
                    { value: 'want_to_visit', label: 'Want to Visit' },
                    { value: 'planned', label: 'Planned' },
                    { value: 'visited', label: 'Visited' },
                  ]}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PlaceStatus })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ]}
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? 'Adding...' : 'Add Place'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
