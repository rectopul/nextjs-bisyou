"use client"

import { RullerOptions } from "@prisma/client"
import { useRef } from "react"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface RullerOptionsProps {
  ruller_options: RullerOptions[]
}

export function ListRullerOptions({ ruller_options }: RullerOptionsProps) {
  const slides = [...ruller_options, ...ruller_options, ...ruller_options]

  const settings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="w-full bg-bisyou-fontLight text-white py-6 uppercase font-medium text-sm overflow-hidden">
      <div className="w-full">
        <Slider {...settings}>
          {slides.map((r) => (
            <div key={`ro-${r.id}`}>
              <div className="flex justify-center items-center m-auto text-center">
                {r.title}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
