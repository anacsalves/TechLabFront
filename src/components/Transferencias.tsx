"use client";

import { useEffect, useState } from "react";

type Conta = {
  id: number;
  nome: string;
  tipo: string;
  saldo: number;
};

export default function Transferencias() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [contaOrigem, setContaOrigem] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const API_URL = "http://localhost:3001/contas";

  useEffect(() => {
    buscarContas();
  }, []);

  const buscarContas = async () => {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    setContas(dados);
  };

  const realizarTransferencia = async () => {
    const valorNumerico = parseFloat(valor);

    if (!contaOrigem || !contaDestino) {
      setMensagem("⚠️ Selecione as duas contas.");
      return;
    }

    if (contaOrigem === contaDestino) {
      setMensagem("⚠️ As contas devem ser diferentes.");
      return;
    }

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setMensagem("⚠️ Insira um valor válido.");
      return;
    }

    const origem = contas.find((c) => c.id === Number(contaOrigem));
    const destino = contas.find((c) => c.id === Number(contaDestino));

    if (!origem || !destino) {
      setMensagem("❌ Erro ao encontrar as contas.");
      return;
    }

    if (origem.saldo < valorNumerico) {
      setMensagem("❌ Saldo insuficiente na conta de origem.");
      return;
    }

    // Atualizar saldos localmente
    const novoSaldoOrigem = origem.saldo - valorNumerico;
    const novoSaldoDestino = destino.saldo + valorNumerico;

    try {
      // Atualiza conta origem
      await fetch(`${API_URL}/${origem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saldo: novoSaldoOrigem }),
      });

      // Atualiza conta destino
      await fetch(`${API_URL}/${destino.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saldo: novoSaldoDestino }),
      });

      setMensagem("✅ Transferência realizada com sucesso!");
      setValor("");
      setContaOrigem("");
      setContaDestino("");

      buscarContas();
    } catch (error) {
      setMensagem("❌ Erro ao realizar transferência.");
    }
  };

  return (
    <div className="p-6 bg-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4">💸 Realizar Transferência</h2>

      <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md">
        <div className="flex flex-col gap-2">
          <label className="font-medium">De conta:</label>
          <select
            value={contaOrigem}
            onChange={(e) => setContaOrigem(e.target.value)}
            className="p-2 rounded-md border"
          >
            <option value="">Selecione</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nome} - {conta.tipo} (R$ {conta.saldo})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Para conta:</label>
          <select
            value={contaDestino}
            onChange={(e) => setContaDestino(e.target.value)}
            className="p-2 rounded-md border"
          >
            <option value="">Selecione</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nome} - {conta.tipo} (R$ {conta.saldo})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor da transferência"
            className="p-2 rounded-md border"
          />
        </div>

        <button
          onClick={realizarTransferencia}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Transferir
        </button>

        {mensagem && <p className="text-sm">{mensagem}</p>}
      </div>
    </div>
  );
}
