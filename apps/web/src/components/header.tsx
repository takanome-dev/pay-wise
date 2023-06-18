import { Text, Title, Subtitle } from '@tremor/react';

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  subHeadingType?: 'subtitle' | 'text';
  children?: React.ReactNode;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { heading, text, children, subHeadingType = 'subtitle' } = props;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="">
        <Title>{heading}</Title>
        {text && subHeadingType === 'subtitle' && <Subtitle>{text}</Subtitle>}
        {text && subHeadingType === 'text' && <Text>{text}</Text>}
        {/* <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>} */}
      </div>
      {children}
    </div>
  );
}
