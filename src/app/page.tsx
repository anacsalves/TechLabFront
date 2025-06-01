import Header from "@/components/Header";
import Contas from "@/components/Contas";
import Transferencias from "@/components/Transferencias";

export default function Home() {
  return (
    <>
    <main className="flex flex-col">
          <Header/>
          <Contas/>
          <Transferencias/>
    </main>
    </>
  );
}


