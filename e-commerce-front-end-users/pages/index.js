import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({featuredProduct, newProducts}) {
  // console.log({featuredProduct});
  // console.log({newProducts});

  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  );
}

// //fetch product from DB and pass is to '<Featured/>' component
export async function getServerSideProps() {
  const featuredProductId = '64fb055a2d2be7825f2f7a1c';

  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});  //sort from the last 10 products recently created

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}