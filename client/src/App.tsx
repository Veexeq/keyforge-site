import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">KeyForge</h1>
          <p className="text-gray-400">Frontend działa i Tailwind v4 też!</p>
        </div>
      </div>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
        <h1 className="text-4xl font-bold">KeyForge</h1>
        <p className="text-zinc-400">Testujemy shadcn/ui</p>

        <div className="flex gap-2">
          <Button variant="default">Kup Teraz</Button>
          <Button variant="destructive">Usuń</Button>
          <Button variant="outline" className="text-black bg-white hover:bg-gray-200">Więcej info</Button>
        </div>
      </div>
    </>
  );
}

export default App;
