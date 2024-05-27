import ProductDetail from "@/component/ProducDetail/ProductDetail"
import { detailData, getAllCategories } from "@/app/_api/allRolls"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: { productId: number }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { productId } = params

    const data: products = await detailData(productId)

    return {
        title: data.name || "Product Detail",
        description: "Detail Product page",
    }
}
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
