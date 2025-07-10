"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, DollarSign, Clock, Plus, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Jogo {
  id: number
  data: string
  hora: string
  local: string
  endereco: string
  valor: number
  vagas: number
  vagasOcupadas: number
  descricao: string
  status: "aberto" | "lotado" | "realizado"
}

export default function FutDosCrias() {
  const [jogos, setJogos] = useState<Jogo[]>([
    {
      id: 1,
      data: "2025-07-10",
      hora: "20:00 às 21:00",
      local: "Arena Distrito",
      endereco: "Av. Zacarias de Assunção, 880 B - Distrito Industrial, Ananindeua - PA, 67030-180",
      valor: 10,
      vagas: 20,
      vagasOcupadas: 14,
      descricao: "Racha da galera mais filha da puta que ja vi! Venham todos para mais uma pelada épica!",
      status: "aberto",
    },
  ])

  const [novoJogo, setNovoJogo] = useState({
    data: "",
    hora: "",
    local: "",
    endereco: "",
    valor: "",
    vagas: "",
    descricao: "",
  })

  const adicionarJogo = () => {
    if (novoJogo.data && novoJogo.hora && novoJogo.local && novoJogo.valor) {
      const jogo: Jogo = {
        id: jogos.length + 1,
        data: novoJogo.data,
        hora: novoJogo.hora,
        local: novoJogo.local,
        endereco: novoJogo.endereco,
        valor: Number.parseFloat(novoJogo.valor),
        vagas: Number.parseInt(novoJogo.vagas) || 20,
        vagasOcupadas: 0,
        descricao: novoJogo.descricao,
        status: "aberto",
      }
      setJogos([...jogos, jogo])
      setNovoJogo({
        data: "",
        hora: "",
        local: "",
        endereco: "",
        valor: "",
        vagas: "",
        descricao: "",
      })
    }
  }

  const formatarData = (data: string) => {
    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto":
        return "bg-green-500"
      case "lotado":
        return "bg-red-500"
      case "realizado":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aberto":
        return "Vagas Abertas"
      case "lotado":
        return "Lotado"
      case "realizado":
        return "Realizado"
      default:
        return "Indefinido"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">FUT DAS PEDRAS</h1>
                <p className="text-green-100">DO DISTRITO</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white text-green-600 hover:bg-green-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Jogo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agendar Novo Jogo</DialogTitle>
                  <DialogDescription>Preencha os dados para agendar uma nova pelada</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data">Data</Label>
                      <Input
                        id="data"
                        type="date"
                        value={novoJogo.data}
                        onChange={(e) => setNovoJogo({ ...novoJogo, data: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hora">Hora</Label>
                      <Input
                        id="hora"
                        type="time"
                        value={novoJogo.hora}
                        onChange={(e) => setNovoJogo({ ...novoJogo, hora: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="local">Local</Label>
                    <Input
                      id="local"
                      placeholder="Nome do campo"
                      value={novoJogo.local}
                      onChange={(e) => setNovoJogo({ ...novoJogo, local: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      placeholder="Endereço completo"
                      value={novoJogo.endereco}
                      onChange={(e) => setNovoJogo({ ...novoJogo, endereco: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valor">Valor (R$)</Label>
                      <Input
                        id="valor"
                        type="number"
                        placeholder="15.00"
                        value={novoJogo.valor}
                        onChange={(e) => setNovoJogo({ ...novoJogo, valor: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vagas">Vagas</Label>
                      <Input
                        id="vagas"
                        type="number"
                        placeholder="20"
                        value={novoJogo.vagas}
                        onChange={(e) => setNovoJogo({ ...novoJogo, vagas: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Detalhes sobre o jogo..."
                      value={novoJogo.descricao}
                      onChange={(e) => setNovoJogo({ ...novoJogo, descricao: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={adicionarJogo} className="w-full bg-green-600 hover:bg-green-700">
                  Agendar Jogo
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">⚽ O Jogo Mais Feio do Distrito! ⚽</h2>
          <p className="text-xl text-green-100 mb-8">
            Junte-se aos Pedras do Distrito e bora da-lhe. Futebol de qualidade(só que não), galera boa e diversão
            garantida!
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">{jogos.length}</div>
              <div className="text-green-100">Jogos Agendados</div>
            </div>
            <div>
              <div className="text-3xl font-bold">16+</div>
              <div className="text-green-100">Pedras Ativas</div>
            </div>
            <div>
              <div className="text-3xl font-bold">0</div>
              <div className="text-green-100">Campos Parceiros</div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Jogos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">🏆 Próximos Jogos Agendados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jogos.map((jogo) => (
              <Card key={jogo.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800">{jogo.local}</CardTitle>
                    <Badge className={`${getStatusColor(jogo.status)} text-white`}>{getStatusText(jogo.status)}</Badge>
                  </div>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {jogo.endereco}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">{formatarData(jogo.data)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">{jogo.hora}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">R$ {jogo.valor.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium">
                        {jogo.vagasOcupadas}/{jogo.vagas} vagas
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(jogo.vagasOcupadas / jogo.vagas) * 100}%` }}
                    ></div>
                  </div>

                  <p className="text-gray-700 text-sm">{jogo.descricao}</p>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled={jogo.status === "lotado"}>
                      {jogo.status === "lotado" ? "Lotado" : "Confirmar Presença"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">📍 Nossos Campos Parceiros</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Mapa Interativo dos Campos</p>
              <p className="text-sm">Integração com Google Maps em breve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FUT DOS CRIAS</h3>
              <p className="text-green-100">O melhor futebol do distrito está aqui!</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="text-green-100">WhatsApp: (11) 4002-8922</p>
              <p className="text-green-100">Instagram: @slaNemTem</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horários</h3>
              <p className="text-green-100">Sem Fixo</p>
              <p className="text-green-100">Sem Fixo</p>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>
              &copy; 2025 Fut das Pedras do Distrito. Feito com a paixão pelo futebol, porque pelo amor de Deus, é cada
              partida FEIA!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
