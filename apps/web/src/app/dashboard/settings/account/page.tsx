import { Divider } from '@tremor/react';

import { AccountForm } from '~/app/dashboard/settings/components/account-form';
import { DashboardHeader } from '~/components/header';

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Account"
        subHeadingType="text"
        text="Update your account settings. Set your preferred language and timezone."
      />
      <Divider />
      <AccountForm />
    </div>
  );
}
