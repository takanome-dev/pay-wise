import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function Dashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Overview"
        text="This is where you will find all the recaps of activities happening in your app"
      />
    </DashboardShell>
  );
}
