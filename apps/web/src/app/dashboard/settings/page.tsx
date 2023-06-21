import { Divider } from '@tremor/react';

import { ProfileForm } from '~/app/dashboard/settings/components/profile-form';
import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function Dashboard() {
  return (
    <DashboardShell>
      <ProfileForm />
    </DashboardShell>
  );
}
