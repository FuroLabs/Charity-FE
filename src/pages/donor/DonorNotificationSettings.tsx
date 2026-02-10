import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Bell, Mail, MessageSquare, Save, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services';

const DonorNotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [emailNotifications, setEmailNotifications] = useState({
    campaignUpdates: true,
    donationReceipts: true,
    monthlyReports: true,
    newCampaigns: true,
    achievements: true,
    marketing: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    campaignUpdates: true,
    donationReceipts: true,
    achievements: true,
    urgentAlerts: true
  });

  // Load user preferences on mount
  useEffect(() => {
    if (user?.preferences) {
      setEmailNotifications(prev => ({
        ...prev,
        campaignUpdates: user.preferences.emailNotifications ?? true,
        donationReceipts: user.preferences.emailNotifications ?? true,
        monthlyReports: user.preferences.emailNotifications ?? true
      }));
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSaved(false);

      // Update user preferences via API
      const response = await authService.updateProfile({
        preferences: {
          emailNotifications: emailNotifications.campaignUpdates || 
                             emailNotifications.donationReceipts || 
                             emailNotifications.monthlyReports,
          smsNotifications: false,
          currency: user?.preferences?.currency || 'USD',
          language: user?.preferences?.language || 'en',
          preferredCategories: user?.preferences?.preferredCategories || [],
          donationPrivacy: user?.preferences?.donationPrivacy || 'public'
        }
      });

      if (response.data) {
        updateUser(response.data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save notification settings';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/donor/notifications')}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Settings</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage how and when you receive notifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {saved && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your notification settings have been saved successfully.
            </AlertDescription>
          </Alert>
        )}

        {/* Email Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-indigo-600" />
              <CardTitle>Email Notifications</CardTitle>
            </div>
            <CardDescription>
              Choose which email notifications you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-campaign-updates" className="font-medium">
                  Campaign Updates
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified when campaigns you've donated to post updates
                </p>
              </div>
              <Switch
                id="email-campaign-updates"
                checked={emailNotifications.campaignUpdates}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, campaignUpdates: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-donation-receipts" className="font-medium">
                  Donation Receipts
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email receipts for your donations
                </p>
              </div>
              <Switch
                id="email-donation-receipts"
                checked={emailNotifications.donationReceipts}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, donationReceipts: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-monthly-reports" className="font-medium">
                  Monthly Impact Reports
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive monthly summaries of your donation impact
                </p>
              </div>
              <Switch
                id="email-monthly-reports"
                checked={emailNotifications.monthlyReports}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, monthlyReports: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-new-campaigns" className="font-medium">
                  New Campaign Recommendations
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get personalized campaign recommendations based on your interests
                </p>
              </div>
              <Switch
                id="email-new-campaigns"
                checked={emailNotifications.newCampaigns}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, newCampaigns: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-achievements" className="font-medium">
                  Achievement Notifications
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified when you earn new badges and achievements
                </p>
              </div>
              <Switch
                id="email-achievements"
                checked={emailNotifications.achievements}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, achievements: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-marketing" className="font-medium">
                  Marketing & Promotions
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive news about special events and promotions
                </p>
              </div>
              <Switch
                id="email-marketing"
                checked={emailNotifications.marketing}
                onCheckedChange={(checked) => 
                  setEmailNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <CardTitle>Push Notifications</CardTitle>
            </div>
            <CardDescription>
              Manage in-app and browser push notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-campaign-updates" className="font-medium">
                  Campaign Updates
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time updates from campaigns you support
                </p>
              </div>
              <Switch
                id="push-campaign-updates"
                checked={pushNotifications.campaignUpdates}
                onCheckedChange={(checked) => 
                  setPushNotifications(prev => ({ ...prev, campaignUpdates: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-donation-receipts" className="font-medium">
                  Donation Confirmations
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instant confirmation when your donation is processed
                </p>
              </div>
              <Switch
                id="push-donation-receipts"
                checked={pushNotifications.donationReceipts}
                onCheckedChange={(checked) => 
                  setPushNotifications(prev => ({ ...prev, donationReceipts: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-achievements" className="font-medium">
                  Achievement Alerts
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified instantly when you unlock achievements
                </p>
              </div>
              <Switch
                id="push-achievements"
                checked={pushNotifications.achievements}
                onCheckedChange={(checked) => 
                  setPushNotifications(prev => ({ ...prev, achievements: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-urgent" className="font-medium">
                  Urgent Campaign Alerts
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Critical updates about campaigns nearing their goals or deadlines
                </p>
              </div>
              <Switch
                id="push-urgent"
                checked={pushNotifications.urgentAlerts}
                onCheckedChange={(checked) => 
                  setPushNotifications(prev => ({ ...prev, urgentAlerts: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorNotificationSettings;
