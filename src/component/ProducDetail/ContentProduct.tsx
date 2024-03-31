import {
     Box,
     Button,
     Divider,
     FormControlLabel,
     Input,
     Radio,
     RadioGroup,
     Rating,
     Typography,
} from "@mui/material"

import { ChangeEvent, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { addProductToCart } from "@/app/_api/users"

const ContentProduct = ({ dataProduct }: { dataProduct: products }) => {
     const { data } = useSession()

     const [numberQuantity, setNumberQuantity] = useState<number>(1)

     const router = useRouter()

     const valueVariant: { [key: string]: string | string[] }[] = []
     dataProduct.variants?.forEach((variant) => {
          const obj: { [key: string]: string | string[] } = {}
          variant.options.forEach((option) => {
               if (valueVariant.length > 0) {
                    valueVariant.forEach((item) => {
                         if (item[option.name]) {
                              if (!item[option.name].includes(option.value)) {
                                   ;(item[option.name] as string[]).push(
                                        option.value
                                   )
                              }
                         }
                    })
               } else {
                    if (!obj[option.name]) {
                         obj[option.name] = [option.value]
                    } else {
                         ;(obj[option.name] as string[]).push(option.value)
                    }
               }
          })
          valueVariant.push(obj)
     })

     const [variantName, setVariantName] = useState<option[]>([])
     const [price, setPrice] = useState<number>(0)
     const sumQuantity = dataProduct.variants?.reduce((cur: number, next) => {
          return cur + next.quantity
     }, 0)
     const [quantity, setQuantity] = useState<number>(sumQuantity)
     const [orderProduct, setOrderProduct] = useState<productOrder>({
          userId: data?.user.id as number,
          variantId: 0,
          quantity: 0,
     })
     useEffect(() => {
          const optionCheck = dataProduct.variants?.filter((variant) => {
               return variant.options?.every((option) => {
                    return variantName.some((value) => {
                         return (
                              value.name === option.name &&
                              value.value === option.value
                         )
                    })
               })
          })
          if (optionCheck?.length > 0) {
               setOrderProduct({
                    userId: data?.user.id as number,
                    variantId: optionCheck[0]?.variant_id as number,
                    quantity: numberQuantity,
               })

               setPrice(optionCheck[0]?.price)
               setQuantity(optionCheck[0]?.quantity)
          }
     }, [variantName, numberQuantity])

     const handlerChangeRadio = (
          e: ChangeEvent<HTMLInputElement>,
          key: string
     ) => {
          setVariantName((value) => {
               const existingIndex = value.findIndex(
                    (valueX) => valueX.name === key
               )

               if (existingIndex !== -1) {
                    const updatedValue = [...value]
                    updatedValue[existingIndex] = {
                         name: key,
                         value: e.target.value,
                    }
                    return updatedValue
               } else {
                    return [
                         ...value,
                         {
                              name: key,
                              value: e.target.value,
                         },
                    ]
               }
          })

          setNumberQuantity(1)
     }
     const handlerAddToCart = async () => {
          const optionCheck = dataProduct.variants.filter((variant) => {
               return variant.options.every((option) => {
                    return variantName.some((value) => {
                         return (
                              value.name === option.name &&
                              value.value === option.value
                         )
                    })
               })
          })

          if (optionCheck.length == 0) {
               alert("Please select product variation first")
          } else if (data?.user.AccessToken) {
               await addProductToCart(orderProduct)
               alert("Item has been added to your shopping cart")
          } else {
               alert("You need to log in to add to cart.")
          }
     }
     const handlerAddToCartNow = async () => {
          const optionCheck = dataProduct.variants.filter((variant) => {
               return variant.options.every((option) => {
                    return variantName.some((value) => {
                         return (
                              value.name === option.name &&
                              value.value === option.value
                         )
                    })
               })
          })

          if (optionCheck.length == 0) {
               alert("Please select product variation first")
          } else if (data?.user.AccessToken) {
               await addProductToCart(orderProduct)
               router.push("/cart")
          } else {
               alert("You need to log in to add to cart.")
          }
     }
     const handlerChangeQuantity = (
          e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
     ) => {
          const newValue = Number(e.target.value)
          if (numberQuantity === 0) {
               setNumberQuantity(newValue)
          } else if (!newValue || newValue <= 0) {
               setNumberQuantity(1)
          } else if (newValue > quantity) {
               setNumberQuantity(quantity)
          } else {
               setNumberQuantity(newValue)
          }
     }

     return (
          <>
               <Box className="flex flex-col gap-4 ">
                    <Typography variant="h5">{dataProduct.name}</Typography>
                    <Box className="flex items-center gap-5">
                         <Box className="flex items-center">
                              <Typography variant="h6">5.0</Typography>
                              <Rating name="read-only" value={5} readOnly />
                         </Box>
                         <Divider orientation="vertical" flexItem />
                         <Box>99 Ratings</Box>
                         <Divider orientation="vertical" flexItem />
                         <Box>99 Sold</Box>
                    </Box>

                    <Box className="flex gap-5 items-center bg-[#fafafa] ">
                         {/* <Typography variant="h4" className="text-orange-700">
                              {price && price != 0
                                   ? `$ ${price}`
                                   : `$
                              ${Math?.min(
                                   ...dataProduct.variants?.map((variant) => {
                                        return variant.price
                                   })
                              )}
                              -
                              ${Math.max(
                                   ...dataProduct.variants.map((variant) => {
                                        return variant.price
                                   })
                              )}`}
                         </Typography> */}
                         <Typography variant="h4" className="text-orange-700">
                              {price && price !== 0
                                   ? `$ ${price}`
                                   : `${
                                          dataProduct.variants &&
                                          dataProduct.variants.length > 0
                                               ? `${Math.min(
                                                      ...dataProduct.variants.map(
                                                           (variant) =>
                                                                variant.price
                                                      )
                                                 )} - ${Math.max(
                                                      ...dataProduct.variants.map(
                                                           (variant) =>
                                                                variant.price
                                                      )
                                                 )}`
                                               : "No price available"
                                     }
  `}
                         </Typography>
                    </Box>

                    <Box>
                         {valueVariant
                              .filter((value) => Object.keys(value).length > 0)
                              .map((item, index) => {
                                   return (
                                        <Box key={index}>
                                             {Object.keys(item).map(
                                                  (key, index) => {
                                                       return (
                                                            <Box
                                                                 key={index}
                                                                 className="flex gap-5 items-center "
                                                            >
                                                                 <Typography>
                                                                      {key.toUpperCase()}
                                                                 </Typography>
                                                                 <RadioGroup
                                                                      key={key}
                                                                      name={key}
                                                                      value={
                                                                           variantName.find(
                                                                                (
                                                                                     valueX
                                                                                ) =>
                                                                                     valueX?.name ===
                                                                                     key
                                                                           )
                                                                                ?.value ||
                                                                           ""
                                                                      }
                                                                      onChange={(
                                                                           e
                                                                      ) =>
                                                                           handlerChangeRadio(
                                                                                e,
                                                                                key
                                                                           )
                                                                      }
                                                                      className="radio-toolbar "
                                                                 >
                                                                      <Box className="flex gap-5 ">
                                                                           {(
                                                                                item[
                                                                                     key
                                                                                ] as string[]
                                                                           ).map(
                                                                                (
                                                                                     value,
                                                                                     index
                                                                                ) => {
                                                                                     return (
                                                                                          <FormControlLabel
                                                                                               key={
                                                                                                    index
                                                                                               }
                                                                                               control={
                                                                                                    <Radio className="hidden" />
                                                                                               }
                                                                                               label={
                                                                                                    value
                                                                                               }
                                                                                               value={
                                                                                                    value
                                                                                               }
                                                                                               name={
                                                                                                    key
                                                                                               }
                                                                                               className={`${
                                                                                                    variantName.some(
                                                                                                         (
                                                                                                              valueY
                                                                                                         ) =>
                                                                                                              valueY.name ===
                                                                                                                   key &&
                                                                                                              valueY.value ===
                                                                                                                   value
                                                                                                    )
                                                                                                         ? "text-red-700 border border-red-700 border-solid bg-gray-200"
                                                                                                         : "text-black border border-black border-solid"
                                                                                               }`}
                                                                                          />
                                                                                     )
                                                                                }
                                                                           )}
                                                                      </Box>
                                                                 </RadioGroup>
                                                            </Box>
                                                       )
                                                  }
                                             )}
                                        </Box>
                                   )
                              })}
                    </Box>
                    <Box className="flex gap-5 items-center">
                         <Typography>Quantity</Typography>
                         <Box className="flex gap-5 w-[40%]">
                              <Button
                                   variant="outlined"
                                   size="small"
                                   className="p-0 "
                                   onClick={() => {
                                        if (numberQuantity > 1)
                                             setNumberQuantity(
                                                  numberQuantity - 1
                                             )
                                   }}
                              >
                                   -
                              </Button>

                              <Input
                                   type="number"
                                   value={numberQuantity}
                                   onChange={handlerChangeQuantity}
                                   className="w-[100%] text-center"
                              />

                              <Button
                                   size="small"
                                   variant="outlined"
                                   className="p-0"
                                   onClick={() => {
                                        if (numberQuantity < quantity)
                                             setNumberQuantity(
                                                  numberQuantity + 1
                                             )
                                   }}
                              >
                                   +
                              </Button>
                         </Box>
                         <Typography className="w-[160px]">
                              {quantity} pieces available
                         </Typography>
                    </Box>

                    <Box className="flex gap-5">
                         <Button
                              variant="contained"
                              className="bg-orange-700 hover:bg-orange-500  text-white"
                              onClick={handlerAddToCart}
                         >
                              Add To Cart
                         </Button>
                         <Button
                              variant="contained"
                              className="bg-orange-700 hover:bg-orange-500  text-white"
                              onClick={handlerAddToCartNow}
                         >
                              Buy Now
                         </Button>
                    </Box>

                    <Typography variant="h6">Description</Typography>
                    <Typography className="">
                         {dataProduct.description}
                    </Typography>
               </Box>
          </>
     )
}
export default ContentProduct
