import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        {children}
    </div>
  );
}