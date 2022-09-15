import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "./useAuth"

const useProducts = ()=>{
    const {user} = useAuth()
    const [products,setProducts] = useState([])
  const [filteredProduct,setFilteredProduct] = useState([])
  const [admin,setAdmin] = useState(false)
  const [loading,setIsLoading] =useState(false)
  // let searchTexts = []


    const fetchData = async()=>{
        const data = await axios('https://e-commerce-server.vercel.app/product')
        setProducts(data.data)
        setFilteredProduct(data.data)
    }
    useEffect(()=>{
      fetchData()
  },[])


  const [allOrders,setAllOrders] = useState([])

  const getAllOrders=async()=>{
    const data = await axios('https://e-commerce-server.vercel.app/order')
    setAllOrders(data.data)
  }
  useEffect(()=>{
    getAllOrders()
  },[])

  const handleSearchChange = e =>{
    console.log(e)
    let data = [...filteredProduct]
    const searchedData= products.filter(item=> item.name.toLowerCase().includes(e.toLowerCase())||item.color.toLowerCase().includes(e.toLowerCase())||item.vendor===e||item.rating===e)
    data = searchedData
    setFilteredProduct(data)
  }


  const checkAdmin = async()=>{
    if(!user){
      setIsLoading(true)
    }
    if(user){
      setIsLoading(true)
      try {
      const data = await axios(`https://e-commerce-server.vercel.app/user/${user.email}`)
      setAdmin(data.data.isAdmin)
      setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    
  }
  useEffect(()=>{
    checkAdmin()
  },[user])

return {
    products,
    allOrders,
    handleSearchChange,
    filteredProduct,
    admin,
    loading
}
}
export default useProducts