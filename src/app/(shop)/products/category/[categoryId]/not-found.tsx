import Link from "next/link"
import { headers } from "next/headers"

export default async function NotFound() {
     return (
          <div className="flex flex-col justify-center items-center">
               <h2>404 Not Found</h2>

               <p>
                    View <Link href="/">all category</Link>
               </p>
          </div>
     )
}
