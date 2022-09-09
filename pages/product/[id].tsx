import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import { GetStaticProps } from 'next'

export const getStaticPaths = async () => {
  const response = await fetch('https://avo-app-sand.vercel.app/api/avo')
  const {data:productList }:TAPIAvoResponse = await response.json()
  const paths = productList.map(({id}) => ({params:{id}}))

  return{
    paths,
    fallback:false
  }
}

export const getStaticProps:GetStaticProps = async ({params}) => {
  const id = params?.id as String
  const response = await fetch(`https://avo-app-sand.vercel.app/api/avo/${id}`)
  const product:TProduct = await response.json()
  return{
    props:{
      product
    }
  }
}


const ProductPage = ({product}:{product:TProduct}) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
