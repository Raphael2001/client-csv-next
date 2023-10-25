"use client";

import React, { useEffect } from "react";

import { useAppSelector } from "hooks/useRedux";
import Api from "api/requests";
import ClientsTable from "components/ClientsTable/ClientsTable";

function AvailableClientsPage() {
  const availableClients = useAppSelector((store) => store.availableClients);

  useEffect(() => {
    if (!availableClients || availableClients.length === 0) {
      Api.getAvailableClients();
    }
  }, [availableClients]);

  return (
    <ClientsTable
      data={availableClients}
      apiFunction={Api.getLinkForAvailableClients}
    />
  );
}

export default AvailableClientsPage;
