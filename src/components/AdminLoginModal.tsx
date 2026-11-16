import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Eye, EyeOff, Lock, User, X } from 'lucide-react';

export type AccessRole = 'admin' | 'user';

interface AdminLoginModalProps {
  isOpen: boolean;
  initialRole?: AccessRole;
  onClose: () => void;
  onSuccess: (role: AccessRole) => void;
}

const ROLE_CREDENTIALS: Record<AccessRole, string> = {
  admin: 'admin123',
  user: 'user123',
};

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  initialRole = 'admin',
  onClose,
  onSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<AccessRole>(initialRole);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(initialRole);
      setPassword('');
      setShowPassword(false);
      setError('');
      document.body.style.overflow = 'hidden';
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleRoleChange = (role: AccessRole) => {
    setSelectedRole(role);
    setPassword('');
    setShowPassword(false);
    setError('');
    window.setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedPassword = ROLE_CREDENTIALS[selectedRole];
    if (password.trim() === expectedPassword) {
      setError('');
      setPassword('');
      onSuccess(selectedRole);
      return;
    }
    setError('Incorrect password. Please try again.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
    >
      <div
        className="absolute inset-0 bg-[#2D2A26]/65 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-white border border-[#E7E5E0] shadow-2xl overflow-hidden">
        <div className="px-6 py-5 bg-[#F7F7F5] border-b border-[#E7E5E0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2F5D28]/10 text-[#2F5D28] flex items-center justify-center">
              {selectedRole === 'admin' ? (
                <Lock className="w-4 h-4" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3E6B2C]">
                AURELLE ACCESS
              </p>
              <h2
                id="admin-login-title"
                className="text-lg font-bold text-[#2D2A26]"
              >
                {selectedRole === 'admin'
                  ? 'Admin Console Access'
                  : 'User View Access'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close access dialog"
            className="p-1.5 text-[#6B6965] hover:text-[#2D2A26]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Switcher */}
          <div
            role="tablist"
            aria-label="Select access role"
            className="grid grid-cols-2 border border-[#E7E5E0] bg-[#F7F7F5] p-1 gap-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedRole === 'admin'}
              onClick={() => handleRoleChange('admin')}
              className={`py-2 text-xs font-bold uppercase tracking-[0.12em] rounded-xs transition-colors ${
                selectedRole === 'admin'
                  ? 'bg-[#2F5D28] text-white'
                  : 'text-[#6B6965] hover:text-[#2D2A26]'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedRole === 'user'}
              onClick={() => handleRoleChange('user')}
              className={`py-2 text-xs font-bold uppercase tracking-[0.12em] rounded-xs transition-colors ${
                selectedRole === 'user'
                  ? 'bg-[#2F5D28] text-white'
                  : 'text-[#6B6965] hover:text-[#2D2A26]'
              }`}
            >
              User
            </button>
          </div>

          <p className="text-sm text-[#6B6965] leading-relaxed">
            {selectedRole === 'admin'
              ? 'Enter your administrator password to manage table bookings, customer orders, and live menu items.'
              : 'Enter your user password to switch to the customer dining website.'}
          </p>

          <div>
            <label
              htmlFor="admin-password-input"
              className="block text-xs font-bold uppercase tracking-[0.1em] text-[#2D2A26] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password"
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#E7E5E0] focus:border-[#2F5D28] focus:outline-none text-sm text-[#2D2A26]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B6965] hover:text-[#2D2A26]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="flex items-start gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#E7E5E0] hover:border-[#2D2A26] text-xs font-bold tracking-[0.12em] uppercase text-[#2D2A26] rounded-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2F5D28] hover:bg-[#23471E] text-white text-xs font-bold tracking-[0.14em] uppercase rounded-xs transition-colors"
            >
              {selectedRole === 'admin' ? 'Unlock Dashboard' : 'Switch to User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
