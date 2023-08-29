import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function Statistics() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Statistics"
        text="This is where you will find all your statistics"
      />
    </DashboardShell>
  );
}
