// import { Datas} from "@/app/lib/data"
import data from "../../../lib/models/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { convertDocToObj } from "../../../lib/models/utils";
import AddToCart from "../../../componants/headr/products/addToCart";
import productService from "../../../lib/models/services/ProductService";

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  console.log("meta",params.slug);
  
  var ParamsProductName = params.slug;
  var reWriteParams = ParamsProductName.replace("%20", " ")
  console.log("reraite",reWriteParams)
  
  const product = await productService.getBySlug(reWriteParams)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function  ProductDetails({ params }: { params: { slug: string } }) {
  var ParamsProductName = params.slug;
  var reWriteParams = ParamsProductName.replace("%20", " "); // "params.slug do%20not%20match"

  // const dataS=Datas
  // let product = data.products.find((x) => x.slug == replaced);
  const product = await productService.getBySlug(params.slug.replace("%20", " "))
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vh"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>INR {product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.countInStock > 0 ? "In stock" : "Unavilabe"}</div>
              </div>
             {
                product.countInstock !==0 &&(
                    <div className="card-actions justify-center">
                        <AddToCart 
                        item={{ ...convertDocToObj(product),qty:0,color:"", size:""}}/>
                    </div>
                )
             }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


