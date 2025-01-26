import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>SideBar</div>
      <div>{children}</div>
    </div>
  );
};

export default DashBoardLayout;
