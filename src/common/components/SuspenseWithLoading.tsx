import React, { FC, PropsWithChildren, Suspense } from "react";
import Loading from "./Loading";

interface Props extends PropsWithChildren {}

const SuspenseWithLoading: FC<Props> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspenseWithLoading;
