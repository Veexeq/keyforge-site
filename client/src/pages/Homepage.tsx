import Navbar from "@/components/shared/Navbar";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-extrabold">Stwórz swoją idealną klawiaturę.</h1>
        <p className="mt-4 text-muted-foreground">Tutaj zacznie się sekcja Hero...</p>
      </main>
    </div>
  );
}
