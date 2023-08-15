import { ProfileForm } from '~/app/dashboard/settings/components/profile-form';
import { DashboardShell } from '~/components/shell';

export default function Dashboard() {
  return (
    <DashboardShell>
      <ProfileForm />
    </DashboardShell>
  );
}
