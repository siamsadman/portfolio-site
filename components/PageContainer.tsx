import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
