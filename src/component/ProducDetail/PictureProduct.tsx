import { Box, Modal, Typography } from "@mui/material"
import Image from "next/image"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import { useEffect, useState } from "react"
const PictureProduct = ({ data }: { data: products }) => {
     const [startImg, setStartImg] = useState<number>(0)
     const [endImg, setEndImg] = useState<number>(4)

     const handleArrowLeft = () => {
          setStartImg((prevStart) => (prevStart <= 0 ? 0 : prevStart - 1))
          setEndImg((prevEnd) => (prevEnd <= 4 ? 4 : prevEnd - 1))
     }

     const handleArrowRight = () => {
          setEndImg((prevEnd) =>
               prevEnd > data.image.length - 1 ? data.image.length : prevEnd + 1
          )
          // setStartImg(endImg - 4)
     }
     useEffect(() => {
          const x = endImg - 4
          if (x > 0) {
               setStartImg(x)
          }
     }, [endImg])

     const [currentPicture, setCurrentPicture] = useState<string>(
          data?.image ? (data?.image[0] as string) : ""
     )
     const handlerHover = (item: string) => {
          setCurrentPicture(item)
     }

     const [pictureModal, setPictureModal] = useState(currentPicture)
     const [open, setOpen] = useState(false)
     const handleOpen = () => {
          setPictureModal(currentPicture)
          setOpen(true)
     }
     const handleClose = () => {
          setPictureModal(currentPicture)
          setOpen(false)
     }
     const handleClickModal = (item: string) => {
          setPictureModal(item)
     }
     const handleArrowLeftModal = () => {
          const indexCurrent =
               data.image.findIndex((item) => item == pictureModal) - 1
          if (indexCurrent < 0) {
               setPictureModal(data.image[data.image.length - 1])
          } else {
               setPictureModal(data.image[indexCurrent])
          }
     }

     const handleArrowRightModal = () => {
          const indexCurrent =
               data.image.findIndex((item) => item == pictureModal) + 1
          if (indexCurrent == data.image.length) {
               setPictureModal(data.image[0])
          } else {
               setPictureModal(data.image[indexCurrent])
          }
     }

     return (
          <>
               <Box className="flex flex-col justify-center items-center gap-2">
                    <Image
                         src={currentPicture}
                         width={0}
                         height={0}
                         sizes="100vw"
                         alt=""
                         className=" w-[450px] h-[450px]"
                         priority={true}
                    />
                    <Box className="flex items-center ">
                         <Box>
                              <KeyboardArrowLeftIcon
                                   className={`hover:cursor-pointer ${
                                        data?.image?.length <= 4
                                             ? "hidden"
                                             : "inline-block"
                                   }`}
                                   onClick={handleArrowLeft}
                              />
                         </Box>

                         <Box className="flex gap-3 max-w-[450px] overflow-hidden">
                              {data?.image
                                   ?.slice(startImg, endImg)
                                   ?.map((item, index) => {
                                        return (
                                             <Image
                                                  src={item}
                                                  width={0}
                                                  height={0}
                                                  sizes="100vw"
                                                  alt=""
                                                  className="object-fill  w-[100px] h-[100px] hover:border hover:border-black hover:cursor-pointer hover:border-solid"
                                                  key={index}
                                                  onMouseOver={() =>
                                                       handlerHover(item)
                                                  }
                                                  onClick={handleOpen}
                                                  priority={true}
                                             />
                                        )
                                   })}
                         </Box>
                         <Box>
                              <KeyboardArrowRightIcon
                                   className={`hover:cursor-pointer ${
                                        data.image?.length <= 4
                                             ? "hidden"
                                             : "inline-block"
                                   }`}
                                   onClick={handleArrowRight}
                              />
                         </Box>
                    </Box>
               </Box>

               <Modal open={open} onClose={handleClose}>
                    <Box className="absolute flex gap-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 border-black shadow-lg p-4 bg-white">
                         <Box className="flex justify-center items-center">
                              <Box>
                                   <KeyboardArrowLeftIcon
                                        className="hover:cursor-pointer"
                                        onClick={handleArrowLeftModal}
                                   />
                              </Box>

                              <Image
                                   src={pictureModal}
                                   width={0}
                                   height={0}
                                   sizes="100vw"
                                   alt=""
                                   className=" w-[450px] h-[450px]"
                                   priority={true}
                              />
                              <Box>
                                   <KeyboardArrowRightIcon
                                        className="hover:cursor-pointer"
                                        onClick={handleArrowRightModal}
                                   />
                              </Box>
                         </Box>

                         <Box className="flex items-center gap-10 flex-col">
                              <Typography variant="h5">{data.name}</Typography>
                              <Box className="flex items-center">
                                   <Box className="flex gap-3  flex-wrap w-[350px]">
                                        {data.image?.map((item, index) => {
                                             return (
                                                  <Image
                                                       priority={true}
                                                       src={item}
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       alt=""
                                                       className="object-fill  w-[100px] h-[100px] hover:border hover:border-black hover:cursor-pointer hover:border-solid"
                                                       key={index}
                                                       onClick={() =>
                                                            handleClickModal(
                                                                 item
                                                            )
                                                       }
                                                  />
                                             )
                                        })}
                                   </Box>
                              </Box>
                         </Box>
                    </Box>
               </Modal>
          </>
     )
}
export default PictureProduct
