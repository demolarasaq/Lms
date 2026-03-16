import { useState } from 'react';
import { User, Lock, TrendingUp, Save, Camera } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Profile() {
  const [firstName, setFirstName] = useState('kofo');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('08109038043');
  const [email, setEmail] = useState('rasaqademola007@gmail.com');
  const [address, setAddress] = useState('Ikhhbuwkfuuwvkz');
  const [dateOfBirth, setDateOfBirth] = useState('01/28/2020');
  const [insight, setInsight] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Profile Settings</h2>
        <p className="text-slate-600 mt-1">Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-0 text-white">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarFallback className="bg-white text-indigo-600 text-2xl font-bold">
                  {firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Welcome {firstName}!</h3>
              <p className="text-indigo-100 mt-1">{email}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div>
                  <p className="text-sm text-indigo-100">Phone</p>
                  <p className="font-semibold">{phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-100">Date of Birth</p>
                  <p className="font-semibold">{dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-100">Member Since</p>
                  <p className="font-semibold">2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-white border-slate-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Personal Information</h3>
                  <p className="text-sm text-slate-500">Update your personal details</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                  <Input
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="bg-white border-slate-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Change Password</h3>
                  <p className="text-sm text-slate-500">Update your account password</p>
                </div>
              </div>

              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">New Password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Tips */}
          <Card className="bg-amber-50 border-amber-200">
            <div className="p-6">
              <h4 className="font-semibold text-amber-900 mb-2">Security Tips</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Use a strong password with at least 8 characters</li>
                <li>• Include uppercase, lowercase, numbers, and symbols</li>
                <li>• Don't share your password with anyone</li>
                <li>• Change your password regularly</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <Card className="bg-white border-slate-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Share Your Insights</h3>
                  <p className="text-sm text-slate-500">Help us improve the library experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Your Suggestions</label>
                  <Textarea
                    value={insight}
                    onChange={(e) => setInsight(e.target.value)}
                    placeholder="What can we do better? Share your thoughts..."
                    className="bg-slate-50 border-slate-200 min-h-32"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Send Insight
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="bg-white border-slate-200">
              <div className="p-6 text-center">
                <p className="text-3xl font-bold text-indigo-600">12</p>
                <p className="text-sm text-slate-600 mt-1">Books Borrowed</p>
              </div>
            </Card>
            <Card className="bg-white border-slate-200">
              <div className="p-6 text-center">
                <p className="text-3xl font-bold text-purple-600">8</p>
                <p className="text-sm text-slate-600 mt-1">Books Returned</p>
              </div>
            </Card>
            <Card className="bg-white border-slate-200">
              <div className="p-6 text-center">
                <p className="text-3xl font-bold text-emerald-600">4</p>
                <p className="text-sm text-slate-600 mt-1">Active Loans</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
