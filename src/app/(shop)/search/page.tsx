import Search from "@/component/Search/Search"
import { searchProducts } from "@/app/_api/allRolls"

const SearchResult = async ({
     searchParams,
}: {
     searchParams?: { [key: string]: string | undefined }
}) => {
     const textSearch = searchParams?.q as string
     const result: arrayProducts = await searchProducts(textSearch)

     return <Search dataAllProducts={result} />
}
export default SearchResult
