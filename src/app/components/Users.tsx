import { useState } from 'react';
import { Search, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

const usersData = [
  {
    id: 10,
    firstName: 'afonja',
    lastName: 'Jamiu',
    username: 'afonja',
    phoneNumber: '08109038043',
    email: 'rasaqademola007@gmail.com',
    address: 'Iknbkfmv dn qyndz/mmvkhlsak.nvf',
    dateOfBirth: '2010-03-10',
    dateOfRegistration: '2024-11-25 12:20:54',
  },
  {
    id: 11,
    firstName: 'olu',
    lastName: 'gbengs',
    username: 'olugbengs',
    phoneNumber: '08912343564',
    email: 'olugbengs@gmail.com',
    address: 'hdam,jbhdbhln,mv_.cnkbv',
    dateOfBirth: '2009-10-20',
    dateOfRegistration: '2024-11-25 12:22:56',
  },
  {
    id: 12,
    firstName: 'Oluwashola',
    lastName: 'Temitope',
    username: 'ShollyMams',
    phoneNumber: '08109038043',
    email: 'oluwasholatemitope@gmail.com',
    address: 'nfndjfgjwtkfmrrjmgkt§',
    dateOfBirth: '2000-02-20',
    dateOfRegistration: '2024-12-01 23:06:17',
  },
];

export function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersData.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">User Directory</h2>
          <p className="text-slate-600 mt-1">Manage library members and their information</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white border-slate-200">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white border-slate-200 hover:shadow-lg transition-all">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-lg font-semibold">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-slate-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-slate-500">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      Active
                    </span>
                    <span className="text-xs text-slate-500">ID: {user.id}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-slate-900 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-slate-900">{user.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500">Address</p>
                    <p className="text-slate-900 truncate">{user.address}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Date of Birth</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(user.dateOfBirth)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Joined</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(user.dateOfRegistration)}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table View (Alternative) */}
      <Card className="bg-white border-slate-200 overflow-hidden hidden xl:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Username</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Address</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">DOB</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-slate-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">@{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-900">{user.email}</p>
                      <p className="text-slate-500">{user.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{user.address}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(user.dateOfBirth)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(user.dateOfRegistration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{filteredUsers.length}</span> of{' '}
          <span className="font-semibold text-slate-900">{usersData.length}</span> users
        </p>
      </div>
    </div>
  );
}
