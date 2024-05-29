import React from "react";
import { OtherProfilePage } from "@/ui/ComponentExporter";

const page = ({ params }) => {
  const { userId } = params;

  return (
    <>
      <OtherProfilePage userId={userId} />
    </>
  );
};

export default page;
