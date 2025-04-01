import { Suspense } from "react";
import ForgotPasswordComponent from "../forgotpasswordComponent/page";

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordComponent />
    </Suspense>
  );
}
