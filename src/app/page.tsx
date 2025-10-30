import HeroVideo from "../../components/HeroVideo";
import Products from "../../components/Products";
import About from "../../components/About";
import Ventures from "../../components/Ventures";
import BooksySection from "../../components/BooksySection";

export default function Page() {
  return (
    <main className="flex flex-col gap-24">
      <HeroVideo />
      <section id="productos" className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-3xl font-bold mb-6">Productos</h2>
        <Products />
      </section>
      <section id="about" className="max-w-6xl mx-auto px-4">
        <About />
      </section>
      <section id="booksy" className="max-w-6xl mx-auto px-4">
        <BooksySection fallbackUrl="https://booksy.com/en-us/1347158_gaston-britos_barber-shop_123456_miami" />
      </section>
            
      <section id="negocios" className="max-w-6xl mx-auto px-4 pb-24">
        <Ventures />
      </section>
    </main>
  );
}
