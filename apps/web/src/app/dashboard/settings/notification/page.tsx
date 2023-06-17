import { Divider } from '@tremor/react';

import { NotificationsForm } from '~/app/dashboard/settings/components/notification-form';

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Divider />
      <NotificationsForm />
    </div>
  );
}
