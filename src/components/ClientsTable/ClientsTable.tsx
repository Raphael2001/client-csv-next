"use client";

import React, { useState } from "react";

import styles from "./ClientsTable.module.scss";
import TableCreator from "components/TableCreator/TableCreator";
import CmsButton from "components/CmsButton/CmsButton";

type Props = {
  data: Array<any>;
  apiFunction: (props: any) => void;
};

function ClientsTable(props: Props) {
  const { data, apiFunction } = props;
  const [link, setLink] = useState("");

  const header = {
    first_name: "שם פרטי",
    last_name: "שם משפחה",
    phone: "טלפון",
  };

  function getLink() {
    apiFunction({ onSuccess });
    function onSuccess(res: any) {
      setLink(res.url);
    }
  }

  return (
    <div className={styles["table-clients-container"]}>
      {data.length > 0 && (
        <>
          <TableCreator
            header={header}
            data={data}
            className={styles["table"]}
          />
          <CmsButton
            className="create"
            title="קבלת לינק"
            extraStyles={styles}
            onClick={getLink}
          />
        </>
      )}
      {link && (
        <a href={link} className={styles["download-file"]} download>
          הורדת טבלה
        </a>
      )}
    </div>
  );
}

export default ClientsTable;
