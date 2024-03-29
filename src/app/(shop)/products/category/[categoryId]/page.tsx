import {
     getProductsWithCategory,
     getAllCategories,
     searchProducts,
} from "@/app/_api/allRolls"
import Category from "@/component/Category/Category"
import DetailCategory from "@/component/DetailCategory/DetailCategory"
import { Box } from "@mui/material"
const DetailCategoryPage = async ({
     params,
     searchParams,
}: {
     params: { categoryId: number }
     searchParams?: { [key: string]: string | undefined }
}) => {
     const { categoryId } = params
     const textSearch = searchParams?.q as string
     const dataAllCategories: dataGetAllCategoriesType[] =
          await getAllCategories()
     const dataSearch = await searchProducts(textSearch, categoryId)
     const data = await getProductsWithCategory(categoryId)
     return (
          <Box className="flex gap-10">
               <Category
                    dataAllCategories={dataAllCategories}
                    checkPage={true}
               />
               <DetailCategory data={textSearch ? dataSearch : data} />
          </Box>
     )
}
export default DetailCategoryPage
