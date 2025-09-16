import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Veiculo, CreateVeiculoDto } from "../types/veiculo";

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const [form, setForm] = useState<CreateVeiculoDto>({
    modelo: "",
    anoFabricacao: new Date().getFullYear(),
    placa: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Veiculo>>({});

  const [acessorioForms, setAcessorioForms] = useState<{
    [key: number]: string;
  }>({});

  const loadVeiculos = async () => {
    try {
      const res = await api.get<Veiculo[]>("/veiculos");
      setVeiculos(res.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    loadVeiculos();
  }, []);

  const createVeiculo = async () => {
    if (!form.modelo || !form.placa || !form.anoFabricacao) {
      alert("Preencha o formulário corretamente!");
    }

    try {
      await api.post("/veiculos", form);
      setForm({
        modelo: "",
        anoFabricacao: 2025,
        placa: "",
      });

      await loadVeiculos();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const deleteVeiculo = async (id: number) => {
    if (confirm("Tem certeza?")) {
      try {
        await api.delete(`/veiculos/${id}`);
        await loadVeiculos();
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  const startEdit = (veiculo: Veiculo) => {
    setEditingId(veiculo.id);
    setEditForm({ ...veiculo });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (
      !editingId ||
      !editForm.modelo ||
      !editForm.placa ||
      !editForm.anoFabricacao
    ) {
      alert("Formulário esta errado!");
    }

    try {
      await api.patch(`/veiculos/${editingId}`, {
        modelo: editForm.modelo,
        anoFabricacao: editForm.anoFabricacao,
        placa: editForm.placa,
      });

      setEditingId(null);
      setEditForm({});

      await loadVeiculos();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const addAcessorio = async (veiculoId: number) => {
    const nome = acessorioForms[veiculoId];
    if (!nome) return;

    try {
      await api.post(`/veiculos/${veiculoId}/acessorios`, { nome });

      setAcessorioForms({ ...acessorioForms, [veiculoId]: "" });

      await loadVeiculos();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const removeAcessorio = async (acessorioId: number) => {
    if (confirm("Tem certeza que deseja remover acessório?")) {
      try {
        await api.delete(`/veiculos/acessorios/${acessorioId}`);

        await loadVeiculos();
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "24px auto" }}>
        <h1>Veículos</h1>
        <div
          style={{
            background: "#f3f3f380",
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <h2>Novo Veículo</h2>
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <input
              placeholder="Modelo"
              value={form.modelo}
              onChange={(e) =>
                setForm((f) => ({ ...f, modelo: e.target.value }))
              }
            />
            <input
              type="number"
              placeholder="Ano de Fabricação"
              value={form.anoFabricacao}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  anoFabricacao:
                    parseInt(e.target.value) || new Date().getFullYear(),
                }))
              }
            />
            <input
              placeholder="Placa"
              value={form.placa}
              onChange={(e) =>
                setForm((f) => ({ ...f, placa: e.target.value }))
              }
            />
            <button style={{ background: "#28a745" }} onClick={createVeiculo}>
              Adicionar Veículo
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "24px auto" }}>
        {veiculos.map((veiculo) => (
          <div
            key={veiculo.id}
            style={{
              borderRadius: 8,
              padding: 16,
              background: "#fff",
              marginBottom: "24px",
            }}
          >
            {editingId === veiculo.id ? (
              <div>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <input
                    placeholder="Modelo"
                    value={editForm.modelo || ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, modelo: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Ano"
                    value={editForm.anoFabricacao || ""}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        anoFabricacao: parseInt(e.target.value),
                      }))
                    }
                  />
                  <input
                    placeholder="Placa"
                    value={editForm.placa || ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, placa: e.target.value }))
                    }
                  />
                  <button onClick={saveEdit}>Salvar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: "#000" }}>
                      {veiculo.modelo} - ({veiculo.anoFabricacao})
                    </h3>
                    <p style={{ margin: "4px 0", color: "#000" }}>
                      Placa: {veiculo.placa} | ID: {veiculo.id}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => startEdit(veiculo)}>Editar</button>
                    <button onClick={() => deleteVeiculo(veiculo.id)}>
                      Excluir
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: "#f8f9fa",
                    padding: 12,
                    borderRadius: 4,
                  }}
                >
                  <h4 style={{ margin: "0 0 12px 0", color: "#000" }}>
                    Acessórios
                  </h4>

                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <input
                      placeholder="Nome"
                      value={acessorioForms[veiculo.id] || ""}
                      onChange={(e) =>
                        setAcessorioForms({
                          ...acessorioForms,
                          [veiculo.id]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => addAcessorio(veiculo.id)}
                      style={{ background: "#28a745", color: "white" }}
                    >
                      Adicionar Acessório
                    </button>
                  </div>

                  {veiculo.acessorios && veiculo.acessorios.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {veiculo.acessorios.map((acessorio) => (
                        <div
                          key={acessorio.id}
                          style={{
                            minWidth: 345,
                            padding: "4px 8px",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: "14px",
                          }}
                        >
                          <span style={{ color: "#000" }}>
                            {acessorio.nome}
                          </span>
                          <button
                            style={{
                              width: "16px",
                              height: "16px",
                              display: "flex",
                              fontSize: "10px",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#ff0000ff",
                            }}
                            onClick={() => removeAcessorio(acessorio.id)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Nenhum acessório adicionado</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {veiculos.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 40,
              color: "#f40000ff",
              fontSize: "24px",
            }}
          >
            Nenhum veículo no banco
          </div>
        )}
      </div>
    </div>
  );
}
