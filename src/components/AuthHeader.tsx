
import React from 'react';
import { User, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const AuthHeader = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">TaskSync</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Bell className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Settings className="w-4 h-4" />
            </Button>

            {/* User Profile */}
            <Card className="px-3 py-2 shadow-sm border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{getUserInitials()}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{getUserDisplayName()}</span>
              </div>
            </Card>

            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
