import moment from 'moment'
import amqp from 'amqplib'
import chokidar from 'chokidar'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import config from './config'

dotenv.config()

const IP = config.env.ip
const PORT = config.env.port

const httpServer = http.createServer()

httpServer.listen(PORT.http, () => {
  console.info(`Application date & time starting----@ ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  console.info(`API server ip & port running--------@ http://${IP}:${PORT.http}`)
})

// const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function (response) {
//   response.pipe(file);

//   // after download completed close filestream
//   file.on("finish", () => {
//     file.close();
//     console.log("Download Completed");
//   });
// });

// One-liner for current directory
const watcher = chokidar.watch(path.resolve('D:\\Work\\Murni\\Project\\OTHER\\synchronize-app\\release-app'), {
  ignored: /(^|[\\/\\])\../, // ignore dotfiles
  persistent: true,
  awaitWriteFinish: true,
})
// Something to use when events are received.
const log = console.log.bind(console)
let fileArray = []
// Add event listeners.
watcher
  .on('add', (paths) => {
    const getFiles = fileArray.find((x) => x.path === paths)
    if (!getFiles || getFiles.length < 1) {
      fileArray.push({
        path: path.dirname(paths),
        filename: path.basename(paths),
      })
      amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
          log('Failed to connect amqp')
        } else {
          connection.createChannel((error1, channel) => {
            if (error1) {
              log('Failed create channel amqp')
            } else {
              const queue = `message-to-${path.basename(path.dirname(path.resolve(paths)))}`
              const msg = `File ${path.basename(paths)} has been added`
              channel.assertQueue(queue, {
                durable: true,
                autoDelete: true,
              })
              channel.sendToQueue(queue, Buffer.from(msg))
              console.log(`[x] Sent added file ${path.basename(paths)} to ${queue}`)
            }
          })
        }
      })
    }
  })
  .on('change', (paths) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        log('Failed to connect amqp')
      } else {
        connection.createChannel((error1, channel) => {
          if (error1) {
            log('Failed create channel amqp')
          } else {
            const queue = `message-to-${path.basename(path.dirname(path.resolve(paths)))}`

            const msg = `File ${path.basename(paths)} has been updated`
            channel.assertQueue(queue, { durable: true, autoDelete: true })
            channel.sendToQueue(queue, Buffer.from(msg))
            console.log(`[x] Sent updated file ${path.basename(paths)} to ${queue}`)
          }
        })
      }
    })
  })
  .on('unlink', (paths) => {
    // eslint-disable-next-line max-len
    const aa = fileArray.filter((x) => x.path !== path.dirname(paths) && x.filename !== path.basename(paths))
    fileArray = aa

    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        log('Failed to connect amqp')
      } else {
        connection.createChannel((error1, channel) => {
          if (error1) {
            log('Failed create channel amqp')
          } else {
            const queue = `message-to-${path.basename(path.dirname(path.resolve(paths)))}`
            channel.checkQueue(queue, (error2, ok2) => {
              if (error2) {
                log(`Failed to check queue ${queue}`)
              } else if (ok2.messageCount > 0) {
                channel.deleteQueue(queue, {
                  ifUnused: false,
                  ifEmpty: false,
                },
                (error3, ok3) => {
                  if (error3) {
                    log(`Failed to delete queue ${queue}`)
                  } else {
                    log(`File ${path.basename(paths)
                    } has been removed`)
                  }
                })
              } else {
                log(`No Queue in ${queue}`)
              }
            })
          }
        })
      }
    })
  })
