import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function Dashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="This is where you will find all the settings"
      />
    </DashboardShell>
  );
}
