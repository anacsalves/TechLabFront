 import Image from "next/image";
 type CardContaProps ={
   id:number;
   nome:string;
   tipo:string;
   saldo:number;
   onEdit:(id:number)=>void;
   onDelete:(id:number)=>void;
 }
 
 export default function CardConta({id, nome, tipo, saldo, onEdit, onDelete }: CardContaProps){
    return(<>
     <div id="cardConta" className="flex flex-col m-10 border-y-8 w-full max-w-md p-4 rounded-md bg-blue-900 font-bold">
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-xl">{nome}</h2>
            <div className="flex space-x-4">
               <Image 
               src="/edit.svg" 
               alt="Botão editar conta"
               width={24} 
               height={24} 
               className="cursor-pointer"
               onClick={() => onEdit(id)}
               />

               <Image 
               src="/delete.svg" 
               alt="Botão apagar conta" 
               width={24} 
               height={24}
               className="cursor-pointer"
               onClick={() => onDelete(id)}
               />
            </div>
         </div>
            
            <h2 className="text-white text-md">Tipo de conta: {tipo}</h2>
            <h2 className="text-white text-lg">Saldo atual:R${saldo.toFixed(2)}</h2>
</div>
    </>);
 
 }