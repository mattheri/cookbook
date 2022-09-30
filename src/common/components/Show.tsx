import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  condition: boolean;
  not?: boolean;
  additionnalCheck?: unknown;
}

const Show: FC<Props> = ({ condition, not, additionnalCheck, children }) => {
  const canRenderWithAdditionalCheck = !!additionnalCheck ?? true;
  const canRender = not ? !condition : condition;

  console.log("canRenderAdditionalCheck", additionnalCheck);

  return canRender ? <>{canRenderWithAdditionalCheck && children}</> : null;
};

export default Show;
