import { getAllCategories } from "@/app/_api/allRolls"

import AddProduct from "@/component/AddProduct/AddProduct"

const AddProducts = async () => {
    const dataGetAllCategories: dataGetAllCategoriesType[] =
        await getAllCategories()

    return (
        <>
            {/* <AddProduct
                dataGetAllCategories={dataGetAllCategories}
                addProduct={addProduct}
            /> */}
        </>
    )
}

export default AddProducts
