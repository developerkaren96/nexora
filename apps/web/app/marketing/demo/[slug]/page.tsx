import { notFound } from "next/navigation";
import { TEMPLATES } from "../../_data/templates";
import { DemoBar, DemoOutro } from "../_demos/shared";
import { EcommerceDemo, EcommerceMeta } from "../_demos/ecommerce";
import { RestaurantDemo, RestaurantMeta } from "../_demos/restaurant";
import { BeautySalonDemo, BeautySalonMeta } from "../_demos/beauty-salon";
import { ClinicDemo, ClinicMeta } from "../_demos/medical-clinic";
import { LawFirmDemo, LawFirmMeta } from "../_demos/law-firm";
import { RealEstateDemo, RealEstateMeta } from "../_demos/real-estate";
import { DeliveryDemo, DeliveryMeta } from "../_demos/delivery";
import { SaasDemo, SaasMeta } from "../_demos/saas";
import { SchoolDemo, SchoolMeta } from "../_demos/online-school";
import { BookingDemo, BookingMeta } from "../_demos/booking";
import { CorporateDemo, CorporateMeta } from "../_demos/corporate";
import { AutomotiveDemo, AutomotiveMeta } from "../_demos/automotive";

const REGISTRY = {
  "ecommerce":       { render: EcommerceDemo,    meta: EcommerceMeta    },
  "restaurant":      { render: RestaurantDemo,   meta: RestaurantMeta   },
  "beauty-salon":    { render: BeautySalonDemo,  meta: BeautySalonMeta  },
  "medical-clinic":  { render: ClinicDemo,       meta: ClinicMeta       },
  "law-firm":        { render: LawFirmDemo,      meta: LawFirmMeta      },
  "real-estate":     { render: RealEstateDemo,   meta: RealEstateMeta   },
  "delivery":        { render: DeliveryDemo,     meta: DeliveryMeta     },
  "saas":            { render: SaasDemo,         meta: SaasMeta         },
  "online-school":   { render: SchoolDemo,       meta: SchoolMeta       },
  "booking":         { render: BookingDemo,      meta: BookingMeta      },
  "corporate":       { render: CorporateDemo,    meta: CorporateMeta    },
  "automotive":      { render: AutomotiveDemo,   meta: AutomotiveMeta   },
} as const;

type Slug = keyof typeof REGISTRY;

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tpl = TEMPLATES.find((t) => t.slug === slug);
  const m = REGISTRY[slug as Slug]?.meta;
  return {
    title: m ? `${m.brand} — демо ${tpl?.name ?? slug} · Nexora` : "Демо · Nexora",
    description: m?.description,
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tpl = TEMPLATES.find((t) => t.slug === slug);
  const entry = REGISTRY[slug as Slug];
  if (!tpl || !entry) notFound();

  const Demo = entry.render;
  return (
    <div className="min-h-screen bg-white">
      <DemoBar name={tpl.name} slug={slug} />
      <Demo />
      <DemoOutro name={tpl.name} slug={slug} color={entry.meta.color} />
    </div>
  );
}
