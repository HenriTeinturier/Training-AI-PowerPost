import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Layout = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "max-w-4xl flex-wrap w-full flex gap-4  mt-4",
        props.className
      )}
    />
  );
};

export const LayoutHeader = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-start gap-2 flex-col w-full md:flex-1 min-w-[200px]",
        props.className
      )}
    />
  );
};

export const LayoutTitle = (props: ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      {...props}
      className={cn(
        " text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className
      )}
    />
  );
};

export const LayoutDescription = (props: ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      {...props}
      className={cn("mt-2 text-lg text-gray-500", props.className)}
    />
  );
};

export const LayoutContent = (props: ComponentPropsWithoutRef<"div">) => {
  return <div {...props} className={cn("w-full", props.className)} />;
};
