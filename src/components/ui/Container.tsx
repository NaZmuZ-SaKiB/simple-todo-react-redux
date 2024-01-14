import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return <div className="w-full h-screen max-w-7xl mx-auto">{children}</div>;
};

export default Container;
