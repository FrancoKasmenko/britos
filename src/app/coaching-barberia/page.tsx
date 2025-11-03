// src/app/coaching-barberia/page.tsx  (SERVER COMPONENT)
import type { Metadata } from "next";
import Coaching from "../../components/CoachingLanding";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title:
    "Coaching de Barbería por Gastón | Subí ticket y re-agendado en 8 semanas",
  description:
    "Programa práctico para barberos y barberías. SOPs, scripts, ventas de retail, agenda y KPIs. Resultados medibles en 4–8 semanas.",
  alternates: { canonical: "/coaching-barberia" },
};

export default function Page() {
  return <Coaching />;
}
