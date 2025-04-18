import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useNavigate } from "react-router-dom"
import {  setSearchedQueryBrowse } from "@/redux/jobSlice"

const category=["Frontend Developer","Backend Developer","Data Science","Graphic Designer","FullStack Developer","Java Developer"]
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=(query)=>{
           dispatch(setSearchedQueryBrowse(query))
           navigate("/browse")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((cat)=>(
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
