"use client";

import React, { useEffect } from "react";

import { useAppSelector } from "hooks/useRedux";
import Api from "api/requests";
import ClientsTable from "components/ClientsTable/ClientsTable";

function PendingClientsPage() {
  const pendingClients = useAppSelector((store) => store.pendingClients);

  useEffect(() => {
    if (!pendingClients || pendingClients.length === 0) {
      Api.getPendingClients();
    }
  }, [pendingClients]);

  return (
    <ClientsTable
      data={pendingClients}
      apiFunction={Api.getLinkForPendingClients}
    />
  );
}

export default PendingClientsPage;
