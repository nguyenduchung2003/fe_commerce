import {
    getProductsWithCategory,
    getAllCategories,
    searchProducts,
} from "@/app/_api/allRolls"
import Category from "@/component/Category/Category"
import DetailCategory from "@/component/DetailCategory/DetailCategory"
import { Box } from "@mui/material"
import type { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: { categoryId: number }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { categoryId } = params
    const dataAllCategories: dataGetAllCategoriesType[] =
        await getAllCategories()
    const category = dataAllCategories.find((item) => item.id == categoryId)
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return {
        title: capitalizeFirstLetter(category?.category!) || "Detail Category",
        description: "Detail Category page",
    }
}
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
            <Category dataAllCategories={dataAllCategories} checkPage={true} />
            <DetailCategory data={textSearch ? dataSearch : data} />
        </Box>
    )
}
export default DetailCategoryPage
