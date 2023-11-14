import { Grid } from "@mui/material";
import { UploadMatchStatsForm } from "src/forms/UploadMatchStatsForm";

import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";

export const UploadPage = () => {
  const str2xml = (str: any) => {
    if (str.charCodeAt(0) === 65279) {
      // BOM sequence
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
  };

  const getParagraphs = (content: any) => {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());
    const paragraphsXml = xml.getElementsByTagName("w:p");
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
        const textXml = textsXml[j];
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      if (fullText) {
        paragraphs.push(fullText);
      }
    }
    return paragraphs;
  };

  const onValid = (files: Array<File>) => {
    files.forEach(async (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null) {
          const content = e.target.result;
          const paragraphs = getParagraphs(content);
          console.log(paragraphs);
        }
      };

      reader.onerror = (err) => console.error(err);

      reader.readAsBinaryString(file);
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <UploadMatchStatsForm onValid={onValid} />
      </Grid>
    </Grid>
  );
};
