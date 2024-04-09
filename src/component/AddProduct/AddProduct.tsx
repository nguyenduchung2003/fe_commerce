"use client"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
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

import { ToastContainer } from "react-toastify"

interface PropertyType {
    [key: string]: string[]
}

interface CombineTypes {
    name: string
    value: string
    [key: string]: string | number
}
import { toast, TypeOptions } from "react-toastify"

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
            console.log("res", res)
            if (!res.ok) console.log("Failed to fetch uploads img ")
            const data = await res.json()
            console.log(data)
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
    const nameOptionProductUpdate = productDetail?.variants[0].options.map(
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
    const quantityUpdate = productDetail?.variants.map(
        (variant) => variant.quantity
    ) as number[]

    const priceUpdate = productDetail?.variants.map(
        (variant) => variant.price
    ) as number[]
    const [multipleQuantities, setMultipleQuantities] = useState<number[]>(
        quantityUpdate || []
    )
    const [multiplePrices, setMultiplePrices] = useState<number[]>(
        priceUpdate || []
    )

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
    }, [properties, valuesProperties, multiple])

    useEffect(() => {
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
            for (
                let i = 0, j = 0, k = 0, h = 0;
                i < multipleQuantities.length,
                    j < multiplePrices.length,
                    k < combine.length,
                    h < productDetail.variants.length;
                i++, j++, k++, h++
            ) {
                const optionVariants = {
                    variant_id: productDetail.variants[h].variant_id,
                    options: [...productDetail.variants[h].options],
                    quantity: multipleQuantities[i],
                    price: multiplePrices[j],
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

    useEffect(() => {
        setMultipleQuantities((multipleQuantities) =>
            multipleQuantities.map(() => 0)
        )
        setMultiplePrices((multiplePrices) => multiplePrices.map(() => 0))
    }, [properties])

    const handleCategory = (e: SelectChangeEvent<string>) => {
        setCategory(e.target.value)
    }
    const handlerChangePrice = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
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
    const handlerChangeQuantities = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
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

    return (
        <>
            <Box className="flex flex-col justify-center items-center  overflow-x-hidden ">
                {/* {productDetail ? null : (
                    <Typography variant="h3">Add new product</Typography>
                )} */}

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
                                                    // priority={true}
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
                            disabled={productDetail ? true : false}
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
                                    disabled={productDetail ? true : false}
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
                                                        multipleQuantities[
                                                            index
                                                        ] || 0
                                                    }
                                                    onChange={(e) =>
                                                        handlerChangeQuantities(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                ></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    required
                                                    placeholder="Price"
                                                    value={
                                                        multiplePrices[index] ||
                                                        0
                                                    }
                                                    onChange={(e) =>
                                                        handlerChangePrice(
                                                            e,
                                                            index
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
function toastCustom(
    type: TypeOptions | null | undefined,
    message: string,
    options?: (<T = {}>(props: T) => void) | null | undefined
) {
    return toast.update(toast.loading("Loading..."), {
        render: message,
        type: type,
        position: "top-right",
        isLoading: false,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: options,
    })
}
