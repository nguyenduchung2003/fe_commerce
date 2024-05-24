"use client"
import {
    Box,
    InputBase,
    Typography,
    InputAdornment,
    TextField,
    Divider,
    Button,
    Menu,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material"
import logo from "public/logo.png"
import Image from "next/image"
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from "@mui/icons-material/Home"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { signOutAPI } from "@/app/_api/auth"
import { checkAccessToken } from "@/app/_lib/action"
import { toastCustom } from "../Custom/CustomToast"
const Navbar = () => {
    const router = useRouter()
    const session = useSession()

    const pathname = usePathname()
    const [textSearch, setTextSearch] = useState<string>("")
    const handlerViewHistory = () => {
        if (session.data?.user.AccessToken) {
            router.push("/orderhistory")
        } else {
            toastCustom("error", "You need to log in to add to cart")
        }
    }
    const customSignOut = async () => {
        await signOutAPI(session.data?.user.RefreshToken as string)
        await signOut({
            // redirect: false,
            callbackUrl: "/",
        })
    }

    return (
        <>
            <Box
                className="fixed w-full bg-white z-[100] top-0 left-0 right-0"
                id="navBar"
            >
                <Box className="flex justify-center items-center  h-[80px] w-full bg-white">
                    <Box className="flex justify-center items-center w-[90%] h-full">
                        <Box className="flex justify-center items-center h-full ">
                            {pathname == "/cart" ? (
                                <>
                                    <Box className="flex gap-5 justify-center items-center">
                                        <Image
                                            src={logo}
                                            alt="Picture of the author"
                                            width={50}
                                            height={50}
                                            className="scale-125 hover:cursor-pointer"
                                            onClick={() => {
                                                router.push("/")
                                            }}
                                            priority={true}
                                        />
                                        <Divider
                                            orientation="vertical"
                                            variant="inset"
                                            flexItem
                                            className="ml-0"
                                        />
                                        <Typography className="text-2xl font-bold">
                                            Cart
                                        </Typography>
                                    </Box>
                                </>
                            ) : (
                                <Image
                                    src={logo}
                                    alt="Picture of the author"
                                    width={50}
                                    height={50}
                                    className="scale-125 hover:cursor-pointer"
                                    onClick={() => {
                                        router.push("/")
                                    }}
                                    priority={true}
                                />
                            )}
                        </Box>
                        {pathname == "/login" ||
                        pathname == "/register" ||
                        pathname == "/forgotpassword" ? null : (
                            <>
                                <Box className="flex justify-center items-center w-[70%] h-full">
                                    {/* <InputBase
                                        placeholder="Search..."
                                        className="px-2 py-1 border border-solid border-black rounded w-[50%]"
                                   />
                                   <SearchIcon /> */}
                                    <TextField
                                        id="input-with-icon-textfield"
                                        value={textSearch}
                                        placeholder="Search products by name..."
                                        onChange={(e) =>
                                            setTextSearch(e.target.value)
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon
                                                        fontSize="small"
                                                        onClick={() => {
                                                            if (textSearch) {
                                                                router.push(
                                                                    `/search?q=${textSearch}`
                                                                )
                                                                setTextSearch(
                                                                    ""
                                                                )
                                                            } else {
                                                                toastCustom(
                                                                    "error",
                                                                    "Please enter search keywords"
                                                                )
                                                            }
                                                        }}
                                                        className=" cursor-pointer"
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                if (textSearch) {
                                                    router.push(
                                                        `/search?q=${textSearch}`
                                                    )
                                                    setTextSearch("")
                                                } else {
                                                    toastCustom(
                                                        "error",
                                                        "Please enter search keywords"
                                                    )
                                                }
                                            }
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        className="px-2 py-1  w-[50%]"
                                    />
                                </Box>
                                <Box className="flex justify-center items-center gap-5">
                                    {session.data?.user?.role == "ADMIN" ? (
                                        <Box className="flex gap-3">
                                            <Button
                                                onClick={() => {
                                                    try {
                                                        router.push(
                                                            "/productmanagement"
                                                        )
                                                    } catch (error) {
                                                        console.error(
                                                            "Failed to navigate:",
                                                            error
                                                        )
                                                    }
                                                }}
                                            >
                                                Product Management
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    try {
                                                        router.push(
                                                            "/confirmorder"
                                                        )
                                                    } catch (error) {
                                                        console.error(
                                                            "Failed to navigate:",
                                                            error
                                                        )
                                                    }
                                                }}
                                            >
                                                Order management
                                            </Button>
                                        </Box>
                                    ) : null}

                                    <Box
                                        className="flex justify-center items-center hover:bg-gray-300 hover:rounded w-[100px] h-[40px] p-1 "
                                        onClick={() => {
                                            router.push("/")
                                        }}
                                    >
                                        <HomeIcon />
                                        <Typography>Home</Typography>
                                    </Box>
                                    {session.status === "authenticated" ? (
                                        <>
                                            <Box className="flex justify-center items-center hover:bg-gray-300 hover:rounded w-[50%] h-[40px]  group/item flex-col p-1">
                                                <Box className="flex gap-2">
                                                    <InsertEmoticonIcon />
                                                    <Typography>
                                                        {
                                                            session.data.user
                                                                ?.email
                                                        }
                                                    </Typography>
                                                </Box>
                                                <List className="invisible group-hover/item:visible  shadow-lg shadow-black bg-white absolute top-[60px] rounded-md">
                                                    <ListItemButton
                                                        onClick={
                                                            handlerViewHistory
                                                        }
                                                    >
                                                        Order history
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        onClick={customSignOut}
                                                    >
                                                        Logout
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box
                                            className="flex justify-center items-center hover:bg-gray-300 hover:rounded w-[100px] h-[40px]"
                                            onClick={() => {
                                                router.push("/login")
                                            }}
                                        >
                                            <InsertEmoticonIcon />
                                            <Typography>Account</Typography>
                                        </Box>
                                    )}
                                    <Divider
                                        orientation="vertical"
                                        variant="inset"
                                        flexItem
                                        className="ml-0"
                                    />
                                    <Box
                                        onClick={() => {
                                            router.push("/cart")
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <ShoppingCartIcon />
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Navbar
