import { Collection } from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="flex-center flex-col justify-center xs:mt-50">
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={20} height={20} />
              </li>
              <p className="p-14-medium text-center text-dark-400">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="flex-center flex-col justify-center mt-20 mb-10">
        <h1 className="h2-bold font-bold text-dark-600">
          Unlock Your Creative Potential with Imagemaker
        </h1>
      </section>

      <section className="centered 40">
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Get Started</Link>
          </Button>
        </SignedOut>
      </section>
   

      <section className="">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home