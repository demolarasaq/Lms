import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../../lib/supabase';

export function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify that there is an active session or a recovery state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Just warning, Supabase might take a bit to process the hash fragment
      }
    });
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      alert(error.message || "An error occurred");
    } else {
      alert("Password updated successfully! You will now be redirected to login.");
      await supabase.auth.signOut(); // force signOut to make them login with new password
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1662582631700-676a217d511f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc3MzE5NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Library background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-indigo-900/85 to-purple-900/90 backdrop-blur-sm" />
      </div>

      {/* Reset Password Card */}
      <Card className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md border-slate-200 shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h1>
            <p className="text-slate-600">Please enter your new password below.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg h-11"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
