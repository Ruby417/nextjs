import { Metadata } from 'next';
import { Suspense } from 'react';
import {
  UserGroupIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';

  const customers = await fetchFilteredCustomers(query);

  return (
    <main className="w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
            <h1 className={`${lusitana.className} text-3xl`}>
              Customers
            </h1>
          </div>

          <p className="mt-2 text-gray-500">
            View and manage customer information, invoices, and payment
            summaries.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          <UserPlusIcon className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <Search placeholder="Search customers..." />
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Customers</p>
            <UserGroupIcon className="h-7 w-7 text-blue-500" />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {customers.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Customers with Pending</p>
            <ClockIcon className="h-7 w-7 text-yellow-500" />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {
              customers.filter(
                (customer) => customer.total_pending !== '$0.00',
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Customers Paid</p>
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {
              customers.filter(
                (customer) => customer.total_paid !== '$0.00',
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">No Invoices</p>
            <XCircleIcon className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {
              customers.filter(
                (customer) => Number(customer.total_invoices) === 0,
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Customer Directory
          </h2>
        </div>

        <div className="p-4">
          <Suspense key={query}>
            <CustomersTable customers={customers} />
          </Suspense>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-xl border bg-gray-50 p-6 text-center">
        <h3 className="text-lg font-semibold">
          Customer Management Dashboard
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Manage customer records, monitor invoices, and keep track of payment
          history through a dynamic customer management system powered by
          PostgreSQL and Next.js.
        </p>
      </div>
    </main>
  );
}