import { Suspense } from "react";
import CompleteContent from "./complete-content";

export default function SignupCompletePage() {
  return (
    <Suspense fallback={null}>
      <CompleteContent />
    </Suspense>
  );
}
