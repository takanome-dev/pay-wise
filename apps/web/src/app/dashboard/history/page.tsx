import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function History() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="History"
        text="This is where you will find all your history"
      />
    </DashboardShell>
  );
}
