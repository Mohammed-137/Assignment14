import React from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';

function CustomerListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Add New Customer</h2>
          <CustomerForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Customer List</h2>
          <CustomerList />
        </div>
      </div>
    </div>
  );
}

export default CustomerListPage;
