import axios from "axios"
import { useEffect, useState } from "react"
import Rating from "react-rating"
import useAuth from "./useAuth"

const useProducts = ()=>{
    const {user} = useAuth()
    const [products,setProducts] = useState([])
    const [admin,setAdmin] = useState(false)
    const [loading,setIsLoading] =useState(false)
    const [selectedRatings,setSelectedRatings] = useState(null)
    const [searchText,setSearchText] = useState('')
    let filteredProduct = products;

    const [colors,setColors] = useState([{
      id: "red",
      name: "Red",
      checked:false
  
    },
    {
      id: "blue",
      name: "Blue",
      checked:false
  
    },
    {
      id: "black",
      name: "Black",
      checked:false
  
    },
    {
      id: "mixed",
      name: "Mixed",
      checked:false
  
    },
    {
      id: "sandalwood",
      name: "Sandalwood",
      checked:false
  
    },
    {
      id: "rosewood",
      name: "Rosewood",
      checked:false
  
    },
    {
      id: "green",
      name: "Green",
      checked:false
  
    },
    {
      id: "brown",
      name: "Brown",
      checked:false
  
    },
    {
      id: "pink",
      name: "Pink",
      checked:false
  
    },
    {
      id: "orange",
      name: "Orange",
      checked:false
  
    },
    {
      id: "white",
      name: "White",
      checked:false
  
    },
    {
      id: "violet",
      name: "Violet",
      checked:false
  
    },
    {
      id: "silver",
      name: "Silver",
      checked:false
  
    },])
    const [capacities,setCapacities] = useState([{
      id: "21liters",
      name: "21 Liters Plus",
      min:21,
      max:10000,
      checked:false
    },
    {
      id: "11liters",
      name: "11-15 Liters",
      min:11,
      max:15,
      checked:false
    },
    {
      id: "16liters",
      name: "16-20 Liters",
      min:16,
      max:20,
      checked:false
    },
    {
      id: "1liters",
      name: "1-10 Liters",
      min:1,
      max:10,
      checked:false
    },
    {
      id: "2liters",
      name: "2-3.5 Liters",
      min:2,
      max:3.5,
      checked:false
    },
    {
      id: "3liters",
      name: "3.5-5 Liters",
      min:3.5,
      max:5,
      checked:false
    },
    {
      id: "0liters",
      name: "0-2 Liters",
      min:0,
      max:2,
      checked:false
    },])
  
    const fetchData = async()=>{

        const data = await axios('http://localhost:5000/product')
        // const data = await axios('https://e-commerce-server.vercel.app/product')
        setProducts(data.data)
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


  const handleColorChecked = id =>{
    let allColors = colors;
    const checkedColor = allColors.map(item=>item.id===id?{...item,checked:!item.checked}:item);
    setColors(checkedColor)
  }
  const handleCapacityChecked = capacity =>{
    let allCapacities = capacities;
    const checkedCapacities = allCapacities.map(item=>item.id===capacity.id?{...item,checked:!item.checked}:item);
    setCapacities(checkedCapacities)
  }



  const handleSearchChange = ()=>{
    let allProducts = [...filteredProduct];

    // filtering colors 
    const colorChecked = colors.filter(item=>item.checked).map(item=>item.name.toLowerCase())
      if(colorChecked.length){
        allProducts = allProducts.filter(item=>colorChecked.includes(item.color.toLowerCase()))
      }
    
  // filtering capacities 

  const capacitychacked = capacities.filter(item=>item.checked).map(item=>item.capacity)
  if(capacitychacked.length){
    allProducts = allProducts.filter(item=>capacitychacked.includes(item.capacity))

  }
  //   // filtering search data 

   if(searchText){
    allProducts= products.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()))
   }
    // search by rating 
    if(selectedRatings){
      allProducts = allProducts.filter(item=> item.rating===selectedRatings)
    }
    setProducts(allProducts)

  }

  useEffect(()=>{
    handleSearchChange()
  },[colors,selectedRatings,searchText])


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
    admin,
    loading,
    colors,
    handleColorChecked,
    capacities,
    handleCapacityChecked,
    setSelectedRatings,
    setSearchText

}
}
export default useProducts