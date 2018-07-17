import { reducer as formReducer } from 'redux-form'
import ThemeOptions from './ThemeOptions';
import Layout from './Layout';
import Auth from './Auth';
import brands from './shopping/brands';
import employeeIds from './employee/employeeIds';
import employees from './employee/employees';
import orders from './shopping/orders';
import products from './shopping/products';
import shops from './shopping/shops';
import categories from './shopping/categories';
import shoppingCompanies from './shopping/shopping-companies';
import companies from './company/companies';
import bills from './billing/bills';
import kpi from './reports/kpi';

export default {
  Auth,
  bills,
  brands,
  categories,
  companies,
  employees,
  employeeIds,
  ThemeOptions,
  Layout,
  orders,
  products,
  kpi,
  shops,
  shoppingCompanies,
  form: formReducer
};