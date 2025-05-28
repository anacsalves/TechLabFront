 import Image from "next/image";
 type CardContaProps ={
   nome:string;
   tipo:string;
   saldo:number;
 }
 
 export default function CardConta({ nome, tipo, saldo }: CardContaProps){
    return(<>
     <div id="cardConta" className="flex flex-col m-10 border-y-8 w-full max-w-md p-4 rounded-md bg-blue-900 font-bold">
         <div className="flex space-around">
            <h2 className="text-white text-xl">{nome}</h2>
            {/* <Image src="/imgs/delete.png" alt="Botão apagar" width={24} height={24} /> */}
         </div>
            
            <h2 className="text-white text-md">Tipo de conta: {tipo}</h2>
            <h2 className="text-white text-lg">Saldo atual:R${saldo.toFixed(2)}</h2>
</div>
    </>);
 
 }