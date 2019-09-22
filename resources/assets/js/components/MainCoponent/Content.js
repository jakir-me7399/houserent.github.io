import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Addhouse from './House/Addhouse';
import House from './House/House';
import Edithouse from './House/Edithouse';
import AddFlat from './House/Flat/AddFlat';
import Flat from './House/Flat/Flat';
import FlatDetails from './House/Flat/FlatDetails';
import Rentform from './HouseRent/Rentform';
import RentEdit from './HouseRent/RentEdit';
import EditFlat from './House/Flat/EditFlat';
import RentList from './HouseRent/RentList'
import AddRenter from './Renter/AddRenter'
import Renterlist from './Renter/Renterlist';
import EditRenter from './Renter/EditRenter';
import RenterDetails from './Renter/RenterDetails';
import Renteraccount from './Renter/Renteraccount';
import Addrenterfromflat from './Renter/Addrenterfromflat';
import Housebalance from './HouseBalance/Housebalance';
import Expense from './HouseBalance/Expense';
import AllFlat from './House/Flat/AllFlat';
import RentDetails from './HouseRent/RentDetails';
import HouseRentList from './Report/HouseRentList'
import FlatRentList from './Report/FlatRentList'
import MonthRentList from './Report/MonthRentList'
import ExpenseList from './HouseBalance/ExpenseList';
import Expensedetails from './HouseBalance/Expensedetails';
import RenterArchive from '../Archive/RenterArchive';
import Invoice from '../Invoice/Invoice';
import Dashboard from './Dashboard/Dashboard';

class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ Dashboard } />
                <Route exact path="/add-house" component={ Addhouse } />
                <Route exact path="/house" component={ House } />
                <Route exact path="/edit-house/:house_id" component={ Edithouse } />
                <Route exact path="/:house_name_slug/flat" component={ Flat } />
                <Route exact path="/flat" component={ AllFlat } />
                <Route exact path="/add-flat" component={ AddFlat } />
                <Route exact path="/:house_name_slug/edit-flat-info/:flat_id" component={ EditFlat } />
                <Route exact path="/:house_name_slug/flat/:flat_id" component={ FlatDetails } />
                <Route exact path="/renter-list" component={ Renterlist } />
                <Route exact path="/:house_name_slug/add-renter/:flat_id" component={ Addrenterfromflat } />
                <Route exact path="/add-renter" component={ AddRenter } />
                <Route exact path="/renter-details/:renter_id" component={ RenterDetails } />
                <Route exact path="/edit-renter/:renter_id" component={ EditRenter } />
                <Route exact path="/rent-list" component={ RentList } />
                <Route exact path="/flat-rent-form" component={ Rentform } />
                <Route exact path="/rent-details/:rent_id" component={ RentDetails } />
                <Route exact path="/edit-rent/:rent_id" component={ RentEdit } />
                <Route exact path="/renter-transaction/:renter_id" component={ Renteraccount } />
                <Route exact path="/balance" component={ Housebalance } />
                <Route exact path="/expense-table" component={ Expense } />
                <Route exact path="/all-rent-list" component={ RentList } />
                <Route exact path="/house-rent-list/" component={ HouseRentList } />
                <Route exact path="/flat-rent-list/" component={ FlatRentList } />
                <Route exact path="/monthly-rent-list/" component={ MonthRentList } />
                <Route exact path="/expense-list" component={ ExpenseList } />
                <Route exact path="/expense-details/:expense_id" component={ Expensedetails } />
                <Route exact path="/renter-archive" component={ RenterArchive } />
                <Route exact path="/invoice/:invoice_id" component={ Invoice } />
            </Switch>
        )
    }
}
export default Content;