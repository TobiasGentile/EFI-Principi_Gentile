import React from 'react';

const CustomersList = () => {
    const customers = [
        { id: 1, name: 'Bautista Girardi', email: 'bautistagirardi@gmail.com'},
        { id: 2, name: 'Eliana Grosso', email: 'eligrosso@gmail.com'},
    ];

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomersList;