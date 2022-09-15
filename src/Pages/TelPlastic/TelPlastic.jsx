import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Rating from "react-rating";
import useAuth from "../../Componants/Hooks/useAuth";
import useProductContext from "../../Componants/Hooks/useProductContext";
import Pagination from "../../Componants/Pagination/Pagination";
import Product from "../../Componants/Product/Product";
import "./telplastic.css";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'



const TelPlastic = () => {
  const {addToCart} = useAuth()
  const {products,filteredProduct,handleSearchChange} = useProductContext()
  const [currentPage,setCurrentPage]= useState(1)
  const [productPerPage,setProductPerPage]= useState(72)
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = products.slice(indexOfFirstProduct,indexOfLastProduct)
  const [onCapacityChange,setOnCapacityChange] = useState({})
  const [rating,setRating] = useState()

 

  const paginate = pageNumber=>setCurrentPage(pageNumber)
  const capacities = [
    {
      id: "21liters",
      name: "21 Liters Plus",
      value:21
    },
    {
      id: "11liters",
      name: "11-15 Liters",
      value:11
    },
    {
      id: "16liters",
      name: "16-20 Liters",
      value:16
    },
    {
      id: "1liters",
      name: "1-10 Liters",
      value:1
    },
    {
      id: "2liters",
      name: "2-3.5 Liters",
      value:2
    },
    {
      id: "3liters",
      name: "3.5-5 Liters",
      value:3
    },
    {
      id: "0liters",
      name: "0-2 Liters",
      value:0
    },
  ];
  const colors = [
    {
      id: "red",
      name: "Red",
    },
    {
      id: "blue",
      name: "Blue",
    },
    {
      id: "black",
      name: "Black",
    },
    {
      id: "mixed",
      name: "Mixed",
    },
    {
      id: "sandalwood",
      name: "Sandalwood",
    },
    {
      id: "rosewood",
      name: "Rosewood",
    },
    {
      id: "green",
      name: "Green",
    },
    {
      id: "brown",
      name: "Brown",
    },
    {
      id: "pink",
      name: "Pink",
    },
    {
      id: "orange",
      name: "Orange",
    },
    {
      id: "white",
      name: "White",
    },
    {
      id: "violet",
      name: "Violet",
    },
    {
      id: "silver",
      name: "Silver",
    },
  ];
  const vendors = [{ id: 1, name: "TEL Distribution" }];
  const emis = [
    {
      id: 1,
      name: "Emi Availability",
    },
  ];
  const discounts = [
    {
      id: 1,
      name: "25% OFF",
    },
    {
      id: 2,
      name: "20% OFF",
    },
    {
      id: 3,
      name: "15% OFF",
    },
    {
      id: 4,
      name: "10% OFF",
    },
  ];

  return (
    <div className="telplastic">
      <div className="container telplastic__container">
        <div className="telplastic__left-menu-bar">
          <div className="telplastic__left-capacity">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>Capacity</h4>
                <small>Sort(A-Z)</small>
              </div>
              <div className="left__menu-title-input">
                <input placeholder="Search by Specifications..." type="text" />
                <i className="uil uil-search"></i>
              </div>
            </div>
            <ul className="left__menu-checkbox-inputs">
              {capacities.map((capacity) =><li key={capacity.id}>
                  <input
                  onClick={(e)=>handleSearchChange(e.target.value)}
                    type="checkbox"
                    id={capacity.id}
                    name={capacity.name}
                    value={capacity.value}
                  />
                  <label htmlFor={capacity.id}>{capacity.name}</label>
                </li>
              )}
            </ul>
          </div>

          <div className="telplastic__left-capacity">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>Color</h4>
                <small>Sort(A-Z)</small>
              </div>
              <div className="left__menu-title-input">
                <input placeholder="Search by Specifications..." type="text" />
                <i className="uil uil-search"></i>
              </div>
            </div>
            <ul className="left__menu-checkbox-inputs color-inputs">
              {colors.map((color) =><li key={color.id}>
                  <input
                  onClick={e=>handleSearchChange(e.target.value)}
                    type="checkbox"
                    id={color.id}
                    name={color.name}
                    value={color.name}
                  />
                  <label htmlFor={color.id}>{color.name}</label>
                </li>
              )}
            </ul>
          </div>

          {/* Filter By Vendors section  */}

          <div className="telplastic__left-capacity">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>Filter By Vendors</h4>
              </div>
              <div className="left__menu-title-input">
                <input placeholder="Search by Specifications..." type="text" />
                <i className="uil uil-search"></i>
              </div>
            </div>
            <ul className="left__menu-checkbox-inputs">
              {vendors.map((vendor) => <li key={vendor.id}>
                  <input
                    type="checkbox"
                    id={vendor.id}
                    name={vendor.id}
                    value={vendor.id}
                  />
                  <label htmlFor={vendor.id}>{vendor.name}</label>
                </li>
              )}
            </ul>
          </div>

          {/* EmI section  */}

          <div className="telplastic__left-capacity">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>EMI</h4>
              </div>
              <div className="left__menu-title-input">
                <input placeholder="Search by Specifications..." type="text" />
                <i className="uil uil-search"></i>
              </div>
            </div>
            <ul className="left__menu-checkbox-inputs">
              {emis.map((emi) => (
                <li key={emi.id}>
                  <input
                    type="checkbox"
                    id={emi.id}
                    name={emi.id}
                    value={emi.id}
                  />
                  <label htmlFor={emi.id}>{emi.name}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* discount applied  */}

          <div className="telplastic__left-capacity">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>Discount Applied</h4>
              </div>
              <div className="left__menu-title-input">
                <input placeholder="Search by Specifications..." type="text" />
                <i className="uil uil-search"></i>
              </div>
            </div>
            <ul className="left__menu-checkbox-inputs">
              {discounts.map((discount) => (
                <li key={discount.id}>
                  <input
                    type="checkbox"
                    id={discount.id}
                    name={discount.name}
                    value={discount.id}
                  />
                  <label htmlFor={discount.id}>{discount.name}</label>
                </li>
              ))}
            </ul>
          </div>
          {/* filter by rating  */}
          <div className="telplastic__left-capacity filter__by-rating">
            <div className="left__menu-title">
              <div className="left__menu-title-texts">
                <h4>Filter by Rating</h4>
              </div>
            </div>
           
            <h4 className="left__menu-checkbox-inputs rattings__filter mt-1">
            <Rating initialRating={0} onClick={value=>handleSearchChange(value.toString())} emptySymbol={<FontAwesomeIcon className="color-golden" icon={farStar} />} fullSymbol={<FontAwesomeIcon className="color-golden" icon={faStar} />}></Rating>
            </h4>
          </div>
        </div>

        {/* ************** right section *************   */}

        <div className="telplastic__right-section">
          <h2 className="telplastic__right-title">TEL PLASTICS</h2>

          <div className="telplastic__right-filters">
            <div className="sorting-filters">
              <label htmlFor="sorting">Sort by</label>
              <select id="sorting" name="sorting" form="sorting">
                <option value='position'>Position</option>
                <option value="nameAz">Name: A to Z</option>
                <option value="nameZa">Name: Z to A</option>
                <option value="priceLtoH">Price: Low to High</option>
                <option value="priceHtoL">Price: High to Low</option>
                <option value="new">New Arrivals</option>
                <option value="featured">Featured</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="display-filters">
              <label htmlFor="sorting">Display</label>
              <select onChange={(e)=>setProductPerPage(e.target.value)} id="sorting" name="sorting" form="sorting">
                <option value={72}>72</option>
                <option value={96}>96</option>
                <option value={120}>120</option>
              </select>
              <small>Per Page</small>
            </div>
          </div>

          <div className="telplastic__products">
            {filteredProduct?.map((product)=><Product key={product?._id} addToCart={addToCart} product={product}></Product>)}
          </div>
          
        </div>
      </div>
      <div className="pagination">
            <Pagination productPerPage={productPerPage} totalProducts={filteredProduct?.length} paginate={paginate}></Pagination>
          </div>
    </div>
  );
};

export default TelPlastic;
