import Category from "@/component/Category/Category"
import HomeComponent from "@/component/Home/Home"
import { Box } from "@mui/material"
import { getAllCategories, divisionPage } from "@/app/_api/allRolls"
const DivisionPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: number | undefined }
}) => {
    const page: number = (searchParams?.numberPage as number) || 1
    const perPage: number = (searchParams?.limit as number) || 12

    const dataAllProducts: arrayProducts = await divisionPage(page, perPage)
    const dataAllCategories: dataGetAllCategoriesType[] =
        await getAllCategories()

    return (
        <>
            <Box className="flex gap-5 ">
                <Category
                    dataAllCategories={dataAllCategories}
                    checkPage={false}
                />
                <HomeComponent dataAllProducts={dataAllProducts} />
            </Box>
        </>
    )
}
export default DivisionPage
