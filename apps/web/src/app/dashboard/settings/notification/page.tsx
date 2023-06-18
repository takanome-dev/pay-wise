import { Divider } from '@tremor/react';

import { NotificationsForm } from '~/app/dashboard/settings/components/notification-form';
import { DashboardHeader } from '~/components/header';

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Notifications"
        subHeadingType="text"
        text="Configure how you receive notifications."
      />
      <Divider />
      <NotificationsForm />
    </div>
  );
}
