import { Divider } from '@tremor/react';

import { AccountForm } from '~/app/dashboard/settings/components/account-form';

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Divider />
      <AccountForm />
    </div>
  );
}
