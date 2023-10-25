"use client";

import React, { ChangeEventHandler } from "react";

import basic from "./UploadFileButton.module.scss";
import { generateUniqueId } from "utils/functions";

type Props = {
  extraStyles?: any;
  accept?: string;
  onFileChange: ChangeEventHandler;
  text: string;
};

const id = generateUniqueId(16);

const UploadFileButton: React.FC<Props> = (props) => {
  const {
    extraStyles = {},
    accept = "*",
    onFileChange = () => {},
    text,
  } = props;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <>
      <input
        id={id}
        className={styles("media-file")}
        type="file"
        accept={accept}
        onChange={onFileChange}
      />
      <label htmlFor={id} className={styles("media-file-label")}>
        {text}
      </label>
    </>
  );
};

export default UploadFileButton;
