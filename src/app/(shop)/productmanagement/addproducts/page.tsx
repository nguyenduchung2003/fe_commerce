import { getAllCategories } from "@/app/_api/allRolls"
import { addProduct } from "@/app/_api/admin"
import AddProduct from "@/component/AddProduct/AddProduct"

const Upload = async () => {
     const dataGetAllCategories: dataGetAllCategoriesType[] =
          await getAllCategories()

     return (
          <>
               <AddProduct
                    dataGetAllCategories={dataGetAllCategories}
                    addProduct={addProduct}
               />
          </>
     )
}

export default Upload
