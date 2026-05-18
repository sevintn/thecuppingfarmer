import { Leaf, Coffee, Heart } from "lucide-react";

interface MissionBlockProps {
  dict: {
    mission: {
      title: string;
      text: string;
      values: Array<{ icon: string; title: string; text: string }>;
    };
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf,
  cup: Coffee,
  heart: Heart,
};

export default function MissionBlock({ dict }: MissionBlockProps) {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-body text-brand-mid text-xs uppercase tracking-[0.25em] mb-3">
              {dict.mission.title}
            </p>
            <p className="font-body text-brand-dark text-lg leading-relaxed">
              {dict.mission.text}
            </p>
          </div>

          {/* Values */}
          <div className="space-y-8">
            {dict.mission.values.map((value) => {
              const Icon = iconMap[value.icon] ?? Leaf;
              return (
                <div key={value.title} className="flex gap-5 items-start">
                  <div className="w-10 h-10 bg-brand-beige flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-mid" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-dark text-base mb-1">
                      {value.title}
                    </h3>
                    <p className="font-body text-brand-mid/80 text-sm leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
