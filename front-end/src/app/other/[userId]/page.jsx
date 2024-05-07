import React from "react";

const OtherProfile = ({ params }) => {
  const { userId } = params;

  return (
    <>
      <div className="mt-[190px]">
        <h1>Hello World!</h1>
        <h4>User Id: {userId}</h4>
      </div>
    </>
  );
};

export default OtherProfile;
