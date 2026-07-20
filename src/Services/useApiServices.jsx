import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//get all product api

// export function getProduct() {
//   return axios.get("https://ecommerce.routemisr.com/api/v1/products");
// }

export function useApi(endPoint) {
  const response = useQuery({
    queryKey: [endPoint],
    queryFn: function getData() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    },
  });
  return response;
}
