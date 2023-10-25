"use client";

import UploadFileButton from "components/UploadFileButton/UploadFileButton";
import React, { useState } from "react";
import styles from "./uploadfiles.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import Api from "api/requests";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";

function UploadFilePage(): JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const router = useRouter();

  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      setUploadedFile(file);
    }
  }

  function uploadFile() {
    const payload = { clients_file: uploadedFile };

    Api.uploadClientsFile({ payload, useFormData: true, onSuccess });

    function onSuccess() {
      router.push(Routes.cmsClientPendingClients);
    }
  }

  return (
    <div className={styles["upload-file-page-wrapper"]}>
      <div className={styles["upload-btn-wrapper"]}>
        <UploadFileButton
          text="העלאת קובץ"
          onFileChange={onFileUpload}
          accept=".xlsx"
        />
      </div>
      {uploadedFile && (
        <span className={styles["file-uploaded-name"]}>
          {uploadedFile.name}
        </span>
      )}
      {uploadedFile && (
        <CmsButton
          className="update"
          title={"הצגת טבלה"}
          onClick={uploadFile}
          extraStyles={styles}
        />
      )}
    </div>
  );
}

export default UploadFilePage;
