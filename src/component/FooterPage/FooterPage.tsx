import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Thu1 from "public/Thu1.png"
import Thu2 from "public/Thu2.png"
import Thu3 from "public/Thu3.png"
import Thu4 from "public/Thu4.png"
import Thu5 from "public/Thu5.png"
import Thu6 from "public/Thu6.png"
import Thu7 from "public/Thu7.png"
import Thu8 from "public/Thu8.png"

const FooterPage = () => {
     const dataImg = [Thu1, Thu2, Thu3, Thu4, Thu5, Thu6, Thu7, Thu8]
     return (
          <>
               <Box className="flex justify-evenly mt-8 bg-white pt-[20px]">
                    <Box className="flex flex-col gap-2">
                         <Typography className="font-bold mb-[10px]">
                              Warranty Policy
                         </Typography>
                         <Typography>Help Center</Typography>
                         <Typography>Buying Guide</Typography>
                         <Typography>Selling Guide</Typography>
                         <Typography>Payment</Typography>
                         <Typography>Shipping</Typography>
                         <Typography>Returns & Refunds</Typography>
                         <Typography>Customer Care</Typography>
                         <Typography>Warranty Policy</Typography>
                    </Box>
                    <Box className="h-full flex flex-col gap-2 ">
                         <Typography className="font-bold mb-[10px]">
                              About Us
                         </Typography>
                         <Typography>Careers</Typography>
                         <Typography>Terms</Typography>
                         <Typography>Privacy Policy</Typography>
                         <Typography>Authentic Products</Typography>
                         <Typography>Seller Channels</Typography>
                         <Typography>Flash Sales</Typography>
                    </Box>
                    <Box className="flex flex-col gap-2">
                         <Typography className="font-bold mb-[10px]">
                              Pay
                         </Typography>
                         <Box className="flex flex-wrap w-[200px] gap-4">
                              {dataImg.map((item, index) => {
                                   return (
                                        <Image
                                             src={item}
                                             width={60}
                                             height={30}
                                             sizes="100vw"
                                             alt={""}
                                             key={index}
                                             className="object-cover"
                                             priority={true}
                                        />
                                   )
                              })}
                         </Box>
                    </Box>
                    <Box className="h-full flex flex-col gap-2">
                         <Typography className="font-bold mb-[10px]">
                              Follow Us
                         </Typography>
                         <Typography>Facebook</Typography>
                         <Typography>Instagram</Typography>
                         <Typography>LinkedLn</Typography>
                    </Box>
               </Box>
          </>
     )
}
export default FooterPage
