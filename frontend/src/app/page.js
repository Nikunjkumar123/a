"use client"


import { Banner } from '@/components/banner/page'
// import Blog from '@/components/blog/page'
import Category from '@/components/category/page'
import FeatureCategory from '@/components/featureCategory/page'
import FeatureProduct from '@/components/featureProduct/page'
import HeroSection from '@/components/heroSection/page'
import ProductCard from '@/components/productCard/page'
import React from 'react'
import Blog from './blog/[id]/page'
import BlogCard from './blog/page'


const page = () => {
  return (
    <div>
      <Banner />
      <Category />
      <ProductCard />
      <HeroSection />
      <FeatureCategory />
      {/* <Blog /> */}
      {/* <Blog /> */}
      <BlogCard />

      <FeatureProduct />
    

    </div>
  )
}

export default page