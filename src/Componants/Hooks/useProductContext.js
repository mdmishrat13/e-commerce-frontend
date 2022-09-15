import { useContext } from "react"
import { ProductContext } from "../../Context/ProductProvider/ProductProvider";


const useProductContext = ()=>{
    const product = useContext(ProductContext)
    return product;
}
export default useProductContext