import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeFilterState, 
  applyFilter,
  resetFilter,
  selectProducts } from "../../store/productsListSlice";
import { filterConfig, filterInitialState } from "./config";
import { getMaxValueOfPropInArray, getMinValueOfPropInArray } from "../../utils/helpers";

export const ProductFilter = () => {
  const { products, filteredProducts, } = useSelector(selectProducts);
  const [filterState, setFilterState] = useState({
    ...filterInitialState,
    priceFrom: getMinValueOfPropInArray(filteredProducts, 'price'),
    priceTo: getMaxValueOfPropInArray(filteredProducts, 'price'),
  })
  const dispatch = useDispatch();
  const categories = [...new Set(products.map(item => item.category))];
  const brands =  [...new Set(products.map(item => item.brand))];
 
    // setFilterState({
    //   ...filterState,
    //   priceFrom: getMinValueOfPropInArray(filteredProducts, 'price'),
    //   priceTo: getMaxValueOfPropInArray(filteredProducts, 'price')
    // }) 

  const handleChangeFilter = (e) => {
    const { id, value, } = e.target;
    setFilterState({
      ...filterState,
      [id]: value
    });
  }
  const handleApplyFilter = () => {
    const filteredProducts = products.filter(
      (item) => {
        return filterConfig.every(rule => {
        
        return rule.filterRule(filterState[rule.id], item)})})
    dispatch(applyFilter(filteredProducts))
  }
  const handleResetFilter = () =>{
    setFilterState(filterInitialState);
    dispatch(resetFilter());
  }
  const { category, brand, priceFrom, priceTo } = filterState
    return (
        <div className="col-md-3">
        <h4>Filter</h4>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select className="form-control" id="category"
          value={category}
          onChange={(e)=>handleChangeFilter(e)}
          >
            <option value="all">All</option>
            {categories.map(item => {
              return (<option
                key={item}
                value={item}
              >{item}</option>)
            })}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="category">Brand:</label>
          <select
          value={brand}
          className="form-control" id="brand"
          onChange={(e)=>handleChangeFilter(e)}
          >
            <option value="all">All brands</option>
            {brands.map(item => {
              return (<option
                key={item}
                value={item}
              >{item}</option>)
            })}
          </select>
        </div>



        <div className="form-group">
  <label htmlFor="priceFrom">Price From:</label>
  <input 
  value={priceFrom}
  onChange={(e)=>handleChangeFilter(e)}
  type="number" className="form-control" id="priceFrom" />
</div>
<div className="form-group">
  <label htmlFor="priceTo">Price To:</label>
  <input
    value={priceTo}
  onChange={(e)=>handleChangeFilter(e)} type="number" className="form-control" id="priceTo" />
</div>

      
        <button 
        onClick={handleApplyFilter}
        className="btn btn-primary">OK</button>
        <button 
        onClick={handleResetFilter}
        className="btn btn-primary">Reset filters</button>
      </div>
      
    )
}