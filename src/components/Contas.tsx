'use client';

import { useState, useEffect } from 'react';
import CardConta from './CardConta';

export default function Contas() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('Corrente');
  const [saldo, setSaldo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [contas, setContas] = useState<any[]>([]);

  const API_URL = 'http://localhost:3001/contas';
   const handleEdit = (id: number) => {
    alert(`Editar conta com ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmar = confirm("Tem certeza que deseja excluir essa conta?");
    if (confirmar) {
      setContas(contas.filter((conta) => conta.id !== id));
    }
  };

  const cadastrarConta = async () => {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        tipo,
        saldo: Number(saldo),
      }),
    });

    if (resposta.ok) {
      setMensagem('✅ Conta cadastrada com sucesso!');
      setNome('');
      setTipo('Corrente');
      setSaldo('');
      atualizarContas();
    } else {
      setMensagem('❌ Erro ao cadastrar conta');
    }
  };

  const atualizarContas = async () => {
    try {
      const res = await fetch(API_URL);
      const dados = await res.json();
      setContas(dados);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
    }
  };

  useEffect(() => {
    atualizarContas();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-gray-300">
        <h2 className="text-4xl font-bold">Minhas contas</h2>

        <div className="flex flex-wrap gap-2">
          {contas.length === 0 ? (
            <p>Não há contas cadastradas.</p>
          ) : (
            contas.map((conta) => (
              <CardConta
                 key={conta.id}
                id={conta.id}
                nome={conta.nome}
                tipo={conta.tipo}
                saldo={conta.saldo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Nome da conta"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Corrente">Corrente</option>
            <option value="Poupança">Poupança</option>
            <option value="Crédito">Crédito</option>
            <option value="Investimento">Investimento</option>
          </select>

          <input
            type="number"
            placeholder="Saldo da conta"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={cadastrarConta}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cadastrar conta
          </button>

          {mensagem && <p className="text-sm">{mensagem}</p>}
        </div>
      </div>
    </>
  );
}
