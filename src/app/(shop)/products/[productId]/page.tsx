import ProductDetail from "@/component/ProducDetail/ProductDetail"
import { detailData, getAllCategories } from "@/app/_api/allRolls"
import { notFound } from "next/navigation"
const DetailProduct = async ({ params }: { params: { productId: number } }) => {
    const { productId } = params

    if (isNaN(productId)) {
        notFound()
    }
    try {
        const dataAllCategories: dataGetAllCategoriesType[] =
            await getAllCategories()
        const data: products = await detailData(productId)

        return (
            <ProductDetail data={data} dataAllCategories={dataAllCategories} />
        )
    } catch (error) {
        notFound()
    }
}
export default DetailProduct
