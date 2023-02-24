import React from "react";
import { signBtnProps } from "../../types/types";
import { SignBtn } from "./SignButtonStyles";

export default function SignButton({ onClick }: signBtnProps) {
  return <SignBtn onClick={onClick}>Log out</SignBtn>;
}
