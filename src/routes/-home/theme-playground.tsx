import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Throwaway playground: writes CSS variables straight onto <html>.
// No React state on purpose, so the mechanism stays visible. The real editor will add state.
const root = document.documentElement;

function setToken(name: string, value: string) {
  root.style.setProperty(name, value);
}

const tokens = ["--primary", "--background", "--foreground", "--border", "--input", "--radius"];

export function ThemePlayground() {
  return (
    <div className="flex flex-wrap items-end gap-6 rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-center gap-2">
        <Switch
          id="dark"
          defaultChecked={root.classList.contains("dark")}
          onCheckedChange={(checked) => root.classList.toggle("dark", checked)}
        />
        <Label htmlFor="dark">Modo oscuro</Label>
      </div>

      <ColorControl label="Primary" token="--primary" defaultValue="#171717" />
      <ColorControl label="Background" token="--background" defaultValue="#ffffff" />
      <ColorControl label="Foreground" token="--foreground" defaultValue="#0a0a0a" />
      {/* Inputs and checkboxes use --input, everything else uses --border */}
      <ColorControl label="Border" token={["--border", "--input"]} defaultValue="#e5e5e5" />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="radius">Radius</Label>
        <input
          id="radius"
          type="range"
          min={0}
          max={1.5}
          step={0.125}
          defaultValue={0.625}
          onChange={(e) => setToken("--radius", `${e.target.value}rem`)}
        />
      </div>

      <Button
        variant="outline"
        onClick={() => tokens.forEach((t) => root.style.removeProperty(t))}
      >
        Reset
      </Button>
    </div>
  );
}

function ColorControl({
  label,
  token,
  defaultValue,
}: {
  label: string;
  token: string | string[];
  defaultValue: string;
}) {
  const names = Array.isArray(token) ? token : [token];
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={names[0]}>{label}</Label>
      <input
        id={names[0]}
        type="color"
        defaultValue={defaultValue}
        onChange={(e) => names.forEach((n) => setToken(n, e.target.value))}
        className="h-8 w-14 cursor-pointer rounded-md border bg-transparent"
      />
    </div>
  );
}
