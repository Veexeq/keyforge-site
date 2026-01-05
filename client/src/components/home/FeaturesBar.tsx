import { Box, Hammer, Palette } from "lucide-react";

const features = [
  {
    icon: Hammer,
    title: "100% Handmade",
    description: "Crafted with passion in Poland",
  },
  {
    icon: Box,
    title: "Local Stock",
    description: "Switches shipped within 24h",
  },
  {
    icon: Palette,
    title: "Unique Designs",
    description: "Limited drops, no mass production",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-y border-border/50 bg-secondary/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
