import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Stat } from './restaurantAdmin/component/Dashboard'
import Home from './restaurantAdmin/pages/Home'
import FoodItem from './restaurantAdmin/pages/FoodItem'
import AddItem from './restaurantAdmin/pages/itemPages/AddItem'
import LogOutPage from './restaurantAdmin/component/LogOutPage'
import ItemInformation from './restaurantAdmin/pages/itemPages/ItemInformation'
import Addrestaurant from './restaurantAdmin/pages/restaurantPages/Addrestaurant'
import Restaurant from './restaurantAdmin/pages/Restaurant'
import RestaInformation from './restaurantAdmin/pages/restaurantPages/RestaInformation'
import ManageOrder from './restaurantAdmin/pages/ManageOrder'
import ChartTwo from './restaurantAdmin/component/ChartTwo'
import MasterHome from './masterAdmin/pages/Home'
import { MasterStat } from './masterAdmin/component/Dashboard'
import RestRequests from './masterAdmin/pages/RestRequests'
import AddResta from './masterAdmin/pages/AddResta'
import RestaDetails from './masterAdmin/pages/RestaDetails'
import OrdersDetails from './masterAdmin/pages/OrdersDetails'
import LogOut from './masterAdmin/pages/LogOut'
import RestaurantReqDet from './masterAdmin/pages/reastaurant/RestaurantReqDet'
import RestaDetailsView from './masterAdmin/pages/reastaurant/RestaDetailsView'
import AddRestaurantInfo from './masterAdmin/pages/reastaurant/AddRestaurantInfo'
import OrdersDetView from './masterAdmin/pages/orders/OrdersDetView'

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<Stat />} />
          <Route path='/manageOrder' element={<ManageOrder />} />
          <Route path='/logOutPage' element={<LogOutPage />} />

          <Route path='foodItem' element={<FoodItem />} />
          <Route path='/foodItem/chart' element={<ChartTwo />} />
          <Route path='/foodItem/addItem' element={<AddItem />} />
          <Route path='/foodItem/addItem/itemInformation' element={<ItemInformation />} />

          <Route path='restaurant' element={<Restaurant />} />
          <Route path='/restaurant/addrestaurant' element={<Addrestaurant />} />
          <Route path='/restaurant/addrestaurant/restaInformation' element={<RestaInformation />} />
          {/* <Route path='login' element={<Login />} /> */}
          {/* <Route path='register' element={<Register />} /> */}
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Route>

        <Route path='/foodAdmin' element={<MasterHome />} >
          <Route index element={<MasterStat />} />
          <Route path='/foodAdmin/restaReuest' element={<RestRequests />} />
          <Route path='/foodAdmin/restaReuest/restaurantReqDet' element={<RestaurantReqDet />} />

          <Route path='/foodAdmin/addResta' element={<AddResta />} />
          <Route path='/foodAdmin/addResta/addRestaurantInfo' element={<AddRestaurantInfo />} />

          <Route path='/foodAdmin/restaDetails' element={<RestaDetails />} />
          <Route path='/foodAdmin/restaDetails/restaDetailsView' element={<RestaDetailsView />} />


          <Route path='/foodAdmin/ordersDetails' element={<OrdersDetails />} />
          <Route path='/foodAdmin/ordersDetails/ordersDetView' element={<OrdersDetView />} />
          <Route path='/foodAdmin/logOutMaster' element={<LogOut />} />

          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>

  </>
}

export default App

