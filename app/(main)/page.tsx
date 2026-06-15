import { Metadata } from "next";
import Home from "../components/home/Home";
import { REQUEST_ORDERS } from "../constants/orders";
// import { getClient, serverGet } from "../lib/api";
import { RequestOrder } from "@/app/types";
import { requestsReq } from "../actions/request";


export const metadata: Metadata = {
  title: 'درخواستی',
  description: "محدودیتی وجود نداره!   جای هر درخواستی اینجاست..."
};




export default async function HomePage({ searchParams }: { searchParams: Promise<{ order?: RequestOrder }> }) {

  const q = await searchParams;
  let order = q?.order ?? "visit"
  order = !REQUEST_ORDERS.includes(order) ? "visit" : order


  const requestsData = await requestsReq({ order })
  if (!requestsData) return null;

  const { data, pagination } = requestsData;

  // return <h1>hello</h1>

  return (
    <Home data={data} meta={pagination} />
  );
}
