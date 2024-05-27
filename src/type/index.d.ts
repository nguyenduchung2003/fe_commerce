declare global {
    interface MyFormValues {
        email: string
        password: string
    }
    interface userType {
        userName: string
        passWord: string
    }
    interface MyFormValuesRegister {
        email: string
        password: string
        passwordConfirm: string
    }
    interface ResponseSignIn {
        message: string
        AccessToken: string
        RefreshToken: string
    }

    interface option {
        option_id?: number
        name: string
        value: string
    }
    interface variant {
        options: option[]
        price: number
        quantity: number
        variant_id?: number
    }
    interface products {
        id?: number
        category: number
        forSale?: number
        description: string
        image: string[]
        name: string
        variants: variant[]
    }
    interface arrayProducts {
        products: products[]
        category?: string
        totalPage?: number
    }

    interface dataGetAllCategoriesType {
        id: number
        category: string
    }
    interface tokenJWT {
        email: string
        data: {
            AccessToken: string
            RefreshToken: string
            role: string
            status: string
            user_id: number
            email: string
        }
        iat: number
        exp: number
        jti: string
    }
    interface userAuth {
        AccessToken?: string
        RefreshToken?: string
        role?: string
        status?: string
        user_id?: number
        email?: string
    }
    interface productOrder {
        userId: number
        variantId: number
        quantity: number
    }
    interface payToCart {
        userId: number
        date: string
        status: number
        totalAmount: number
        numberPhone: string
        address: string
        orderIds: number[]
    }
    interface productsOrder {
        nameProduct: string
        description: string
        image: string[]
        category: number
        price: string
        variantId: number
        orderID: number
        variants: { name: string; value: string }[]
        quantity_order: number
        quantityMax: number
    }
    interface dataProductsOrder {
        productsOrder: productsOrder[]
    }
    interface billType {
        id: number
        user_id: number
        date: string
        status: number
        total_amount: number
        numberPhone: string
        address: string
        quantities: number
        name: string
        variant_id: number
        variants: {
            name: string
            value: string
        }[]
    }
    interface dataBillType {
        resultBill: billType[][]
    }
    interface message {
        id?: number
        message: string
        receiverId: number
        senderId: number
    }
}

export {}
