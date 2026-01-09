import React from "react";
import MDEditor from "@uiw/react-md-editor";

const ProductDescription = ({ description, className }) => {
  return (
    <div className={className} data-color-mode="light">
      <MDEditor.Markdown 
        source={description} 
        style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: 'inherit' }} 
      />
    </div>
  );
};

export default ProductDescription;
