import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({product}) {
  // console.log({product});
  
  return (
    <div>
      <Header />
      <Featured product={product}/>
    </div>
  )
}

// //fetch product from DB and pass is to '<Featured/>' component
export async function getServerSideProps() {
  const featuredProductId = '64fb055a2d2be7825f2f7a1c';

  await mongooseConnect();
  const product = await Product.findById(featuredProductId);

  return {
    props: {product: JSON.parse(JSON.stringify(product))},
  };
}