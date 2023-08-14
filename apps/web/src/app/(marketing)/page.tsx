import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/utils';

// async function getGitHubStars(): Promise<string | null> {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/shadcn/taxonomy",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
//         },
//         next: {
//           revalidate: 60,
//         },
//       }
//     )

//     if (!response?.ok) {
//       return null
//     }

//     const json = await response.json()

//     return parseInt(json["stargazers_count"]).toLocaleString()
//   } catch (error) {
//     return null
//   }
// }

export default function IndexPage() {
  // const stars = await getGitHubStars()

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Elevate Your App with <br />
          <span className="text-primary">Open Source</span> Payments
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Seamlessly integrate secure payment processing into your projects,
          fostering simplicity and transparency with our open source payment
          solution.
        </p>
        <div className="space-x-4">
          <Link
            href={siteConfig.links.docs}
            className={cn(
              buttonVariants({ size: 'lg', className: 'bg-primary' }),
            )}
            target="_blank"
          >
            Documentation
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
