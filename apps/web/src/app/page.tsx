import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';

export default function Home() {
  return (
    <>
      <header className="bg-background/30 backdrop-blur-md sticky top-0 shadow-lg h-16">
        <div className="container px-40 flex justify-between items-center h-full">
          <div className="">
            <p className="uppercase font-bold">Pay Wise</p>
          </div>
          {/* <div className="w-10 h-10 bg-black rounded-full" /> */}
          <div className="flex gap-4">
            <Link
              href="/register"
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: 'default' })}
            >
              Signin
            </Link>
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col p-24">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[500px]">
            <h1 className="uppercase font-bold leading-tight text-4xl mb-4 text-center">
              The open source payment service
            </h1>
            <p className="text-foreground text-center">
              Streamline Your Payment Integration with PayWise!
            </p>
          </div>
          <div className="rounded-lg bg-black w-[900px] mt-8 h-[500px]" />
        </div>
        <div className="grid grid-cols-2 gap-20 my-20 items-center">
          <div className="bg-black rounded-lg h-[400px]" />
          <div className="">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              numquam harum nemo repellat, distinctio aliquid accusamus vitae
              laborum tenetur consequuntur dolor laboriosam quisquam minima
              veniam accusantium. Veritatis, explicabo doloribus! Aut.
            </p>
          </div>
          <div className="">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              numquam harum nemo repellat, distinctio aliquid accusamus vitae
              laborum tenetur consequuntur dolor laboriosam quisquam minima
              veniam accusantium. Veritatis, explicabo doloribus! Aut.
            </p>
          </div>
          <div className="bg-black rounded-lg h-[400px]" />
          <div className="bg-black rounded-lg h-[400px]" />
          <div className="">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              numquam harum nemo repellat, distinctio aliquid accusamus vitae
              laborum tenetur consequuntur dolor laboriosam quisquam minima
              veniam accusantium. Veritatis, explicabo doloribus! Aut.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-background shadow-md h-14">
        <div className="container h-full  px-40  flex justify-between items-center">
          <div className="">
            <p className="uppercase font-bold">Pay Wise</p>
          </div>
          <div className="">
            <p className="">copyright &copy; 2023</p>
          </div>
        </div>
      </footer>
    </>
  );
}
