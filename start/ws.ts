import { ReportModel } from '#models/report'
import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

app.ready(async () => {
  const io = new Server(server.getNodeServer()) // iniciando um servidor

  // evento: connection
  io.on('connection', async (socket) => {
    console.log('socket connected', socket.id)

    // Enviar todos os relatórios para o cliente ao conectar
    const reports = await ReportModel.find()
    socket.emit('reports', reports) // Emitindo evento para enviar todos os relatórios

    // Escuta o evento report emitido pelo formulário
    socket.on('report', async (msg) => {
      // Salvar dados enviados aqui
      await ReportModel.create(msg)
      const newReports = await ReportModel.find()
      io.emit('reports', newReports) // Emitindo evento para enviar todos os relatórios
    })
  })
})
