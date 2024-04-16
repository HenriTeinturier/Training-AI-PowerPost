"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";
import { Loader } from "../ui/loader";

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton loading={pending} {...props}>
      {props.children}
    </LoadingButton>
  );
};

export const LoadingButton = ({
  loading,
  ...props
}: ButtonProps & { loading: boolean }) => {
  return (
    <Button {...props}>
      {loading ? (
        <>
          <Loader className="mr-2" size={16} /> {props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
};
