import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@material-ui/core";
import { FaThumbsUp, FaCopy } from "react-icons/fa";

const CopyGameUrl: React.FC = () => {
  const [thisUrl, setThisUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setThisUrl(window.location.href);
    }
  }, []);
  return (
    <CopyToClipboard text={thisUrl} onCopy={() => setCopied(true)}>
      <Button
        style={{ marginRight: "1rem" }}
        variant={copied ? "contained" : "outlined"}
      >
        <span style={{ marginRight: "1rem" }}>
          {copied ? "URL Copied" : "Copy URL"}
        </span>{" "}
        <FaCopy />
      </Button>
    </CopyToClipboard>
  );
};

export default CopyGameUrl;
