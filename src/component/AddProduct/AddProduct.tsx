"use client"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import {
    Box,
    Input,
    Button,
    Typography,
    Autocomplete,
    TextField,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    SelectChangeEvent,
} from "@mui/material"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import { toastCustom } from "../Custom/CustomToast"
import DialogUpdateChip from "./DialogUpdateChip"

interface PropertyType {
    [key: string]: string[]
}

interface CombineTypes {
    name: string
    value: string
    [key: string]: string | number
}
interface option {
    option_id?: number
    name: string
    value: string
}
interface optionUpdate {
    option: option[]
    quantity: number
    price: number
}

const AddProductComponent = ({
    dataGetAllCategories,
    addProduct,
    productDetail,
    updateProduct,
    setOpenModal,
    setOpenModalAdd,
}: {
    dataGetAllCategories: dataGetAllCategoriesType[]
    addProduct?: (product: products) => Promise<any>
    productDetail?: products
    updateProduct?: (product: products) => Promise<any>
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModalAdd?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [nameP, setNameP] = useState<string>(
        productDetail ? productDetail.name : ""
    )
    const [category, setCategory] = useState<string>(
        productDetail ? (productDetail.category as unknown as string) : ""
    )
    const [description, setDescription] = useState<string>(
        productDetail ? productDetail.description : ""
    )
    const ima = productDetail?.image.map((item) => {
        const lastIndex = item.lastIndexOf("/")
        const questionMarkIndex = item.indexOf("?")
        const namePicture = item.substring(
            lastIndex + 1,
            questionMarkIndex !== -1 ? questionMarkIndex : undefined
        )
        return namePicture
    }) as string[]
    const [image, setImage] = useState<string[]>(productDetail ? ima : [])
    const [file, setFile] = useState<string[]>(
        productDetail ? productDetail.image : []
    )

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append("image", files[i])
            }

            const res = await fetch("http://localhost:7070/admin/upload", {
                method: "POST",
                body: formData,
                cache: "no-store",
            })

            if (!res.ok) console.log("Failed to fetch uploads img ")
            const data = await res.json()

            if (data) {
                setImage((image) => [...image, data.fileName])
                setFile((file) => [...file, data.URLImage])
            }
        } else {
            toastCustom("error", "Please upload picture!")
            return
        }
    }
    const deletePicture = async (item: string, name: string) => {
        const res = await fetch("http://localhost:7070/admin/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: name,
            }),
            cache: "no-store",
        })

        if (!res.ok) console.log("Failed to fetch delete img ", res)

        setImage((names) => names.filter((nameFile) => nameFile != name))
        setFile((file) => file.filter((file) => file != item))
    }
    const nameOptionProductUpdate = productDetail?.variants[0]?.options?.map(
        (option) => option.name
    )
    const [properties, setProperties] = useState<string[]>(
        nameOptionProductUpdate ? nameOptionProductUpdate : []
    )
    const [inputValuesProperties, setInputValuesProperties] = useState<
        string[]
    >([])

    const multipleProperties = productDetail?.variants.reduce(
        (properties: any, item) => {
            item.options.forEach((option) => {
                if (!properties[option.name]) {
                    properties[option.name] = []
                }
                if (!properties[option.name].includes(option.value)) {
                    properties[option.name].push(option.value)
                }
            })
            return properties
        },
        {}
    )

    const [multiple, setMultiple] = useState<PropertyType>(
        productDetail ? multipleProperties : {}
    )
    const [valuesProperties, setvaluesProperties] = useState<PropertyType>(
        productDetail ? multipleProperties : {}
    )

    const combinesProductUpdate = productDetail?.variants.map((variant) => {
        return variant.options.map((option) => {
            return {
                option_id: option.option_id,
                name: option.name,
                value: option.value,
            }
        })
    }) as {
        option_id?: number
        name: string
        value: string
    }[][]

    const [combine, setCombine] = useState<
        {
            name: string
            value: string
            option_id?: number
        }[][]
    >(productDetail ? combinesProductUpdate : [])

    // const quantityUpdate = productDetail?.variants.map(
    //     (variant) => variant.quantity
    // ) as number[]

    // const priceUpdate = productDetail?.variants.map(
    //     (variant) => variant.price
    // ) as number[]

    // const [multipleQuantities, setMultipleQuantities] = useState<number[]>(
    //     quantityUpdate || []
    // )
    // const [multiplePrices, setMultiplePrices] = useState<number[]>(
    //     priceUpdate || []
    // )
    const [multipleQuantities, setMultipleQuantities] = useState<number[]>([])
    const [multiplePrices, setMultiplePrices] = useState<number[]>([])
    const options = productDetail?.variants.map((variant) => {
        return {
            option: variant.options.map((option) => {
                return {
                    option_id: option?.option_id,
                    name: option.name,
                    value: option.value,
                }
            }),
            quantity: variant.quantity,
            price: variant.price,
        }
    })
    const [optionsProductUpdate, setOptionsProductUpdate] = useState<
        optionUpdate[]
    >(options || [])

    useEffect(() => {
        properties.forEach((property) => {
            if (
                !multiple[property] &&
                Array.isArray(valuesProperties[property])
            ) {
                setMultiple((multiple) => ({
                    ...multiple,
                    [property]: [...valuesProperties[property]],
                }))
            }
        })

        setMultiple((multiple) => {
            const updatedMultiple = { ...multiple }
            const keyFilter = Object.keys(updatedMultiple).filter(
                (itemKey) => !properties.includes(itemKey)
            )
            for (const key of keyFilter) {
                delete updatedMultiple[key]
            }

            return updatedMultiple
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties, valuesProperties])

    useEffect(() => {
        console.log("thay doi 243")
        const keys = Object.keys(multiple)
        const values = Object.values(multiple)

        const combinations: any[] = []

        while (keys.length > 0) {
            const key = keys.shift()
            const value = values.shift()
            const newCombinations: any[] = []
            if (combinations.length > 0) {
                combinations.forEach((combination) => {
                    value?.forEach((v) => {
                        if (Array.isArray(combination)) {
                            newCombinations.push([
                                ...combination,
                                {
                                    name: key as string,
                                    value: v,
                                },
                            ])
                        } else {
                            newCombinations.push([
                                {
                                    ...combination,
                                },
                                {
                                    name: key as string,
                                    value: v,
                                },
                            ])
                        }
                    })
                })
            } else {
                value?.forEach((v) => {
                    newCombinations.push([
                        {
                            name: key as string,
                            value: v,
                        },
                    ])
                })
            }
            combinations.push(...newCombinations)
        }
        const combinationsFilter = combinations.filter((value) => {
            value.filter((item: any) => properties.includes(item.name))

            return value.length === properties.length
        })

        setCombine(combinationsFilter)

        setOptionsProductUpdate((optionsProductUpdate) => {
            const customOptionsProductUpdate = [...optionsProductUpdate]

            // const newOptionsProductUpdate = combinationsFilter.filter(
            //     (item) =>
            //         !customOptionsProductUpdate.some((option) =>
            //             option.option.every((optionItem, index) => {
            //                 return (
            //                     optionItem.name === item[index].name &&
            //                     optionItem.value === item[index].value
            //                 )
            //             })
            //         )
            // )
            // const newOptionsProductUpdate = combinationsFilter.filter(
            //     (item) =>
            //         !customOptionsProductUpdate.every(
            //             (option) =>
            //                 option.option.length === item.length &&
            //                 option.option.every((optionItem, index) => {
            //                     return (
            //                         optionItem.name === item[index].name &&
            //                         optionItem.value === item[index].value
            //                     )
            //                 })
            //         )
            // )
            // newOptionsProductUpdate.forEach((item) => {
            //     customOptionsProductUpdate.push({
            //         option: item,
            //         quantity: 0,
            //         price: 0,
            //     })
            // })
            combinationsFilter.forEach((item) => {
                const existingOption = customOptionsProductUpdate.find(
                    (option) =>
                        option.option.length === item.length &&
                        option.option.every((optionItem, index) => {
                            return (
                                optionItem.name === item[index].name &&
                                optionItem.value === item[index].value
                            )
                        })
                )

                if (!existingOption) {
                    customOptionsProductUpdate.push({
                        option: item,
                        quantity: 0,
                        price: 0,
                    })
                }
            })
            const finalCustomOptionsProductUpdate =
                customOptionsProductUpdate.filter((customOption) =>
                    combinationsFilter.some(
                        (item) =>
                            item.length === customOption.option.length &&
                            item.every((itemElement: any, index: number) => {
                                return (
                                    itemElement.name ===
                                        customOption.option[index].name &&
                                    itemElement.value ===
                                        customOption.option[index].value
                                )
                            })
                    )
                )
            // console.log(
            //     "customOptionsProductUpdate",
            //     finalCustomOptionsProductUpdate
            // )
            return finalCustomOptionsProductUpdate
        })
    }, [multiple, properties])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const variantss = []
        for (
            let i = 0, j = 0, k = 0;
            i < multipleQuantities.length,
                j < multiplePrices.length,
                k < combine.length;
            i++, j++, k++
        ) {
            const optionVariants = {
                options: combine[k],
                quantity: multipleQuantities[i],
                price: multiplePrices[j],
            }
            variantss.push(optionVariants)
        }
        const variantssUpdate = []
        if (productDetail) {
            for (let i = 0; i < optionsProductUpdate.length; i++) {
                // const optionVariants = {
                //     variant_id: productDetail.variants[i]?.variant_id,
                //     options: optionsProductUpdate[i].option,
                //     quantity: optionsProductUpdate[i].quantity,
                //     price: optionsProductUpdate[i].price,
                // }
                // variantssUpdate.push(optionVariants)
                const matchingVariant = productDetail.variants.find(
                    (variant) =>
                        variant.options.length ===
                            optionsProductUpdate[i].option.length &&
                        variant.options.every((optionItem, index) => {
                            return (
                                optionItem.name ===
                                    optionsProductUpdate[i].option[index]
                                        .name &&
                                optionItem.value ===
                                    optionsProductUpdate[i].option[index].value
                            )
                        })
                )

                const optionVariants = {
                    variant_id: matchingVariant
                        ? matchingVariant.variant_id
                        : undefined,
                    options: optionsProductUpdate[i].option,
                    quantity: optionsProductUpdate[i].quantity,
                    price: optionsProductUpdate[i].price,
                }

                variantssUpdate.push(optionVariants)
            }
        }

        if (file.length == 0) {
            toastCustom("error", "Please upload picture!")
        } else {
            const dataProductAdd = {
                name: nameP,
                category: category as unknown as number,
                image: file,
                description: description,
                variants: variantss,
            }

            const dataProductUpdate = {
                name: nameP,
                category: category as unknown as number,
                image: file,
                description: description,
                variants: variantssUpdate,
                productId: productDetail?.id,
            }

            if (
                variantss.length == 0 ||
                (productDetail && variantssUpdate.length == 0)
            ) {
                toastCustom("error", "Please add variant!")
                return
            }
            toastCustom(
                "success",
                `${productDetail ? "Update" : "Add"}product success!`,
                async () => {
                    if (addProduct && !productDetail) {
                        console.log(dataProductAdd)
                        try {
                            setOpenModalAdd && setOpenModalAdd(false)
                            await addProduct(dataProductAdd)
                        } catch (error) {
                            console.log(error)
                        }
                    } else if (updateProduct) {
                        // console.log("dataProductUpdate", dataProductUpdate)
                        setOpenModal && setOpenModal(false)

                        await updateProduct(dataProductUpdate)
                    }

                    setNameP("")
                    setDescription("")
                    setCategory("")
                    setImage([])
                    setFile([])
                    setProperties([])
                }
            )
        }
    }

    // useEffect(() => {
    //     if (!productDetail) {
    //         setMultipleQuantities((multipleQuantities) =>
    //             multipleQuantities.map(() => 0)
    //         )
    //         setMultiplePrices((multiplePrices) => multiplePrices.map(() => 0))
    //     }
    // }, [properties, productDetail])

    const handleCategory = (e: SelectChangeEvent<string>) => {
        setCategory(e.target.value)
    }
    const handlerChangePrice = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        combineProperty: option[]
    ) => {
        if (productDetail) {
            setOptionsProductUpdate((optionsProductUpdate) => {
                const customOptionsProductUpdate = [...optionsProductUpdate]
                const newValue = parseInt(e.target.value)
                if (newValue >= 0) {
                    const index = customOptionsProductUpdate.findIndex((item) =>
                        item.option.every((option, index) => {
                            return (
                                option.name === combineProperty[index].name &&
                                option.value === combineProperty[index].value
                            )
                        })
                    )

                    customOptionsProductUpdate[index].price = newValue
                    return customOptionsProductUpdate
                }
                return customOptionsProductUpdate
            })
        } else {
            setMultiplePrices((multiplePrices) => {
                const customMultiplePrices = [...multiplePrices]
                const newValue = parseInt(e.target.value)
                if (newValue >= 0) {
                    customMultiplePrices[index] = newValue
                    return customMultiplePrices
                }
                return customMultiplePrices
            })
        }
    }
    const handlerChangeQuantities = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        combineProperty: option[]
    ) => {
        if (productDetail) {
            setOptionsProductUpdate((optionsProductUpdate) => {
                const customOptionsProductUpdate = [...optionsProductUpdate]
                const newValue = parseInt(e.target.value)
                if (newValue >= 0) {
                    const index = customOptionsProductUpdate.findIndex((item) =>
                        item.option.every((option, index) => {
                            return (
                                option.name === combineProperty[index].name &&
                                option.value === combineProperty[index].value
                            )
                        })
                    )
                    customOptionsProductUpdate[index].quantity = newValue || 0
                    return customOptionsProductUpdate
                }
                return customOptionsProductUpdate
            })
        } else {
            setMultipleQuantities((multipleQuantity) => {
                const customMultipleQuantities = [...multipleQuantity]
                const newValue = parseInt(e.target.value)
                if (newValue >= 0) {
                    customMultipleQuantities[index] = newValue
                    return customMultipleQuantities
                }
                return customMultipleQuantities
            })
        }
    }
    // useEffect(() => {
    //     console.log("multiple", multiple)
    //     console.log("optionsProductUpdate", optionsProductUpdate)
    //     console.log("combine", combine)
    // }, [])

    return (
        <>
            <Box className="flex flex-col justify-center items-center  overflow-x-hidden ">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center gap-10"
                >
                    <Box className="w-[100%] flex flex-col justify-center items-center gap-10">
                        <Box className="w-[400px]">
                            <Typography>Name</Typography>
                            <Input
                                required
                                type="text"
                                placeholder="Enter name..."
                                value={nameP}
                                onChange={(e) => setNameP(e.target.value)}
                                className="w-[100%]"
                            />
                        </Box>

                        <Box className="w-[400px]">
                            <Typography>Description</Typography>
                            <TextareaAutosize
                                style={{
                                    resize: "none",
                                }}
                                required
                                minRows={3}
                                placeholder="Enter a description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-[100%]"
                            />
                        </Box>
                        <FormControl required className="w-[400px] ">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category *"
                                onChange={handleCategory}
                                MenuProps={{
                                    PaperProps: {
                                        style: { maxHeight: "200px" },
                                    },
                                }}
                            >
                                {dataGetAllCategories?.map(
                                    (categories, index) => {
                                        return (
                                            <MenuItem
                                                value={categories.id}
                                                key={index}
                                            >
                                                {categories.category}
                                            </MenuItem>
                                        )
                                    }
                                )}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <Button variant="contained" component="label">
                            Upload File Picture
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={onFileChange}
                                hidden
                            />
                        </Button>

                        <Box className="flex gap-5 flex-wrap justify-center items-center flex-row w-[100vw] ">
                            {file?.map((item, indexNumber) => {
                                return (
                                    <Box
                                        key={indexNumber}
                                        className="flex flex-col w-[250px] "
                                    >
                                        {item ? (
                                            <>
                                                <Image
                                                    src={`${item}`}
                                                    width={250}
                                                    height={250}
                                                    alt="Uploaded Image"
                                                    className="object-cover"
                                                    loading="lazy"
                                                />

                                                <Button
                                                    onClick={() =>
                                                        deletePicture(
                                                            item,
                                                            image[indexNumber]
                                                        )
                                                    }
                                                >
                                                    Delete Picture
                                                </Button>
                                            </>
                                        ) : null}
                                    </Box>
                                )
                            })}
                        </Box>
                        <Typography className="relative left-[-150px]">
                            Add variants
                        </Typography>
                        <Autocomplete
                            disabled={
                                productDetail?.forSale == 1 ? true : false
                            }
                            className="w-[400px] "
                            multiple
                            options={[...new Set(inputValuesProperties)]}
                            freeSolo
                            value={properties}
                            onChange={(event, newValue) => {
                                setProperties(newValue)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setInputValuesProperties((oldArray) => [
                                        ...oldArray,
                                        (e.target as HTMLInputElement).value,
                                    ])
                                }
                            }}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                )
                            }}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={index}
                                        label={option}
                                    />
                                ))
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        placeholder="Thuộc tính"
                                    />
                                )
                            }}
                        />
                    </Box>
                    {properties.map((value, index) => {
                        return (
                            <Box className="w-[400px]" key={index}>
                                <Typography>{value}</Typography>
                                <Autocomplete
                                    // disabled={productDetail ? true : false}
                                    multiple
                                    key={value}
                                    freeSolo
                                    options={
                                        valuesProperties[value]
                                            ? [
                                                  ...new Set(
                                                      valuesProperties[value]
                                                  ),
                                              ]
                                            : []
                                    }
                                    value={
                                        multiple[value] ? multiple[value] : []
                                    }
                                    onChange={(event, newValue) => {
                                        setMultiple(() => {
                                            return {
                                                ...multiple,
                                                [value]: newValue,
                                            }
                                        })
                                    }}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option}>
                                                {option}
                                            </li>
                                        )
                                    }}
                                    renderTags={(tagValue, getTagProps) => {
                                        return tagValue.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={index}
                                                label={option}
                                                disabled={
                                                    productDetail?.forSale == 1
                                                        ? true
                                                        : false
                                                }
                                            />
                                        ))
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setvaluesProperties((oldArray) => {
                                                const newArray = {
                                                    ...oldArray,
                                                    [value]: Array.isArray(
                                                        oldArray[value]
                                                    )
                                                        ? [...oldArray[value]]
                                                        : [],
                                                }
                                                newArray[value].push(
                                                    (
                                                        e.target as HTMLInputElement
                                                    ).value
                                                )
                                                return newArray
                                            })
                                        }
                                    }}
                                    renderInput={(params) => {
                                        // console.log(params)
                                        return (
                                            <TextField
                                                {...params}
                                                placeholder={value}
                                            />
                                        )
                                    }}
                                />
                            </Box>
                        )
                    })}
                    {properties && properties.length > 0 ? (
                        <Table
                            className={`w-[${productDetail ? "70%" : "70%"}]`}
                        >
                            <TableHead>
                                <TableRow>
                                    {properties.map((property, index) => (
                                        <TableCell key={index + 10}>
                                            {property}
                                        </TableCell>
                                    ))}

                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {combine.map((combineProperty, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {combineProperty.map(
                                                (
                                                    value: CombineTypes,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <TableCell key={index}>
                                                            {properties.map(
                                                                (
                                                                    property,
                                                                    index
                                                                ) => {
                                                                    if (
                                                                        property ==
                                                                        value.name
                                                                    ) {
                                                                        return value.value
                                                                    }
                                                                }
                                                            )}
                                                        </TableCell>
                                                    )
                                                }
                                            )}

                                            <TableCell>
                                                <TextField
                                                    required
                                                    placeholder="Quantity"
                                                    value={
                                                        // multipleQuantities[
                                                        //     index
                                                        // ] || 0
                                                        productDetail
                                                            ? optionsProductUpdate?.find(
                                                                  (item) =>
                                                                      item.option.every(
                                                                          (
                                                                              option,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  option.name ===
                                                                                      combineProperty[
                                                                                          index
                                                                                      ]
                                                                                          .name &&
                                                                                  option.value ===
                                                                                      combineProperty[
                                                                                          index
                                                                                      ]
                                                                                          .value
                                                                              )
                                                                          }
                                                                      )
                                                              )?.quantity || 0
                                                            : multipleQuantities[
                                                                  index
                                                              ] || 0
                                                    }
                                                    onChange={(e) =>
                                                        handlerChangeQuantities(
                                                            e,
                                                            index,
                                                            combineProperty
                                                        )
                                                    }
                                                ></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    required
                                                    placeholder="Price"
                                                    value={
                                                        // multiplePrices[index] ||
                                                        // 0
                                                        productDetail
                                                            ? optionsProductUpdate?.find(
                                                                  (item) =>
                                                                      item.option.every(
                                                                          (
                                                                              option,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  option.name ===
                                                                                      combineProperty[
                                                                                          index
                                                                                      ]
                                                                                          .name &&
                                                                                  option.value ===
                                                                                      combineProperty[
                                                                                          index
                                                                                      ]
                                                                                          .value
                                                                              )
                                                                          }
                                                                      )
                                                              )?.price || 0
                                                            : multiplePrices[
                                                                  index
                                                              ] || 0
                                                    }
                                                    onChange={(e) =>
                                                        handlerChangePrice(
                                                            e,
                                                            index,
                                                            combineProperty
                                                        )
                                                    }
                                                ></TextField>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    ) : null}

                    <Button type="submit" className="border border-solid mb-2">
                        {productDetail ? "Update Product" : "Add Product"}
                    </Button>
                </form>
            </Box>
        </>
    )
}
export default AddProductComponent
