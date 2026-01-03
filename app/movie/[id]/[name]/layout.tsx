import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: {
    template: "%s | كلاكيت",
    default: "فيلم | كلاكيت",
  },
};

export default function MovieLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <> 
  
  {children}
  
  </>;
}
