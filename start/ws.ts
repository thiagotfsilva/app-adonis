import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

app.ready(() => {
  const io = new Server(server.getNodeServer()) // iniciando um servidor

  // evento: connection
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id)

    //escuta o evento report emitido pelo formulario
    socket.on('report', (msg) => {
      // salvar dados enviados aqui
      console.log('message: ' + msg)
      io.emit('report', msg) // emitindo evento
    })
  })
})
