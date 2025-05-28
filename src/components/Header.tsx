import '../../public/imgs/logoContaComigo.png'
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex'>
            <Image src="/imgs/logoContaComigo.png" alt="Logo do site" width={50} height={50} />
            <h1 className="text-xl font-bold text-blue-700">Conta Comigo</h1>
        </div>
        <nav className="space-x-16">
          <a href="#contas" className="text-gray-700 hover:text-blue-500">Minhas Contas</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Transações</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Transferências</a>
        </nav>
      </div>
    </header>
  );
}
