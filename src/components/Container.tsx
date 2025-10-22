import * as React from "react";

type ContainerProps = React.ComponentProps<"div">;

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={["mx-auto max-w-[1370px] w-full px-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
