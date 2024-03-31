import Link from "next/link"

export default async function NotFound() {
     return (
          <div className="flex flex-col justify-center items-center">
               <h2>404 Not Found</h2>

               <p>
                    View <Link href="/">all product</Link>
               </p>
          </div>
     )
}
