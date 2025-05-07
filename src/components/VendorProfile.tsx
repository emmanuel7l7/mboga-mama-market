
import React from 'react';
import { Vendor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Edit, Calendar } from 'lucide-react';

interface VendorProfileProps {
  vendor: Vendor;
  isEditable?: boolean;
  onEdit?: () => void;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ 
  vendor, 
  isEditable = false, 
  onEdit 
}) => {
  const { 
    name, 
    storeName, 
    profilePicture, 
    location, 
    contact, 
    bio, 
    joinDate, 
    subscriptionStatus,
    subscriptionEnds
  } = vendor;

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-mboga-500 to-mboga-700 relative">
        {isEditable && (
          <Button
            onClick={onEdit}
            size="sm"
            className="absolute top-3 right-3 bg-white text-mboga-700 hover:bg-gray-100"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit Profile
          </Button>
        )}
      </div>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden -mt-16 sm:-mt-12 mx-auto sm:mx-0 mb-4 sm:mb-0">
            <img
              src={profilePicture}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:ml-6 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-lg font-semibold text-mboga-700">{storeName}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold">About</h3>
            <p className="text-gray-700">{bio}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-mboga-600" />
                <span className="text-gray-700">{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-mboga-600" />
                <span className="text-gray-700">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-mboga-600" />
                <span className="text-gray-700">{contact.email}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-mboga-600" />
                <span className="text-gray-700">Joined {formatDate(joinDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full ${
                  subscriptionStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-gray-700">
                  Subscription: {subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              {subscriptionEnds && subscriptionStatus === 'active' && (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5" />
                  <span className="text-gray-700">
                    Renews: {formatDate(subscriptionEnds)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorProfile;
