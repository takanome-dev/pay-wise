'use client';

// import { InformationCircleIcon } from "@heroicons/react/solid";
import {
  Flex,
  Title,
  Icon,
  TabGroup,
  TabList,
  Tab,
  AreaChart,
  Text,
  type Color,
} from '@tremor/react';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';

import { type DailyPerformance } from '~/app/dashboard/page';

const usNumberFormatter = (number: number, decimals = 0) =>
  Intl.NumberFormat('us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const formatters: { [key: string]: any } = {
  Transactions: (number: number) => `$ ${usNumberFormatter(number)}`,
  Cards: (number: number) => `$ ${usNumberFormatter(number)}`,
  Customers: (number: number) => `${usNumberFormatter(number)}`,
  Delta: (number: number) => `${usNumberFormatter(number, 2)}%`,
};

const Kpis = {
  Transactions: 'Transactions',
  Cards: 'Cards',
  Customers: 'Customers',
};

const kpiList = [Kpis.Transactions, Kpis.Cards, Kpis.Customers];

// export const performance: DailyPerformance[] = [
//   {
//     date: '2023-05-01',
//     Transactions: 900.73,
//     Profit: 173,
//     Customers: 73,
//   },
//   {
//     date: '2023-05-02',
//     Transactions: 1000.74,
//     Profit: 174.6,
//     Customers: 74,
//   },
//   {
//     date: '2023-05-03',
//     Transactions: 1100.93,
//     Profit: 293.1,
//     Customers: 293,
//   },
//   {
//     date: '2023-05-04',
//     Transactions: 1200.9,
//     Profit: 290.2,
//     Customers: 29,
//   },
// ];

interface ChartOverviewProps {
  performance: DailyPerformance[];
}

export default function ChartOverview({ performance }: ChartOverviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];

  const areaChartArgs = {
    className: 'mt-5 h-72',
    data: performance,
    index: 'date',
    categories: [selectedKpi],
    colors: ['blue'] as Color[],
    showLegend: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
  };

  return (
    <>
      <div className="md:flex justify-between">
        <div>
          <Flex
            className="space-x-0.5"
            justifyContent="start"
            alignItems="center"
          >
            <Title> Performance History </Title>
            <Icon
              icon={InfoIcon}
              variant="simple"
              tooltip="Shows daily increase or decrease of particular domain"
            />
          </Flex>
          <Text> Daily change per domain </Text>
        </div>
        <div>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList color="gray" variant="solid">
              <Tab>Transactions</Tab>
              <Tab>Cards</Tab>
              <Tab>Customers</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      {/* web */}
      <div className="mt-8 hidden sm:block">
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      <div className="mt-8 sm:hidden">
        <AreaChart
          {...areaChartArgs}
          startEndOnly
          showGradient={false}
          showYAxis={false}
        />
      </div>
    </>
  );
}
