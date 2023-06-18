import { Divider } from '@tremor/react';

import { AppearanceForm } from '~/app/dashboard/settings/components/appearance-form';
import { DashboardHeader } from '~/components/header';

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Appearance"
        subHeadingType="text"
        text="Customize the appearance of the app. Automatically switch between day and night themes."
      />
      <Divider />
      <AppearanceForm />
    </div>
  );
}
